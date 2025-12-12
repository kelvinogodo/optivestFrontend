import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IoHome } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { FaUserGear } from "react-icons/fa6";
import { FaChartLine, FaRobot } from "react-icons/fa6";
const AdminHeader = ({ route, openCreateTrader, openTraderLogs, openUsers, openLogin, openBulkEmail }) => {
    const [showModal, setShowModal] = useState(false)
    const [bgColor, setBgColor] = useState(false)
    const changeOnScroll = () => {
        if (window.scrollY >= 90) {
            setBgColor(true)
        }
        else {
            setBgColor(false)
        }
    }
    window.addEventListener('scroll', changeOnScroll)
    const navigate = useNavigate()
    return (
        <motion.header className={`${bgColor && 'scroll-color'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65 }}
        >
            <div className="logo-container">
                <img src="/boardbanklogo1.png" alt="company_logo" className='logo' onClick={() => {
                    navigate('/')
                }} />
            </div>
            <nav>
                <ul>
                    <li>
                        <p onClick={() => {
                            openUsers()
                        }} className='admin-link'>home</p>
                        <span className='line'></span>
                    </li>
                    <li>
                        <p onClick={() => {
                            openCreateTrader()
                        }} className='admin-link'>change password</p>
                        <span className='line'></span>
                    </li>
                    <li>
                        <p onClick={() => {
                            openTraderLogs()
                        }} className='admin-link'>update wallets</p>
                        <span className='line'></span>
                    </li>
                    <li>
                        <p onClick={() => {
                            openBulkEmail()
                        }} className='admin-link'>bulk email</p>
                        <span className='line'></span>
                    </li>
                    <li>
                        <Link to="/admin/bot-requests" className='admin-link'>bot requests</Link>
                        <span className='line'></span>
                    </li>
                </ul>
            </nav>
            <div className="sign-up-btn-container">
                <button className='signup-btn' onClick={() => { openLogin() }}>logout</button>
            </div>
            <div class="mobile-menu-container" onClick={() => {
                setShowModal(!showModal)
            }} >
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="line3"></div>
            </div>
            <div className={`overlay ${showModal ? 'showing-modal' : ''}`} onClick={() => {
                setShowModal(false)
            }}>
                <div class="menu-card">
                    <ul class="list">
                        <li class="element">
                            <IoHome />
                            <p onClick={() => { openUsers() }} class="label">home</p>
                        </li>
                        <li class="element">
                            <svg
                                class="lucide lucide-user-round-plus"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                stroke-width="2"
                                stroke="rgb(230, 184, 11)"
                                fill="rgb(230, 184, 11)"
                                viewBox="0 0 24 24"
                                height="24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 21a8 8 0 0 1 13.292-6"></path>
                                <circle r="5" cy="8" cx="10"></circle>
                                <path d="M19 16v6"></path>
                                <path d="M22 19h-6"></path>
                            </svg>
                            <p class="label" onClick={() => { openTraderLogs() }}>update wallets</p>
                        </li>
                    </ul>
                    <ul class="list">
                        <li class="element">
                            <FaUserGear />
                            <p class="label" onClick={() => { openCreateTrader() }}>change password</p>
                        </li>
                    </ul>
                    <ul class="list">
                        <li class="element">
                            <FaRegEdit />
                            <p class="label" onClick={() => { openBulkEmail() }}>bulk email</p>
                        </li>
                    </ul>
                    <ul class="list">
                        <li class="element">
                            <FaRobot />
                            <Link to="/admin/bot-requests" className='label' style={{ textDecoration: 'none', color: 'inherit' }}>bot requests</Link>
                        </li>
                    </ul>
                    <ul class="list">
                        <li class="element">
                            <FaUserCheck />
                            <p onClick={() => openLogin()} class="label">logout</p>
                        </li>
                    </ul>
                </div>
            </div>
        </motion.header>
    )
}

export default AdminHeader