import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import Loader from '../Loader'
const Investments = ({ route }) => {


  const navigate = useNavigate()
  const [userData, setUserData] = useState()
  const [loader, setLoader] = useState(false)

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getPlanDuration = (planType) => {
    // Hybrid Logic: VIP = 7 days, Others = 365 days
    if (planType && (planType.includes('VIP') || planType.includes('vip'))) return 7 * 24 * 60 * 60 * 1000;
    return 365 * 24 * 60 * 60 * 1000;
  };

  const getEndTime = (refer) => {
    if (refer.endDateMs) return refer.endDateMs;
    // Fallback for legacy data
    const startTime = refer.started || Date.parse(refer.startDate);
    if (startTime) return startTime + getPlanDuration(refer.plan);
    return Date.now();
  };

  const formatTimeLeft = (ms) => {
    if (ms <= 0) return "0d 0h 0m 0s";
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    setLoader(true)
    if (localStorage.getItem('token')) {
      const getData = async () => {
        const req = await fetch(`${route}/api/getData`, {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        })
        const res = await req.json()
        setUserData(res)
        setLoader(false)
      }
      getData()
    }
    else {
      navigate('/login')
    }
  }, [])
  return (
    <div>
      <Userdashboardheader route={route} />
      {
        loader &&
        <Loader />
      }
      {userData && userData.invest.length !== 0 ?
        <div className="page-swiper-wrapper">
          <div className="page-header">
            <h3>checkout your investment logs</h3>
            <h2>Investment logs</h2>
            <p>we keep track of all your invesments</p>
          </div>
          <div className="transaction-container no-ref">
            <table>
              <thead>
                <tr>
                  <td>amount</td>
                  <td>plan</td>
                  <td>started</td>
                  <td>profit earned</td>
                  <td>total profit per day</td>
                  <td>status</td>
                  <td>expires in</td>
                </tr>
              </thead>
              <tbody>
                {
                  userData.invest.map((refer, index) => {
                    const endTime = getEndTime(refer);
                    const timeLeft = endTime - now;
                    const isActive = refer.active !== false && timeLeft > 0;

                    return (
                      <tr key={index}>
                        <td>${refer.amount} USD</td>
                        <td>{refer.plan}</td>
                        <td>{refer.startDate}</td>
                        <td>
                          {(() => {
                            const dailyProfit = parseFloat(refer.profit) || 0;
                            const startTime = refer.started || Date.parse(refer.startDate);
                            // Ensure valid start time
                            if (!startTime) return '0.00 USD';

                            const duration = getPlanDuration(refer.plan);
                            const effectiveEndTime = startTime + duration;

                            // Calculate elapsed time (capped at end time)
                            const currentOrEndTime = Math.min(now, effectiveEndTime);
                            const elapsedMs = Math.max(0, currentOrEndTime - startTime);
                            const daysElapsed = elapsedMs / (1000 * 60 * 60 * 24);

                            const earned = daysElapsed * dailyProfit;
                            return `$${earned.toFixed(2)} USD`;
                          })()}
                        </td>
                        <td>${refer.profit} USD</td>
                        <td style={{ color: isActive ? 'green' : 'red', fontWeight: 'bold' }}>
                          {isActive ? 'Active' : 'Ended'}
                        </td>
                        <td style={{ minWidth: '120px' }}>
                          {isActive ? formatTimeLeft(timeLeft) : 'Expired'}
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        :
        <div className="page-swiper-wrapper">
          <div className="failure-page no-referral-page">
            <img src="/preview.gif" alt="" className='failure-img' />
            <p>You have not invested yet. Click the button below to make your first investment</p>
            <Link to='/fundwallet'>invest</Link>
          </div>
        </div>
      }

    </div>
  )
}

export default Investments