import React from 'react'
import './plan.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
const Plan = () => {
  const navigate = useNavigate()
  const [withdrawMethods, setWithdrawalMethods] = useState([
    {
      id: 1,
      min: '500',
      max: '4,999',
      image: '/btc.png',
      method: 'BTC',
      type: 'Tryo Plan',
      percent: '7.5',
      duration: '365 days'
    },
    {
      id: 2,
      min: '5,000',
      max: '9,499',
      image: '/tron.png',
      method: 'tether(TRC20)',
      type: 'Ruby Account',
      percent: '20',
      duration: '365 days'
    },
    {
      id: 3,
      min: '9,500',
      max: '24,999',
      image: '/tron.png',
      type: 'Medial Plan',
      percent: '25.90',
      duration: '365 days'
    },
    {
      id: 4,
      min: '25,000',
      max: '54,499',
      image: '/tron.png',
      type: 'Veltrix Plan',
      percent: '39.90',
      duration: '365 days'
    },
    {
      id: 5,
      min: '55,000',
      max: '149,999',
      image: '/tron.png',
      type: 'VIP I',
      percent: '41.30',
      duration: '7 days'
    },
    {
      id: 6,
      min: '150,000',
      max: '5,000,000',
      image: '/tron.png',
      type: 'VIP II',
      percent: '45.96',
      duration: '7 days'
    },
  ])
  return (
    <div className='plan-section'>
      <div className="videoframe-text-container" data-aos="fade-up">
        <h1>our  <span className="highlight">investment </span> plans</h1>
        <p>These plans offer a range of weekly returns designed for different goals and capital levels. The Tryo and Ruby plans provide steady long-term growth over 365 days, while higher-tier plans like Medial and Veltrix offer significantly faster expansion with their elevated weekly percentages. The VIP I and VIP II plans stand out as short-duration options, built for rapid 7-day cycles and the highest weekly gains in the lineup. Each plan represents a different level of potential growth, allowing users to choose based on their preferred pace, capital, and risk tolerance.</p>
      </div>
      <div className="service-gap"></div>
      <div className="why-choose-us-text-container">
        <div className="header" data-aos="fade-up">
          <span className="header-line"></span>
          <h2>best plans</h2>
        </div>
        <h1 data-aos="fade-up">select an investment plan</h1>
        <p data-aos="fade-up">that suits your investment goal.</p>
      </div>
      <div className="plan-card-container">
        {
          withdrawMethods.map((withdrawmethod) => (
            <div class="pack-container" key={withdrawmethod.id} data-aos="fade-up">
              <div class="pack-header">
                <h3>{withdrawmethod.type}</h3>

              </div>
              <div>
                <ul class="lists">
                  <li class="list">
                    <span>
                      <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
                      </svg>
                    </span>
                    <p>
                      {withdrawmethod.percent}% instant weekly withdrawals
                    </p>
                  </li>
                  <li class="list">
                    <span>
                      <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
                      </svg>
                    </span>
                    <p>
                      {withdrawmethod.duration} duration
                    </p>
                  </li>
                  <li class="list">
                    <span>
                      <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
                      </svg>
                    </span>
                    <p>
                      referral commission - 10%
                    </p>
                  </li>
                  <li class="list">
                    <span>
                      <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
                      </svg>
                    </span>
                    <p>
                      minimum deposit - ${withdrawmethod.min}
                    </p>
                  </li>
                  <li class="list">
                    <span>
                      <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
                      </svg>
                    </span>
                    <p>
                      maximum deposit - ${withdrawmethod.max}
                    </p>
                  </li>
                </ul>
              </div>
              <div class="buttons-container" onClick={navigate('/login')}>
                <Link to='/login'>
                  <button type="button">
                    Invest Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Plan