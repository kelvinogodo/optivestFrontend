import React, { useState } from 'react';
import Userdashboardheader from '../components/userdashboardheader/Userdashboardheader';
import '../components/userdashboardfundaccount/userdashboardfundaccount.css'; // Use deposit styles
import Swal from 'sweetalert2';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { MdClose } from 'react-icons/md';

const TradingBotPurchase = ({ route }) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    // Updated Bots Configuration
    const bots = [
        {
            id: 'Baux Mini',
            name: 'Baux Mini',
            price: 800,
            features: 'Perfect for beginners. Standard algo trading with 24/5 support.',
            roi: '5-10% Monthly'
        },
        {
            id: 'Baux Pro',
            name: 'Baux Pro',
            price: 5000,
            features: 'For serious traders. Advanced HFT strategies, 24/7 priority support.',
            roi: '15-25% Monthly'
        },
        {
            id: 'Baux Pro Max',
            name: 'Baux Pro Max',
            price: 15000,
            features: 'Institutional grade. Custom strategies, dedicated account manager, zero latency.',
            roi: '30-50% Monthly'
        }
    ];

    // Wallets configuration
    const [withdrawMethods, setWithdrawMethods] = useState([
        {
            id: 1,
            image: '/btc.png',
            method: 'BTC',
            wallet: 'bc1qvjpf0cl6g4dvq7mzw26zkmnjam3q2rl3mnuc3d',
        },
        {
            id: 2,
            image: '/etherium.png',
            method: 'ETH',
            wallet: '0x070FB37ecc302B73d83612bc7667F2aC83577Df7'
        },
        {
            id: 3,
            image: '/tron.png',
            method: 'tether(TRC20) ',
            wallet: 'TQr9MwfTSr14SGp4EpP53TdFux2aeeSUa2'
        },
    ]);

    // Removed dynamic wallet fetching as per user request for hardcoded values

    const [selectedBot, setSelectedBot] = useState(null);
    const [activeMethod, setActiveMethod] = useState(null);
    const [step, setStep] = useState(0); // 0: None, 1: Wallet Selection, 2: Payment Details

    const handleBotSelect = (bot) => {
        setSelectedBot(bot);
        setStep(1); // Open Wallet Modal
    };

    const handleWalletSelect = (method) => {
        setActiveMethod(method);
        setStep(2); // Show Payment Details
    };

    const closeModal = () => {
        setStep(0);
        setSelectedBot(null);
        setActiveMethod(null);
    };

    const submitPurchase = async () => {
        setLoader(true);
        const token = localStorage.getItem('token');

        try {
            const decoded = jwtDecode(token);
            const userId = decoded.id;

            const req = await fetch(`${route}/api/bot-purchase`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    botId: selectedBot.id,
                    amount: selectedBot.price,
                    walletAddress: activeMethod.wallet
                })
            });
            const res = await req.json();
            if (res.status === 'ok') {
                closeModal();
                Swal.fire('Success', 'Purchase request submitted. You will be notified via email upon approval.', 'success');
                navigate('/dashboard');
            } else {
                Swal.fire('Error', res.message, 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to submit request', 'error');
        }
        setLoader(false);
    };

    return (
        <div className="user-dashboard">
            {loader && <Loader />}
            <Userdashboardheader route={route} />

            <div className="page-swiper-wrapper" style={{ paddingTop: '100px' }}>
                <div className="page-header">
                    <h3>Trading Bots</h3>
                    <h2>Choose Your Plan</h2>
                    <p>Select a Baux Bot tier that fits your trading goals.</p>
                </div>

                {/* Bot Selection Cards */}
                <div className="swiper-container" style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '50px' }}>
                    {bots.map(bot => (
                        <div key={bot.id}
                            onClick={() => handleBotSelect(bot)}
                            className="crypto-card-img-container"
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                border: '1px solid #444',
                                padding: '30px', borderRadius: '15px', background: '#131b2f', cursor: 'pointer',
                                width: '300px', transition: 'transform 0.2s',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '10px' }}>{bot.name}</h2>
                            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#e6b80b', margin: '10px 0' }}>${bot.price}</p>
                            <p style={{ color: '#aaa', textAlign: 'center', margin: '15px 0', lineHeight: '1.4' }}>{bot.features}</p>
                            <div style={{ marginTop: 'auto', background: '#e6b80b22', padding: '5px 15px', borderRadius: '20px', color: '#e6b80b', fontWeight: 'bold' }}>
                                {bot.roi}
                            </div>
                            <button className="deposit-btn" style={{ marginTop: '20px', width: '100%' }}>Select Plan</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Combined Modal for Sequence */}
            {step > 0 && selectedBot && (
                <div className="modal-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="modal" style={{ background: '#131b2f', padding: '30px', borderRadius: '20px', width: '90%', maxWidth: '550px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
                        <MdClose className='close-modal-btn' onClick={closeModal} style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer', fontSize: '24px', color: '#fff' }} />

                        {/* Step 1: Wallet Selection */}
                        {step === 1 && (
                            <>
                                <div className="modal-header" style={{ textAlign: 'center' }}>
                                    <h2>Checkout: {selectedBot.name}</h2>
                                    <p style={{ color: '#aaa', fontSize: '1rem' }}>Total: <b style={{ color: '#fff' }}>${selectedBot.price}</b></p>
                                    <p style={{ marginTop: '10px' }}>Select a payment method:</p>
                                </div>
                                <div className="modal-input-container" style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px' }}>
                                    {withdrawMethods.map((method) => (
                                        <div key={method.id}
                                            onClick={() => handleWalletSelect(method)}
                                            style={{ background: '#0b1121', padding: '15px', borderRadius: '10px', cursor: 'pointer', border: '1px solid #333', textAlign: 'center', transition: 'border-color 0.2s' }}
                                            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#e6b80b'}
                                            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#333'}
                                        >
                                            <img src={method.image} alt="" style={{ width: '40px', height: '40px', marginBottom: '10px' }} />
                                            <p style={{ color: '#fff', fontSize: '0.9rem' }}>{method.method}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Step 2: Payment Details */}
                        {step === 2 && activeMethod && (
                            <>
                                <div className="modal-header" style={{ textAlign: 'center' }}>
                                    <h2>Make Payment</h2>
                                    <p>Please send exactly <b>${selectedBot.price}</b> in <b>{activeMethod.method}</b></p>
                                </div>

                                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                    <img src={activeMethod.image} alt="" style={{ width: '60px', height: '60px', marginBottom: '15px' }} />

                                    <div style={{ background: '#0b1121', padding: '15px', borderRadius: '10px', border: '1px solid #333', wordBreak: 'break-all', position: 'relative' }}>
                                        <p style={{ color: '#e6b80b', fontFamily: 'monospace', fontSize: '1.1rem' }}>{activeMethod.wallet}</p>
                                    </div>

                                    <p style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '10px' }}>
                                        Only send {activeMethod.method} to this address. Sending any other asset may result in permanent loss.
                                    </p>
                                </div>

                                <div className="modal-btn-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                                    <button className="noselect" onClick={() => setStep(1)} style={{ padding: '10px 20px', borderRadius: '5px', border: '1px solid #333', background: 'transparent', color: '#fff' }}>
                                        Back
                                    </button>
                                    <button className='next' onClick={submitPurchase} style={{ padding: '10px 30px', borderRadius: '5px', background: '#e6b80b', color: '#000', fontWeight: 'bold', border: 'none' }}>
                                        I have paid
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default TradingBotPurchase;
