import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';
import Swal from 'sweetalert2';
import '../components/admindashboard/admindashboard.css'; // Reuse existing styles or create new ones
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const AdminBotRequests = ({ route }) => {
    const [requests, setRequests] = useState([]);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const fetchRequests = async () => {
        setLoader(true);
        try {
            const req = await fetch(`${route}/api/admin/bot-purchases`);
            const res = await req.json();
            if (res.status === 'ok') {
                setRequests(res.requests || []);
            }
        } catch (error) {
            console.error(error);
            setRequests([]);
        }
        setLoader(false);
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const processRequest = async (id, decision) => {
        setLoader(true);
        try {
            const req = await fetch(`${route}/api/admin/bot-purchases/${id}/decision`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ decision })
            });
            const res = await req.json();
            if (res.status === 'ok') {
                Swal.fire('Success', res.message, 'success');
                fetchRequests();
            } else {
                Swal.fire('Error', res.message, 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Something went wrong', 'error');
        }
        setLoader(false);
    };

    // Navigation handlers for AdminHeader
    const goToAdmin = (view) => {
        navigate('/admin', { state: { view } });
    };

    return (
        <main className='login-page admin-dash'>
            {loader && <Loader />}
            <AdminHeader
                route={route}
                openCreateTrader={() => goToAdmin('createTrader')}
                openTraderLogs={() => goToAdmin('traderLogs')}
                openUsers={() => goToAdmin('users')}
                openLogin={() => {
                    localStorage.removeItem('adminLoggedIn');
                    navigate('/login');
                }}
                openBulkEmail={() => goToAdmin('bulkEmail')}
            />

            <div className="page-header admin-page-header" style={{ marginTop: '100px' }}>
                <h3>Bot Purchase Requests</h3>
                <p>Manage incoming bot purchase confirmations</p>
            </div>

            <div className="dash-b">
                <table>
                    <thead>
                        <tr>
                            <td>User</td>
                            <td>Email</td>
                            <td>Bot ID</td>
                            <td>Amount</td>
                            <td>Wallet Address (Payment)</td>
                            <td>Status</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(requests) && requests.length > 0 ? requests.map(req => (
                            <tr key={req._id}>
                                <td>{req.username}</td>
                                <td>{req.email}</td>
                                <td>{req.botId}</td>
                                <td>${req.amount}</td>
                                <td>{req.walletAddress}</td>
                                <td>
                                    <span className={req.status === 'approved' ? 'success-text' : req.status === 'rejected' ? 'failure-text' : 'pending-text'}>
                                        {req.status}
                                    </span>
                                </td>
                                <td>
                                    {req.status === 'pending' && (
                                        <>
                                            <button className="approve-btn" onClick={() => processRequest(req._id, 'approved')}>Approve</button>
                                            <button className="active-promo-btn" style={{ marginLeft: '5px' }} onClick={() => processRequest(req._id, 'rejected')}>Reject</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colspan="7">No requests found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default AdminBotRequests;
