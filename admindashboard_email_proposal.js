const nodemailer = require('nodemailer');

// ==========================================
// CONFIGURATION: Nodemailer Transporter
// ==========================================
// Replace with your actual SMTP credentials or service (e.g., Gmail, SendGrid, etc.)
const transporter = nodemailer.createTransport({
    service: 'gmail', // or 'smtp.example.com'
    auth: {
        user: 'your_email@gmail.com', // Your email
        pass: 'your_app_password'     // Your app password (not login password)
    }
});

// ==========================================
// ROUTE: Send Bulk Email
// ==========================================
app.post('/api/admin/send-bulk-email', async (req, res) => {
    // 1. Security: Verify Admin (Optional but recommended)
    // const token = req.headers['x-access-token'];
    // ... verify token logic ...

    const { subject, message } = req.body;

    if (!subject || !message) {
        return res.json({ status: 400, message: 'Subject and message are required.' });
    }

    try {
        // 2. Fetch All Users
        const users = await User.find({}, 'email firstname lastname'); // Select only needed fields

        if (!users || users.length === 0) {
            return res.json({ status: 404, message: 'No users found to email.' });
        }

        let sentCount = 0;
        let failedCount = 0;

        // 3. Send Emails Loop
        // We use Promise.all to send in parallel (be careful with rate limits!)
        // Or specific batching if user base is huge. For now, simple loop.

        const emailPromises = users.map(user => {
            const mailOptions = {
                from: '"BoardBank Support" <support@boardbanking.com>',
                to: user.email,
                subject: subject,
                // Simple HTML template
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2>Hello ${user.firstname || 'Valued User'},</h2>
                        <p>${message.replace(/\n/g, '<br>')}</p>
                        <hr>
                        <p style="font-size: 12px; color: #777;">&copy; ${new Date().getFullYear()} BoardBank. All rights reserved.</p>
                    </div>
                `
            };

            return transporter.sendMail(mailOptions)
                .then(() => {
                    sentCount++;
                })
                .catch(err => {
                    console.error(`Failed to email ${user.email}:`, err);
                    failedCount++;
                });
        });

        await Promise.all(emailPromises);

        // 4. Response
        return res.json({
            status: 'ok',
            message: `Emails processed. Sent: ${sentCount}, Failed: ${failedCount}`,
            sent: sentCount,
            failed: failedCount
        });

    } catch (error) {
        console.error('Bulk Email Error:', error);
        return res.json({ status: 500, error: 'Internal server error during bulk email.' });
    }
});
