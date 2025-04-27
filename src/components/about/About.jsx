import React from 'react'
import './about.css'
import Stocksoverview from '../../components/Stocksoverview'
import Stockscreener from '../../components/Stockscreener'
const About = () => {
  return (
      <div className='about-section' id='about'>
        <section className='trading-view-forex-section' data-aos="fade-up">
                    <div className="videoframe-text-container">
                      <h1><span className="highlight">Stocks</span> markets </h1>
                    </div>
                  <div className="trading-view-forex-wrapper">
                      <div className="trading-view-card">
                          <div className="trading-view-card-text-container" >
                              <h1>stocks Market</h1>
                              <p>This widget displays crypto assets and then sorts them by their market capitalization.</p>
                          </div>
                          <Stocksoverview />
                      </div>
                      <div className="trading-view-card">
                          <div className="trading-view-card-text-container" >
                              <h1>stocks market Screener</h1>
                              <p>Separate the wheat from the chaff with this embeddable Screener – handy for sorting symbols both by fundamental and technical indicators.</p>
                          </div>
                          <Stockscreener />
                      </div>
                  </div>
            </section>
    </div>
  )
}

export default About