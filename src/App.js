import {IoLogoWhatsapp} from 'react-icons/io'
import { Profiler, useEffect } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home';
import AOS from 'aos'
import 'aos/dist/aos.css'
import GoldPage from './pages/GoldPage'
import RealEsatePage from './pages/Real-EstatePage'
import AgroTechPage from './pages/AgroTechPage'
import Swal from 'sweetalert2';
import Signup from './pages/Signup';
import Userdashboard from './pages/Userdashboard'
import Userdashboardfundaccount from './components/userdashboardfundaccount/Userdashboardfundaccount'
import Userdashboardwithdraw from './components/userdashboardwithdraw/Userdashboardwithdraw';
import Userdashboardreferrals from './components/userdashboardreferrals/Userdashboardreferrals';
import Userdashboardplans from './components/userdashboardplans/Userdashboardplans';
import Userdashboardtransactions from './components/userdashboardtransactions/Userdashboardtransactions';
import Investments from './components/invesments/Investments';
import Profile from './components/profile/Profile'
import VerifyEmail from './pages/VerifyEmail';
import WithdrawalLogs from './components/WithdrawalLogs';
import Checkout from './components/Checkout';
import Admindashboard from './components/admindashboard/Admindashboard';
import Deposit from './components/deposit/Deposit';
import Aboutpage from './pages/Aboutpage';
import TradingBot from './components/tradingbot/TradingBot';
import Faq from './pages/Faq';
import Buybitcoin from './pages/Buybitcoin';
import Policy from './pages/Policy';
import './App.css'
import Service from './components/service/Service';

function App() {
   useEffect(() => {
    AOS.init({
      offset: 60,
      duration: 500,
      easing: 'ease-in-sine',
      delay: 100,
    })
      AOS.refresh()
    // duration=1200;
    }, [])

    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
 

  const route = 'https://optivest-backend.vercel.app'
  // const route = 'http://localhost:5000'
  
  return (
    <>
    <AnimatePresence >
        <Router>
        <motion.div className="App"
        key={Routes.Route}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{duration:0.2}}
        variants={{
          initialState:{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          animateState:{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          exitState:{
            clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          }
        }}
        >
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login route={route}/>}/>
            <Route path='/signup' element={<Signup route={route}/>}/>
            <Route path='/dashboard' element={<Userdashboard route={route}/>}/>
            <Route path='/fundwallet' element={<Userdashboardfundaccount route={route}/>}/>
            <Route path='/referrals' element={<Userdashboardreferrals route={route}/>}/>
            <Route path='/withdraw' element={<Userdashboardwithdraw route={route}/>}/>
            <Route path='/plans' element={<Userdashboardplans route={route}/>}/>
            <Route path='/transactions' element={<Userdashboardtransactions route={route}/>}/>
            <Route path='/investments' element={<Investments route={route}/>}/>
            <Route path='/myprofile' element={<Profile route={route}/>}/>
            <Route path='/user/:id' element={<VerifyEmail route={route}/>}/>
            <Route path='/withdrawlogs' element={<WithdrawalLogs route={route}/>}/>
            <Route path='/checkout' element={<Checkout route={route}/>}/>
            <Route path='/admin' element={<Admindashboard route={route}/>}/>
            <Route path='/deposit' element={<Deposit route={route}/>}/>
            <Route path='/about' element={<Aboutpage />}/>
            <Route path='/faq' element={<Faq />}/>
            <Route path='/policy' element={<Policy />}/>
            <Route path='/buybitcoin' element={<Buybitcoin />}/>
            <Route path='/goldstock' element={<GoldPage />}/>
            <Route path='/agrotech' element={<AgroTechPage />}/>
            <Route path='/realestate' element={<RealEsatePage />}/>
            <Route path='/services' element={<Service />}/>
              <Route path='/tradingbot' element={<TradingBot route={ route} />}/>
          </Routes>
        </motion.div>
      </Router>
      </AnimatePresence>
      {/* <span className="whatsapp-icon">
        <a href="https://api.whatsapp.com/send?phone=16822969023" target='blank'><IoLogoWhatsapp  /></a> 
      </span> */}
      {/* <div className="iframe-container">
      <iframe src="https://widget.coinlib.io/widget?type=horizontal_v2&amp;theme=dark&amp;pref_coin_id=1505&amp;invert_hover=" style={{width:"100%",height:"536px",scrolling:"none",marginWidth:"0",marginHeight:"0", frameBorder:"0", border:"0",lineHeight: '14px'}}>
          </iframe>
      </div> */}
    </>
  );
}

export default App
