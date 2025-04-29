import React from 'react'
import './plan.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
const Plan = () => {
    const navigate = useNavigate()
    const [withdrawMethods,setWithdrawalMethods] = useState([
      {
        id:1,
        min:'100',
        max:'999',
        image:'/btc.png',
        method:'BTC',
        type:'Peer plan',
        percent:'2',
        duration:'5 day(s)'
      },
      {
        id:2,
        min:'1,000',
        max:'4,999',
        image:'/bnb.png',
        method:'USDT',
        type:'Rose Plan',
        percent:'3',
        duration:'5 day(s)'
      },
      {
        id:3,
        min:'10,000',
        max:'30,000',
        image:'/tron.png',
        method:'tether(TRC20)',
        type:'Acorn Plan',
        percent:'4',
        duration:'7 day(s)'
      },
      {
        id:4,
        min:'30,000',
        max:'60,000',
        image:'/tron.png',
        method:'tether(TRC20)',
        type:'Grant plan',
        percent:'8',
        duration:'15 day(s)'
      },
      ])
  return (
    <div className='plan-section'>
      <div className="videoframe-text-container" data-aos="fade-up">
              <h1>our  <span className="highlight">investment </span> plans</h1>
              <p>Here are some carefully currated investment plans, created to ensure maximum return of investment.</p>
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
              <div class="price-container">
                {withdrawmethod.percent}
                <span>%</span>
              </div>
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
                    Instant withdrawal
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