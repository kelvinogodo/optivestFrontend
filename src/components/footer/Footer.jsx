import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
const Footer = () => {
  return (
    <footer className='footer'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1919 274" className='svg-line'>
        <path fill="none" stroke="#fff" stroke-dasharray="12" d="M-150,908.21396 C-151.16508,816.022735 -42.010869,767.607158 177.462632,762.967229 C506.672884,756.007334 405.185109,537.831699 865.446032,604.840708 C1325.70696,671.849717 1270.71837,423 1687.44603,540.526473 C2104.17369,658.052946 2011.79501,428.896794 2076.92909,423 C2075.67597,582.585165 2075.67597,744.323151 2076.92909,908.21396 L-150,908.21396 Z" opacity=".5" transform="translate(-1 -508)"/>
      </svg>
        <div className="trusted-patners-section">
            <h2 data-aos="fade-up">our partners</h2>
            <div className="trusted-patners-img-container">
                <img src="/a-xs-light.png" alt="" className="trusted-patener-icon" data-aos="fade-up"/>
                <img src="/b-xs-light.png" alt="" className="trusted-patener-icon" data-aos="fade-up"/>
                <img src="/c-xs-light.png" alt="" className="trusted-patener-icon" data-aos="fade-up"/>
                <img src="/d-xs-light.png" alt="" className="trusted-patener-icon" data-aos="fade-up"/>
                <img src="/e-xs-light.png" alt="" className="trusted-patener-icon" data-aos="fade-up"/>
            </div>
        </div>
        <div className="quicklinks-container">
            <div className="quicklink-card-container">
                <div className="quicklink-card quick-link-logo-container" data-aos="fade-up">
                    <img src="/whitelogo (1).png" alt="" className='logo' />
                </div>
                <div className="quicklink-card" data-aos="fade-up">
                    <Link to='/'>home</Link>
                      <Link to="/about">about</Link>
                      <Link to="/faq">roadmap</Link>
                </div>
                <div className="quicklink-card" data-aos="fade-up">
                      <Link to="/faq">faqs</Link>
                      <Link to="/about">why choose us</Link>
                    <Link to="/buybitcoin">buy bitcoin</Link>
                </div>
                <div className="quicklink-card" data-aos="fade-up">
                </div>
            </div>
            <div className="copyright-container">
                <div className="copyright-txt">
                    <p> copyright &copy; 2022</p>
                </div>
                <div className="policy-txt">
                    <Link to="/policy">privacy policy</Link>
                    <Link to="/policy">terms and condition</Link>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer