import React from 'react'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import {FiArrowRight} from 'react-icons/fi'
import { motion,AnimatePresence } from 'framer-motion'
import {MdClose} from 'react-icons/md'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Swal from 'sweetalert2'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import './userdashboardfundaccount.css'
import { useEffect } from 'react'
import { Pagination, Navigation ,FreeMode} from "swiper";
import Checkout from '../Checkout';
import { useState } from 'react';
import Loader from '../Loader'
import { useNavigate } from 'react-router-dom'
const Userdashboardfundaccount = ({route}) => {
  const navigate = useNavigate()
  const [depositAmount, setDepositAmount] = useState()
  const [checkoutPage,setCheckoutPage] = useState(false)
  const [showModal,setShowModal] =useState(false)
  const [activeMethod, setActiveMethod] = useState()
  const [loader, setLoader] = useState(false)
  
  const [withdrawMethods,setWithdrawalMethods] = useState([
    {
      id:1,
      min:50,
      max:1000,
      image:'/btc.png',
      method:'BTC',
      wallet:'1CXvoN7vDkjpbxyjGFDQxeABdrS6YDPYu2',
    },
    {
      id:2,
      min:50,
      max:1000,
      image:'/etherium.png',
      method:'ETH',
      wallet:'0x3E69c1EF5E12Bd2286456D558EcE3d00e6d88539'
    },
    {
      id:3,
      min:50,
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
    

    
  }
  const [wallets, setWallets] = useState()

    const fetchWallets = async () => {
    setLoader(true)
    const req = await fetch(`${route}/api/fetchWallets`)
    const res = await req.json()
    if (res.status === 200) {
      setLoader(false)
      setWallets(res.wallets)
    }
  }

  useEffect(()=>{ 
        fetchWallets()
  }, [])
  

  return (
    <>
      {loader && <Loader />}
    {!checkoutPage &&
      <div>
      {
            showModal &&
          <AnimatePresence 
            initial={{y:45, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{duration:0.65,delay:0.4}}
          >
          <motion.div 
            
          >
            <div className="modal-container">
              <div className="modal">
                <div className="modal-header">
                  <h2>deposit via {activeMethod.method}</h2>
                  <p>minimum deposit: {activeMethod.min} USD</p>
                </div>
              <MdClose className='close-modal-btn' onClick={()=>{setShowModal(false)}}/>
                <div className="modal-input-container">
                  <div className="modal-input">
                    <input type="tel" placeholder='0.00' onChange={(e)=>{
                      setDepositAmount(parseInt(e.target.value))
                    }}/>
                    <span>USD</span>
                  </div>
                </div>
                <div className="modal-btn-container">
                  <button class="noselect" onClick={()=>{setShowModal(false)}}>
                    <span class="text">close</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg"       width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
                  </button>
                  <button className='next' onClick={()=>{
                    if(depositAmount >= activeMethod.min){
                      setCheckoutPage(true)
                    }
                    else if(isNaN(depositAmount)){
                      Toast.fire({
                        icon: 'warning',
                        title: 'only numbers are accepted'
                      })
                    }
                    else{
                      Toast.fire({
                        icon: 'warning',
                        title: 'Deposit Amount too low'
                      })
                    }
                  }}>
                    <span class="label">Next</span>
                    <span class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            </motion.div>
          </AnimatePresence >
          }
        <Userdashboardheader route={route}/>
        <div className="page-swiper-wrapper">
            <div className="page-header">
                <h3>Choose an Option</h3>
                <h2>Deposit Methods</h2>
                <p>Choose a deposit method to add money.</p>
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
                  { wallets ?
                      wallets.map((withdrawmethod) => (
                      <SwiperSlide key={withdrawmethod._id} className='my-slide'>
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
                          id:`${withdrawmethod._id}`,
                          min:`${withdrawmethod.min}`,
                          max:`${withdrawmethod.max}`,
                          image:`${withdrawmethod.image}`,
                          method:`${withdrawmethod.method}`,
                          wallet:`${withdrawmethod.address}`
                        })
                        setShowModal(true)
                      }}>deposit</button>
                    </SwiperSlide>
                    )) : ''}
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
                        setShowModal(true)
                      }}>deposit</button>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            
            <button className="history-btn" onClick={()=>{
              navigate('/deposit')
            }}>
              deposit history
              <FiArrowRight />
            </button>
        </div> 
    </div>}
    {
        checkoutPage &&
        <Checkout Active={activeMethod} depositAmount={depositAmount} closepage={close} route={route} updateMain={ updateMain}/>
    }
    </> 
  )
}

export default Userdashboardfundaccount