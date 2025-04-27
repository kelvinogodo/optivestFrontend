import React from 'react'
import './userdashboardhomepage.css'
import { RiLuggageDepositLine } from 'react-icons/ri'
import {MdOutlineDone} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect,useRef } from 'react'
import {FaUser} from 'react-icons/fa'
import {MdOutlineContentCopy} from 'react-icons/md'
import { FiLink } from 'react-icons/fi'
import { FaUsers } from 'react-icons/fa'
import { FaExchangeAlt,FaHandHoldingUsd } from 'react-icons/fa'
import { CgArrowsExchange } from 'react-icons/cg'
import Loader from '../Loader'
import TradingViewFinancials from '../TradingViewFinancials'
import TradingViewTechnicalAnalysis from '../TradingViewTechnicalAnalysis'
import TeslaWidget from '../TeslaWidget'
const Userdashboardhomepage = ({route}) => {
    const navigate = useNavigate()
    const [clipBoard, setClipBoard] = useState(false)
    const [userData, setUserData] = useState()
    const [loader,setLoader] = useState(false)
    const copy = ()=>{
        navigator.clipboard.writeText(clipRef.current.value)
    }
    const clipRef = useRef(null)

   useEffect(() => {
  const getData = async () => {
    try {
      setLoader(true);

      // Check if a token exists
        const token = localStorage.getItem('token');
        console.log(token)
      if (!token) {
        navigate('/login');
        return;
      }

      // Fetch user data from the API
      const response = await fetch(`${route}/api/getData`, {
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
      });

      // Parse the response
      const data = await response.json();

      // Handle errors from the API
      if (data.status === 'error') {
        localStorage.removeItem('token'); // Clear invalid token
        navigate('/login');
      } else {
        setUserData(data); // Set user data
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      navigate('/login'); // Navigate to login on failure
    } finally {
      setLoader(false); // Stop loader
    }
  };

  getData();
   }, [navigate, route]);
    
  return (
    <div className='homewrapper'>
      {
        loader &&
          <Loader />
      }
    <div className='dashboardhomepage'>
       
        <div className="dashboardhomepagewrapper">
            <div className="welcome-kyc-section">
                <p>wallet Balance</p>
                <div className="username-container">
              <h2>${userData ? userData.funded : ''}.00 USD</h2>
              <small className='profit'>${userData ? userData.periodicProfit : ''}.00 USD profit earned</small>
                </div>
            </div>
                  <div className="dash-btn-container">
                      <button className='dash-btn' onClick={() => navigate('/fundwallet')}>
                          <CgArrowsExchange />deposit
                      </button>
                      <button className='dash-btn' onClick={() => navigate('/withdraw')}>
                          <FaHandHoldingUsd />withdraw
                      </button>
          </div> 
          <div className="withdrawll-card-container">
            <div class="withdrawll-card">
              <p class="time-text"><span class="time-sub-text">$</span><span>{ userData && userData.totalprofit}</span></p>
            <div className="small-card">
                {/* <CgArrowsExchange /> */}
                <p class="day-text">total profit</p>
              </div>
            </div>
            <div class="withdrawll-card">
              <p class="time-text"><span class="time-sub-text">$</span><span>{ userData && userData.totalwithdraw}</span></p>
           <div className="small-card">
                {/* <CgArrowsExchange /> */}
                <p class="day-text">total withdrawal</p>
              </div>
            </div>
            <div class="withdrawll-card">
              <p class="time-text"><span class="time-sub-text">$</span><span>{ userData && userData.periodicProfit}</span></p>
            <div className="small-card">
                {/* <CgArrowsExchange /> */}
                <p class="day-text">bonus</p>
              </div>
            </div>
            <div class="withdrawll-card">
              <p class="time-text"><span class="time-sub-text">$</span><span>{userData && userData.totaldeposit}</span></p>
              <div className="small-card">
                {/* <CgArrowsExchange /> */}
                <p class="day-text">total deposit</p>
              </div>
            </div>
          </div>
            <div className="overview-container">
                      <div className="overview-card">
                        <div className="overview-icon-wrapper" onClick={()=>navigate('/myprofile')}>
                        <div className="overview-icon-container">
                            <FaUser />
                        </div>
                        <small>profile</small>
                        </div>
                        <div className="overview-icon-wrapper" onClick={()=>navigate('/plans')}>
                        <div className="overview-icon-container">
                            <RiLuggageDepositLine />
                        </div>
                        <small>invest</small>
                        </div>
                        <div className="overview-icon-wrapper" onClick={()=>navigate('/referrals')}>
                        <div className="overview-icon-container">
                            <FaUsers />
                        </div>
                        <small>referrals</small>
                        </div>
                        <div className="overview-icon-wrapper" onClick={()=>navigate('/transactions')}>
                        <div className="overview-icon-container">
                            <FaExchangeAlt />
                        </div>
                        <small>transactions</small>
                        </div>             
                    </div>
          </div>
          <section className='trading-view-forex-section dashboard-forex-section'>
                      <div className="videoframe-text-container" data-aos="fade-up">
                        <h1>market <span className="highlight">analysis </span></h1>
                      </div>
                    <div className="trading-view-forex-wrapper">
                        <div className="trading-view-card">
                            <div className="trading-view-card-text-container" data-aos="fade-up">
                                <h1>Technical Analysis</h1>
                                <p>See what the technical analysis says about a given symbol with our display ratings, made for easy viewing.</p>
                            </div>
                            <TeslaWidget />
                        </div>
                        <div className="trading-view-card">
                            <div className="trading-view-card-text-container" data-aos="fade-up">
                                <h1>Fundamental Data</h1>
                                <p>Kick the tires on the fundamentals with this deep dive into how a company is doing beyond simply its stock price.</p>
                            </div>
                            <TradingViewTechnicalAnalysis />
                        </div>
                    </div>
              </section>
            <div className="referral-section">
                <div className="referral-card1">
                    <div className="referraltext-wrapper">
                        <div className="referral-text-container">
                            <h2>refer us and earn 10% of every downline deposit</h2>
                            <p>Use the bellow link to invite your friends.</p>
                        </div>
                        <button className="invite-btn">invite</button>
                    </div>
                    <div className="click-to-copy-container">
                        <span className='clipboard-btn'>
                            <FiLink />
                        </span>
                        <input type="text" value={userData ? `stockedgecapital.com/user/${userData.username ? userData.username : userData.referral}` : ''} ref={clipRef}/>
                        <span className={`clipboard-btn ${clipBoard ? <MdOutlineDone /> : ''}` } onClick={()=>{
                            copy()
                            setClipBoard(!clipBoard)
                              }}>   
                            {
                                clipBoard ?
                                <MdOutlineDone /> : <MdOutlineContentCopy />
                            }
                        </span>
                    </div>  
                </div>
                <div className="referral-card1">
                    <div className="referraltext-wrapper">
                        <div className="referral-text-container">
                            <h2>my referral</h2>
                        </div>
                        <div className="referral-text-container small-card">
                            <h2>{userData ? userData.referred.length : '      '}</h2>
                            <p>referred users</p>
                        </div>
                        <div className="referral-text-container small-card">
                            <h2>{userData ? userData.refBonus : '        '} USD</h2>
                            <p>referral commission</p>
                        </div>

                    </div>
                    <img src="/bar4.png" alt="" className="bar4" />
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Userdashboardhomepage