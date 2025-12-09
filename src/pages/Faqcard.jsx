import React from 'react'
import { ImStack } from 'react-icons/im'
import { SiReactos } from 'react-icons/si'
import { TbCertificate, TbChartDots2 } from 'react-icons/tb'
import { TfiPieChart } from 'react-icons/tfi'
import { BsBarChartLine } from 'react-icons/bs'
import { BiNetworkChart } from 'react-icons/bi'
import { GiChart } from 'react-icons/gi'
import { MdOutlineAddchart } from 'react-icons/md'
const Faqcard = () => {
    return (
        <div className='why-choose-section'>
            <div className="why-choose-us-text-container">
                <div className="header" data-aos="fade-up">
                    <span className="header-line"></span>
                    <h2>why choose us</h2>
                </div>
                <h1 data-aos="fade-up">best qualities</h1>
                <p data-aos="fade-up">Our Team combines a passion for esports, industry experise & proven record in finance, development, marketing.</p>
            </div>
            <div className="why-choose-us-card-container">
                <div className="why-choose-us-card distort-container" data-aos="fade-up">
                    <span className="card-counter counter-distorted">
                        <TfiPieChart />
                    </span>
                    <div className="distorted-card-wrapper">
                        <h2>crypto market arbitrage</h2>
                        <h3>arbitrage</h3>
                        <span className="distorted-line"></span>
                        <p>Maximizing the slightest differences in prices in the crypto digital market to generate consistent returns.</p>
                    </div>
                </div>
                <div className="why-choose-us-card distort-container" data-aos="fade-up">
                    <span className="card-counter counter-distorted">
                        <BsBarChartLine />
                    </span>
                    <div className="distorted-card-wrapper">
                        <h2>AI Trading Intelligence</h2>
                        <h3>AI trading</h3>
                        <span className="distorted-line"></span>
                        <p>Co-partnerships with leading Artificial Trading Intelligence agencies to leverage advanced algorithms for market success.</p>
                    </div>
                </div>
                <div className="why-choose-us-card distort-container" data-aos="fade-up">
                    <span className="card-counter counter-distorted">
                        <BiNetworkChart />
                    </span>
                    <div className="distorted-card-wrapper">
                        <h2>Real Estate Investment</h2>
                        <h3>real estate</h3>
                        <span className="distorted-line"></span>
                        <p>Real-time investment in high-value real estate sectors to build solid equity and long-term asset growth.</p>
                    </div>
                </div>
                <div className="why-choose-us-card distort-container" data-aos="fade-up">
                    <span className="card-counter counter-distorted">
                        <GiChart />
                    </span>
                    <div className="distorted-card-wrapper">
                        <h2>Natural Resources</h2>
                        <h3>commodities</h3>
                        <span className="distorted-line"></span>
                        <p>Strategic investment in profitable natural resources sectors, diversifying portfolios with tangible global assets.</p>
                    </div>
                </div>
                <div className="why-choose-us-card distort-container" data-aos="fade-up">
                    <span className="card-counter counter-distorted">
                        <MdOutlineAddchart />
                    </span>
                    <div className="distorted-card-wrapper">
                        <h2>Open-Digital Platform</h2>
                        <h3>platform</h3>
                        <span className="distorted-line"></span>
                        <p>A transparent and accessible open-digital platform designed to empower every investor with market opportunities.</p>
                    </div>
                </div>
                <div className="why-choose-us-card distort-container" data-aos="fade-up">
                    <span className="card-counter counter-distorted">
                        <TbChartDots2 />
                    </span>
                    <div className="distorted-card-wrapper">
                        <h2>Client Satisfaction</h2>
                        <h3>satisfaction</h3>
                        <span className="distorted-line"></span>
                        <p>Creating a satisfactory system focused on maximizing client returns through diverse and intelligent investment strategies.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faqcard