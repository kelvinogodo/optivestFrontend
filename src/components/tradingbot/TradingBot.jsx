import React from 'react'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import {FiArrowRight} from 'react-icons/fi'
import { motion,AnimatePresence } from 'framer-motion'
import {MdClose} from 'react-icons/md'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FaRobot } from "react-icons/fa";
import Swal from 'sweetalert2'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import './tradingbot.css'
import { Pagination, Navigation ,FreeMode} from "swiper";
import Checkout from '../Checkout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


const TradingBot = ({ route }) => {

  const navigate = useNavigate()
    const [main, setMain] = useState(true)
    const [checkoutPage,setCheckoutPage] = useState(false)
    const [showModal,setShowModal] =useState(false)
    const [activeMethod, setActiveMethod] = useState()
    const [withdrawMethods,setWithdrawalMethods] = useState([
        {
          id:1,
          min:800,
          max:1000,
          image:'/btc.png',
          method:'BTC',
          wallet:'1CXvoN7vDkjpbxyjGFDQxeABdrS6YDPYu2',
        },
        {
          id:2,
          min:800,
          max:1000,
          image:'/etherium.png',
          method:'ETH',
          wallet:'0x3E69c1EF5E12Bd2286456D558EcE3d00e6d88539'
        },
        {
          id:3,
          min:800,
          max:1000,
          image:'/tron.png',
          method:'tether(TRC20) ',
          wallet:'TNhysp5YZEwxadQZB7GhnaFES58MELGhmE'
        },
      ])
  
    // sweel alert code 
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
  
    const close = ()=>{
      setCheckoutPage(false)
    }
  const updateMain = () => {
      setMain(true)
    }

  return (
    <>
    {main &&
      <div>
        <Userdashboardheader route={route}/>
        <div className="page-swiper-wrapper">
            <div className="page-header">
                <h3>Purchase Third-Party Trading Bot</h3>
                <h2>Trading Bot</h2>
            </div>
            <div className="swiper-container tradebot-container">
              <div class="plan">
                  <div class="inner">
                    <span class="pricing">
                      <span>
                        $800 <small>/ yr</small>
                      </span>
                    </span>
                    <p class="ttitle">Tradebot</p>
                  <p class="iinfo">
                    <FaRobot />
                    </p>
                    <ul class="features">
                      <li>
                        <span class="icon">
                          <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                          </svg>
                        </span>
                        <span><strong>Safe</strong> </span>
                      </li>
                      <li>
                        <span class="icon">
                          <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                          </svg>
                        </span>
                        <span> <strong> Fast</strong></span>
                      </li>
                      <li>
                        <span class="icon">
                          <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                          </svg>
                        </span>
                        <span><strong> Reliable</strong></span>
                      </li>
                    </ul>
                  <div class="action" onClick={() => { setShowModal(true); setMain(false) } }>
                    <a class="button" href="#">
                      Purchase
                    </a>
                    </div>
                  </div>
                </div>
            </div>
        </div> 
        </div>}
      {
        showModal &&
        <>
          <Userdashboardheader route={route}/>
           <div className="page-swiper-wrapper">
              <div className="page-header">
                  <h3>Choose a Payment Option</h3>
                  <h2>purchase Methods</h2>
              </div>
              <div className="swiper-container">
                  <Swiper
                      slidesPerView={3}
                      spaceBetween={30}
                      slidesPerGroup={1}
                      loop={true}
                      loopFillGroupWithBlank={true}
                      navigation={true}
                      modules={[ Navigation]}
                      className="mySwiper"
                  >
                    {
                        withdrawMethods.map((withdrawmethod) => (
                        <SwiperSlide key={withdrawmethod.id} className='my-slide'>
                        <div className="crypto-card-img-container">
                          <img src={withdrawmethod.image} alt="" />
                          <h2>{withdrawmethod.method}</h2>
                        </div>
                        <div className="investrange-container">
                          <div className="investrange-card">
                            <p>minimum:</p>
                            <p>{withdrawmethod.min} USD</p>
                          </div>
                          <div className="investrange-card">
                            <p>charge</p>
                            <p>0 USD + 0%</p>
                          </div>
                        </div>
                        <button className="deposit-btn" onClick={()=>{
                          setActiveMethod({
                            id:`${withdrawmethod.id}`,
                            min:`${withdrawmethod.min}`,
                            max:`${withdrawmethod.max}`,
                            image:`${withdrawmethod.image}`,
                            method:`${withdrawmethod.method}`,
                            wallet:`${withdrawmethod.wallet}`
                          })
                              setCheckoutPage(true)
                              setShowModal(false)
                        }}>select</button>
                      </SwiperSlide>
                      ))}
                  </Swiper>
              </div>
              <div className="swiper-container mobile-swiper-container">
                  <Swiper
                    spaceBetween={30}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                  >
                    {
                        withdrawMethods.map((withdrawmethod) => (
                        <SwiperSlide key={withdrawmethod.id} className='my-slide'>
                        <div className="crypto-card-img-container">
                          <img src={withdrawmethod.image} alt="" />
                          <h2>{withdrawmethod.method}</h2>
                        </div>
                        <div className="investrange-container">
                          <div className="investrange-card">
                            <p>minimum:</p>
                            <p>{withdrawmethod.min} USD</p>
                          </div>
                          <div className="investrange-card">
                            <p>charge</p>
                            <p>0 USD + 0%</p>
                          </div>
                        </div>
                        <button className="deposit-btn" onClick={()=>{
                          setActiveMethod({
                            id:`${withdrawmethod.id}`,
                            min:`${withdrawmethod.min}`,
                            max:`${withdrawmethod.max}`,
                            image:`${withdrawmethod.image}`,
                            method:`${withdrawmethod.method}`,
                            wallet:`${withdrawmethod.wallet}`
                          })
                              setCheckoutPage(true)
                              setShowModal(false)
                        }}>select</button>
                      </SwiperSlide>
                      ))}
                  </Swiper>
            </div>
          </div>
        </>
      }
    {
        checkoutPage &&
        <Checkout Active={activeMethod} depositAmount={800} closepage={close} route={route} updateMain={ updateMain} />
    }
    </>
  )
}

export default TradingBot