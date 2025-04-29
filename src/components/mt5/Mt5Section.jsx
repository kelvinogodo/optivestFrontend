import React from 'react'
import './mt5section.css'
import {Link } from 'react-router-dom'
const Mt5Section = () => {
  return (
      <section className='service-section'>
          <div className="why-choose-us-text-container">
            <div className="header" data-aos="fade-up">
                <span className="header-line"></span>
                <h2>investment assets</h2>
            </div>
            <h1 data-aos="fade-up">we invest in</h1>
            <p data-aos="fade-up">Our Team combines an advanced knowledge in arbitrage trading,marketing, real estate and good work ethics to give you the best investment experience you deserve.</p>
        </div>
          <div className="service-card-container">
              <div className="gold-card" data-aos="fade-up">
              <img src="/pexels-sejio402-29336323.jpg" alt="" />
              <div className="gold-card-text">
                  <small>09/07/17</small>
                  <h3>gold stock investment</h3>
                  <p>Boardbank is a premier gold stock investment company dedicated to guiding our clients through the world of gold investments. Our mission is to empower clients with the knowledge they need to make confident and informed decisions....</p>
                  <Link to="/goldstock">read more</Link>
              </div>
              </div>
              <div className="gold-card" data-aos="fade-up">
              <img src="/pexels-energepic-com-27411-313691.jpg" alt="" />
              <div className="gold-card-text">
                  <small>01/09/16</small>
                  <h3>real estate and housing</h3>
                  <p>In an era where financial stability and the pursuit of Boardbank are paramount, real estate investment has become an exceptionally rewarding opportunity..</p>
                  <Link to="/realestate">read more</Link>
              </div>
              </div>
              <div className="gold-card" data-aos="fade-up">
              <img src="/pexels-enniwann-9964560.jpg" alt="" />
              <div className="gold-card-text">
                  <small>03/03/17</small>
                  <h3>agro-tech investment</h3>
                  <p>
                    In an era of rapidly advancing technology, the agricultural sector has undergone a remarkable transformation. Agrotech investments have become a highly promising avenue for generating Boardbank.</p>
                      <Link to="/agrotech">read more</Link>
              </div>
              </div>
          </div>
    </section>
  )
}

export default Mt5Section