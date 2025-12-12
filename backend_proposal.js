const crypto = require('crypto');

// ==========================================
// 1. CONFIGURATION (Source of Truth)
// ==========================================
// Define plans here to avoid hardcoded values in logic and ensure security.
const PLAN_CONFIG = {
    'Tryo Plan': {
        weeklyPercent: 7.5,
        durationDays: 365
    },
    'Ruby Account': {
        weeklyPercent: 20.0,
        durationDays: 365
    },
    'Medial Plan': {
        weeklyPercent: 25.90,
        durationDays: 365
    },
    'Veltrix Plan': {
        weeklyPercent: 39.90,
        durationDays: 365
    },
    'VIP I': {
        weeklyPercent: 41.30,
        durationDays: 7
    },
    'VIP II': {
        weeklyPercent: 45.96,
        durationDays: 7
    }
};

// Helper: safe float math (optional but good practice for money)
const calculateProfit = (amount, percent) => {
    return (amount * percent) / 100;
};


// ==========================================
// 2. INVESTMENT ROUTE
// ==========================================
app.post('/api/invest', async (req, res) => {
    const token = req.headers['x-access-token'];

    try {
        const decode = jwt.verify(token, jwtSecret);
        const email = decode.email;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.json({ status: 404, message: 'User not found' });
        }

        if (user.investCount >= 3) { // Changed == 3 to >= 3 for safety
            return res.json({ status: 403, error: 'Re-investment limit reached. Deposit to keep investing.' });
        }

        const { amount, plan: planName } = req.body;

        // VALIDATION: Check if plan exists in our config
        const planConfig = PLAN_CONFIG[planName];
        if (!planConfig) {
            return res.json({ status: 400, message: 'Invalid investment plan selected.' });
        }

        // Capital Check
        if (user.capital < amount) {
            return res.json({ status: 400, message: 'Insufficient capital!' });
        }

        // CALCULATION ---------------------------
        // Use server-side config for calculations, NOT client input
        const periodicProfit = calculateProfit(amount, planConfig.weeklyPercent);

        // Calculate total expected profit over the full duration? 
        // If the plan pays weekly for X days:
        // Number of payouts = Duration Days / 7
        // Total Profit = periodicProfit * (Duration Days / 7)
        // Note: If you want exactly 52 weeks or a specific number of payouts, logic might need adjustment.
        // For now, we store the periodic (weekly) profit amount to be paid out by the Cron job.

        const now = new Date();
        const durationMs = planConfig.durationDays * 24 * 60 * 60 * 1000;
        const endDate = new Date(now.getTime() + durationMs);

        // DATABASE UPDATE -----------------------
        await User.updateOne(
            { email: email },
            {
                $push: {
                    investment: {
                        type: 'investment',
                        amount: amount,
                        plan: planName,
                        percent: `${planConfig.weeklyPercent}%`, // Store formatted string for display
                        startDate: now.toLocaleString(),
                        endDate: endDate.toLocaleString(),
                        endDateMs: endDate.getTime(), // Store raw MS for easier comparison in Cron
                        profit: periodicProfit, // This is the WEEKLY profit amount
                        periodicProfit: periodicProfit,
                        started: now.getTime(),
                        nextPayout: now.getTime() + (7 * 24 * 60 * 60 * 1000), // First payout in 7 days
                        totalEarned: 0,
                        active: true
                    },
                    transaction: {
                        type: 'investment',
                        amount: amount,
                        date: now.toLocaleString(),
                        balance: user.funded + amount, // Note: Logic check - is balance increasing or decreasing? Usually investing subtracts capital?
                        // Existing logic had: balance: user.funded + req.body.amount. Keeping consistent with user's logic but double check.
                        id: crypto.randomBytes(32).toString("hex")
                    }
                },
                $set: {
                    capital: user.capital - amount,
                    // totalprofit: user.totalprofit + money // removing immediate profit addition, profit is earned over time
                    withdrawDuration: now.getTime(),
                    investCount: user.investCount + 1
                },
            }
        );

        res.json({ status: 'ok', amount: amount });

    } catch (error) {
        console.error("Investment Error:", error);
        return res.json({ status: 500, error: 'Internal server error' });
    }
});


// ==========================================
// 3. CRON JOB (Profit Distribution)
// ==========================================
// Updates user balances with profit if the week has passed
const processInvestments = async (users, now) => {
    const updates = [];

    for (const user of users) {
        if (!user.investment || user.investment.length === 0) continue;

        let userChanged = false;
        let newFunded = user.funded || 0;
        let newTotalProfit = user.totalprofit || 0;
        let newCapital = user.capital || 0; // Existing logic seemed to add profit to capital too?

        // Map through investments to check updates
        // We use a regular for-loop to support async/await if needed, or just standard mapping
        const updatedInvestments = user.investment.map(invest => {
            // Skip invalid records
            if (!invest.started || !invest.nextPayout) return invest;
            if (!invest.active && invest.active !== undefined) return invest; // If we track active status

            // Check if investment has ended
            // Using endDateMs if we stored it, or calculating from duration
            const endTime = invest.endDateMs || (invest.started + (invest.ended || 0)); // Fallback to old logic if needed

            if (now >= endTime) {
                // Investment expired
                invest.active = false;
                return invest;
            }

            // Check if it's time for a payout
            if (now >= invest.nextPayout) {
                const profitAmount = invest.periodicProfit || invest.profit; // Support both naming conventions

                if (profitAmount && !isNaN(profitAmount)) {
                    // PAYOUT!
                    newFunded += profitAmount;
                    newTotalProfit += profitAmount;
                    newCapital += profitAmount; // Based on your old logic: capital: user.capital + invest.profit

                    invest.totalEarned = (invest.totalEarned || 0) + profitAmount;

                    // Schedule next payout (add 7 days)
                    invest.nextPayout += (7 * 24 * 60 * 60 * 1000);

                    // If we missed multiple weeks (server down), this loop only pays once. 
                    // To pay multiple weeks at once, you'd use a while loop here, but safer to do one at a time.

                    userChanged = true;
                }
            }
            return invest;
        });

        if (userChanged) {
            updates.push(
                User.updateOne(
                    { email: user.email },
                    {
                        $set: {
                            funded: newFunded,
                            totalprofit: newTotalProfit,
                            capital: newCapital,
                            investment: updatedInvestments
                        }
                    }
                )
            );
        }
    }

    // Execute all DB updates
    await Promise.all(updates);
    return updates.length;
};

app.get('/api/cron', async (req, res) => {
    try {
        const users = await User.find();
        const now = new Date().getTime();

        const count = await processInvestments(users, now);

        // Send ONE response after all processing is done
        return res.json({ status: 200, message: `Processed updates for ${count} users.` });

    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: 'Error executing cron job' });
    }
});
