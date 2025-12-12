import React from 'react'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
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
import { Pagination, Navigation, FreeMode } from "swiper";
import Checkout from '../Checkout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


const TradingBot = ({ route }) => {

  const navigate = useNavigate()
  const [main, setMain] = useState(true)
  const [checkoutPage, setCheckoutPage] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [activeMethod, setActiveMethod] = useState()
  const [withdrawMethods, setWithdrawalMethods] = useState([
    {
      id: 1,
      min: 800,
      max: 1000,
      image: '/btc.png',
      method: 'BTC',
      wallet: '1CXvoN7vDkjpbxyjGFDQxeABdrS6YDPYu2',
    },
    {
      id: 2,
      min: 800,
      max: 1000,
      image: '/etherium.png',
      method: 'ETH',
      wallet: '0x3E69c1EF5E12Bd2286456D558EcE3d00e6d88539'
    },
    {
      id: 3,
      min: 800,
      max: 1000,
      image: '/tron.png',
      method: 'tether(TRC20) ',
      wallet: 'TNhysp5YZEwxadQZB7GhnaFES58MELGhmE'
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

  const close = () => {
    setCheckoutPage(false)
  }
  const updateMain = () => {
    setMain(true)
  }

  return (
    <>
      {main &&
        <div>
          <Userdashboardheader route={route} />
          <div className="page-swiper-wrapper">

            <div className="page-header">
              <h3>Purchase Third-Party Trading Bot</h3>
              <h2>Baux Bot</h2>
            </div>
            <div className="swiper-container tradebot-container">
              <div class="plan">
                <div class="inner">
                  <span class="pricing">
                    <span>
                      $800 <small>/6 months</small>
                    </span>
                  </span>
                  <p class="ttitle">Baux Bot</p>
                  <p class="iinfo">
                    <FaRobot />
                  </p>
                  <p className="baux-description" style={{ textAlign: 'center', fontSize: '0.9rem', marginBottom: '1rem', padding: '0 10px',color: '#6e6e6eff' }}>
                    With BAUXBOT, you not only gain access to ready-to-use expert advisor but also an intuitive Bot Generator, enabling you to create fully customized trading systems without any stress or experience. Its automation built for investors of all levels, combining simplicity, flexibility, and advanced AI.
                  </p>
                  <div class="action" >
                    <Link to="/bot-purchase" class="button" >
                      Purchase
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
      {
        showModal &&
        <>
          <Userdashboardheader route={route} />
          <div className="page-swiper-wrapper">
            <div className="floating-btn" onClick={() => {
              updateMain()
              setShowModal(false)
            }}>
              <AiOutlineArrowLeft />
            </div>
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
                modules={[Navigation]}
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
                      <button className="deposit-btn" onClick={() => {
                        setActiveMethod({
                          id: `${withdrawmethod.id}`,
                          min: `${withdrawmethod.min}`,
                          max: `${withdrawmethod.max}`,
                          image: `${withdrawmethod.image}`,
                          method: `${withdrawmethod.method}`,
                          wallet: `${withdrawmethod.wallet}`
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
                      <button className="deposit-btn" onClick={() => {
                        setActiveMethod({
                          id: `${withdrawmethod.id}`,
                          min: `${withdrawmethod.min}`,
                          max: `${withdrawmethod.max}`,
                          image: `${withdrawmethod.image}`,
                          method: `${withdrawmethod.method}`,
                          wallet: `${withdrawmethod.wallet}`
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
        <Checkout Active={activeMethod} depositAmount={800} closepage={close} route={route} updateMain={updateMain} />
      }
    </>
  )
}

export default TradingBot