import React from 'react'
import './plan.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
const Plan = () => {
    const navigate = useNavigate()
    const [withdrawMethods,setWithdrawalMethods] = useState([
      {
        id:1,
        min:'1,000',
        max:'4,999',
        image:'/btc.png',
        method:'BTC',
        type:'Tryo plan',
        percent:'7.5',
        duration:'365 days'
      },
      {
        id:2,
        min:'5,000',
        max:'9,499',
        image:'/tron.png',
        method:'tether(TRC20)',
        type:'Medical Plan',
        percent:'25.90',
        duration:'365 days'
      },
      {
        id:3,
        min:'9,500',
        max:'50,000',
        image:'/tron.png',
        type:'Gold plan',
        percent:'33.50',
        duration:'365 days'
      },
      {
        id:4,
        min:'25,000',
        max:'54,499',
        image:'/tron.png',
        type:'Veltrix Plan',
        percent:'39.90',
        duration:'365 days'
      },
      {
        id:5,
        min:'88,000',
        max:'1,000,000',
        image:'/tron.png',
        type:'Ruby Account',
        percent:'20.976',
        duration:'365 days'
      },
      {
        id:6,
        min:'55,000',
        max:'150,000',
        image:'/tron.png',
        type:'VIP I Plan',
        percent:'41.395',
        duration:'365 days'
      },
      {
        id:7,
        min:'150,000',
        max:'5,000,000',
        image:'/tron.png',
        type:'VIP II',
        percent:'45.96',
        duration:'365 days'
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
                    weekly income
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