import React from 'react'
import './admindashboard.css'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import Loader from '../Loader'
import { MdClose } from 'react-icons/md'
import AdminHeader from '../AdminHeader'
const Admindashboard = ({ route }) => {

  // sweet alert function 
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

  const creditUser = async () => {
    setLoader(true)
    const req = await fetch(`${route}/api/fundwallet`,
      {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: userAmount, email: email
        })
      })

    const res = await req.json()
    setLoader(false)
    if (res.status === 'ok') {
      Toast.fire({
        icon: 'success',
        title: `Acoount credited with  $${res.funded} USD`
      })
      const data = {
        service_id: 'service_878f9xm',
        template_id: 'template_0mgkpiq',
        user_id: 'jypXWeOBocgjEo5Cj',
        template_params: {
          'name': `${res.name}`,
          'email': `${res.email}`,
          'message': `${res.message}`,
          'reply_to': `support@boardbanking.com`,
          'subject': `${res.subject}`
        }
      };

      if (res.upline === null) {
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        })
      }
      else {
        const uplineData = {
          service_id: 'service_878f9xm',
          template_id: 'template_0mgkpiq',
          user_id: 'jypXWeOBocgjEo5Cj',
          template_params: {
            'name': `${res.uplineName}`,
            'email': `${res.uplineEmail}`,
            'message': `${res.uplineMessage}`,
            'reply_to': `support@boardbanking.com`,
            'subject': `${res.uplineSubject}`
          }
        };

        await Promise.all([
          await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
          }),
          await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(uplineData),
          })
        ])
      }

      setEmail('')
      setUserAmount('')
    }
    else {
      Toast.fire({
        icon: 'error',
        title: `sorry, something went wrong ${res.error} `
      })
    }
  }
  const [name, setName] = useState('')

  const approveWithdraw = async () => {
    const userDetails = await fetch(`${route}/api/getWithdrawInfo`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: activeEmail
      })
    })
    const awaitedData = await userDetails.json()
    console.log(awaitedData.amount)


    if (awaitedData.amount !== undefined) {
      const data = {
        service_id: 'service_878f9xm',
        template_id: 'template_0mgkpiq',
        user_id: 'jypXWeOBocgjEo5Cj',
        template_params: {
          'name': `${name}`,
          'email': `${activeEmail}`,
          'message': `Congratulations! your withdrawal $${awaitedData.amount} has been approved. confirm withdrawal of $${awaitedData.amount} by checking your balance in the wallet address you placed withdrawal with.`,
          'reply_to': `support@boardbanking.com`,
          'subject': `successful withdrawal`
        }
      };

      const req = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })

      const res = await req.json()
      if (res.status === 'OK') {
        Toast.fire({
          icon: 'success',
          title: `approval email sent`
        })
      } else {
        Toast.fire({
          icon: 'error',
          title: `email quota exceeded for the day`
        })
      }
    }
    else {
      Toast.fire({
        icon: 'error',
        title: `user hasn't made any withdrawal yet`
      })
    }
  }

  const navigate = useNavigate()
  const [showDeleteModal, setShowDeletModal] = useState()
  const [activeEmail, setActiveEmail] = useState('')
  const [showUpgradeModal, setShowUpgradeModal] = useState()
  const [showForm, SetShowFoarm] = useState(true)
  const [showDashboard, setShowDasboard] = useState(false)
  const [users, setUsers] = useState()
  const [loader, setLoader] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [userAmount, setUserAmount] = useState()
  const [showModal, setShowModal] = useState(false)

  const [showCreateTrader, setShowCreateTrader] = useState(false)
  const [showTraderLogs, setShowTraderLogs] = useState(false)
  const [showUsers, setShowUsers] = useState(true)
  const [wallets, setWallets] = useState()
  const [newPassword, setNewPassword] = useState()
  const [activeWallet, setActiveWallet] = useState()
  const [showActiveForm, setShowActiveWalletForm] = useState(false)
  const [newWallet, setNewWallet] = useState()
  const [newNetwork, setNewNetwork] = useState()

  // Bulk Email State
  const [showBulkEmail, setShowBulkEmail] = useState(false)
  const [emailSubject, setEmailSubject] = useState('')
  const [emailMessage, setEmailMessage] = useState('')

  const sendBulkEmail = async () => {
    if (!emailSubject || !emailMessage) {
      Toast.fire({
        icon: 'error',
        title: 'Subject and Message are required'
      })
      return;
    }
    setLoader(true)
    const req = await fetch(`${route}/api/admin/send-bulk-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject: emailSubject,
        message: emailMessage
      })
    })
    const res = await req.json()
    setLoader(false)
    if (res.status === 'ok') {
      Toast.fire({
        icon: 'success',
        title: `Emails sent successfully! Sent: ${res.sent}`
      })
      setEmailSubject('')
      setEmailMessage('')
    } else {
      Toast.fire({
        icon: 'error',
        title: res.message || 'Failed to send emails'
      })
    }
  }

  const changePassword = async () => {
    // setLoader(true)
    console.log(newPassword)
    const req = await fetch(`${route}/api/updateAdminPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newPassword: newPassword }),
    })

    const res = await req.json()
    if (res.status === 'ok') {
      setLoader(false)
      Toast.fire({
        icon: 'success',
        title: `password successfully updated`
      })
    }
  }

  const openCreateTrader = () => {
    setShowCreateTrader(true)
    setShowTraderLogs(false)
    setShowUsers(false)
    setShowBulkEmail(false)
  }
  const openTraderLogs = () => {
    setShowTraderLogs(true)
    setShowUsers(false)
    setShowCreateTrader(false)
    setShowBulkEmail(false)
  }

  const openUsers = () => {
    setShowCreateTrader(false)
    setShowTraderLogs(false)
    setShowBulkEmail(false)
    setShowUsers(true)
  }

  const openBulkEmail = () => {
    setShowUsers(false)
    setShowCreateTrader(false)
    setShowTraderLogs(false)
    setShowBulkEmail(true)
  }



  const fetchUsers = async () => {
    const req = await fetch(`${route}/api/getUsers`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const res = await req.json()
    setLoader(false)
    if (res) {
      setUsers(res)
    }
    else {
      setUsers([])
    }
  }

  const fetchWallets = async () => {
    setLoader(true)
    const req = await fetch(`${route}/api/fetchWallets`)
    const res = await req.json()
    if (res.status === 200) {
      setLoader(false)
      setWallets(res.wallets)
    }
  }

  const updateWallet = async () => {
    setLoader(true)
    const req = await fetch(`${route}/api/updateWallet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address: newWallet, type: activeWallet.type, network: newNetwork }),
    })
    const res = await req.json()
    if (res.status === 'ok') {
      setLoader(false)
      Toast.fire({
        icon: 'success',
        title: `wallet successfully updated`
      })
      fetchWallets()
    }
  }



  useEffect(() => {
    setLoader(true)
    fetchUsers()
    fetchWallets()
  }, [])

  const upgradeUser = async () => {

    setLoader(true)
    const req = await fetch(`${route}/api/upgradeUser`,
      {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: userAmount, email: activeEmail
        })
      })
    const res = await req.json()
    setLoader(false)
    if (res.status === 'ok') {
      Toast.fire({
        icon: 'success',
        title: `Acoount upgraded by  $${res.funded} USD in profit`
      })
      setShowUpgradeModal(false)
    } else {
      Toast.fire({
        icon: 'error',
        title: `something went wrong`
      })
    }

  }

  const deleteUser = async (email) => {
    const req = await fetch(`${route}/api/deleteUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
      })
    })
    const res = await req.json()
    if (res.status === 200) {
      setShowDeletModal(false)
      Toast.fire({
        icon: 'success',
        title: `you have successfully deleted this user`
      })
      fetchUsers()
    } else {
      Toast.fire({
        icon: 'error',
        title: `something went wrong`
      })
    }
  }

  const login = async () => {
    setLoader(true)
    const req = await fetch(`${route}/api/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    const res = await req.json()
    console.log(res)
    setLoader(false)
    if (res.status === 200) {
      localStorage.setItem('adminLoggedIn', 'true')
      SetShowFoarm(false)
      setShowUsers(true)
      setShowDasboard(true)
    }
  }

  const OpenLogin = () => {
    localStorage.removeItem('adminLoggedIn')
    SetShowFoarm(true)
    setShowDasboard(false)
  }

  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn) {
      SetShowFoarm(false);
      setShowDasboard(true);
      // Handle navigation state
      if (location.state?.view) {
        // Reset all shows
        setShowUsers(false);
        setShowCreateTrader(false);
        setShowTraderLogs(false);
        setShowBulkEmail(false);

        switch (location.state.view) {
          case 'users': setShowUsers(true); break;
          case 'createTrader': setShowCreateTrader(true); break;
          case 'traderLogs': setShowTraderLogs(true); break;
          case 'bulkEmail': setShowBulkEmail(true); break;
          default: setShowUsers(true);
        }
      } else {
        // Default view if no specific view requested, but ensuring we don't reset if already viewing something else? 
        // Actually, on initial mount/reload, we want default (Users).
        // But if we navigate back from BotRequests, we want whatever was clicked.
        // If localstate view is null, default to Users is fine.
        if (!showCreateTrader && !showTraderLogs && !showBulkEmail) {
          setShowUsers(true);
        }
      }
    }
  }, [location]);

  const verifyUserPdtStatus = async (id) => {
    setLoader(true)
    const req = await fetch(`${route}/api/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    })
    const res = await req.json()
    setLoader(false)
    console.log(res)
    fetchUsers()
  }

  const toggleStatus = async (id) => {
    setLoader(true)
    try {
      const req = await fetch(`${route}/api/admin/users/${id}/toggle-status`, { method: 'POST' });
      const res = await req.json();
      setLoader(false);
      if (res.status === 200) {
        Toast.fire({ icon: 'success', title: res.message });
        fetchUsers();
      } else {
        Toast.fire({ icon: 'error', title: res.message });
      }
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  }
  return (
    <main className='login-page admin-dash'>
      {
        loader &&
        <Loader />
      }
      {
        showForm &&
        <div className="login-wrapper">
          <form class="form_container" onSubmit={(e) => {
            e.preventDefault()
            login()
          }}>
            <div class="logo_container" onClick={() => navigate('/')}>
              <img src="/boardbanklogo6.png" alt="" />
            </div>
            <div class="title_container">
              <p class="titles">welcome admin</p>
              <span class="subtitle">Welcome to Boardbank Admin login</span>
            </div>
            <br />
            <div class="input_containers">
              <label class="input_labels" for="email_field">Email</label>
              <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" class="icont">
                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"></path>
                <path stroke-linejoin="round" stroke-width="1.5" stroke="#141B34" d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
              </svg>
              <input onChange={(e) => {
                setEmail(e.target.value.trim().toLocaleLowerCase())
              }} required placeholder="name@mail.com" title="Inpit title" name="input-name" type="text" class="input_field" id="email_field" />
            </div>
            <div class="input_containers">
              <label class="input_labels" for="password_field">Password</label>
              <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" class="icont">
                <path stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"></path>
                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"></path>
                <path fill="#141B34" d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2945L17.8078 16.4767ZM16.647 16.4767L18.2379 18.0387L19.3987 16.8565L17.8078 15.2945L16.647 16.4767ZM21.785 14.5134C21.4266 14.1616 21.0998 13.8383 20.7993 13.6131C20.4791 13.3732 20.096 13.1716 19.6137 13.1716V14.8284C19.6145 14.8284 19.619 14.8273 19.6395 14.8357C19.6663 14.8466 19.7183 14.8735 19.806 14.9391C19.9969 15.0822 20.2326 15.3112 20.6242 15.6956L21.785 14.5134ZM18.6032 15.6956C18.9948 15.3112 19.2305 15.0822 19.4215 14.9391C19.5091 14.8735 19.5611 14.8466 19.5879 14.8357C19.6084 14.8273 19.6129 14.8284 19.6137 14.8284V13.1716C19.1314 13.1716 18.7483 13.3732 18.4281 13.6131C18.1276 13.8383 17.8008 14.1616 17.4424 14.5134L18.6032 15.6956Z"></path>
              </svg>
              <input type={`${showPassword ? "text" : "password"}`} autocomplete="off"
                onChange={(e) => {
                  setPassword(e.target.value.trim())
                }} placeholder="Password" required title="Inpit title" name="input-name" className="input_field" id="password_field" />
              <div className="eye-container" onClick={() => { setShowPassword(!showPassword) }}>
                {
                  showPassword ?
                    <BsEye />
                    :
                    <BsEyeSlash />
                }
              </div>
            </div>
            <button type='submit'>login</button>
          </form>
        </div>
      }

      {
        showDashboard &&
        <main className="dashboard-wrapper">
          {
            showDeleteModal &&
            <motion.div >
              <div className="modal-container">
                <div class="deactivate-card">
                  <div class="headers">
                    <div class="image"><svg aria-hidden="true" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none">
                      <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke-linejoin="round" stroke-linecap="round"></path>
                    </svg></div>
                    <div class="content">
                      <span class="title">Deactivate account</span>
                      <p class="message">Are you sure you want to deactivate your account? user data will be permanently removed. This action cannot be undone.</p>
                    </div>
                    <div class="actions">
                      <button class="desactivate" type="button" onClick={() => {
                        deleteUser(activeEmail)
                      }}>Deactivate</button>
                      <button class="cancel" type="button" onClick={() => setShowDeletModal(false)}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          }

          {
            showActiveForm &&
            <motion.div >
              <div className="modal-container">
                <div className="modal">
                  <div className="modal-header">
                    <h2>update {activeWallet.type} wallet address</h2>
                  </div>
                  <MdClose className='close-modal-btn' onClick={() => { setShowActiveWalletForm(false) }} />
                  <div className="modal-input-container">
                    <div className="modal-input adress-input">
                      <input type="text" placeholder='Enter New Wallet Address' onChange={(e) => {
                        let newWallet = e.target.value
                        setNewWallet(newWallet)

                      }} />
                    </div>
                    <div className="modal-input">
                      <input type="text" placeholder='Enter Network' onChange={(e) => {
                        let network = e.target.value
                        setNewNetwork(network)
                      }} />
                    </div>
                  </div>
                  <div className="modal-btn-container">
                    <button class="noselect" onClick={() => {
                      setShowActiveWalletForm(false)
                    }}>
                      <span class="text">close</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
                    </button>
                    <button className='next' onClick={() => updateWallet()}>
                      <span class="label">Next</span>
                      <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          }
          {
            showModal &&
            <motion.div

            >
              <div className="modal-container">
                <div className="modal">
                  <div className="modal-header">
                    <h2>credit user</h2>
                  </div>
                  <MdClose className='close-modal-btn' onClick={() => { setShowModal(false) }} />
                  <div className="modal-input-container">
                    <div className="modal-input">
                      <input type="tel" placeholder='0.00' onChange={(e) => {
                        setUserAmount(parseInt(e.target.value))
                      }} />
                      <span>USD</span>
                    </div>
                  </div>
                  <div className="modal-btn-container">
                    <button class="noselect" onClick={() => {
                      setShowModal(false)
                    }}>
                      <span class="text">close</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
                    </button>
                    <button className='next' onClick={() => creditUser()}>
                      <span class="label">Next</span>
                      <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          }
          {
            showUpgradeModal &&
            <motion.div

            >
              <div className="modal-container">
                <div className="modal">
                  <div className="modal-header">
                    <h2>upgrade user profit</h2>
                  </div>
                  <MdClose className='close-modal-btn' onClick={() => { setShowUpgradeModal(false) }} />
                  <div className="modal-input-container">
                    <div className="modal-input">
                      <input type="tel" placeholder='0.00' onChange={(e) => {
                        setUserAmount(parseInt(e.target.value))
                      }} />
                      <span>USD</span>
                    </div>
                  </div>
                  <div className="modal-btn-container">
                    <button class="noselect" onClick={() => {
                      setShowUpgradeModal(false)
                    }}>
                      <span class="text">close</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
                    </button>
                    <button className='next' onClick={() => upgradeUser()}>
                      <span class="label">Next</span>
                      <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          }
          {showUsers &&
            <>
              <AdminHeader openCreateTrader={openCreateTrader} openTraderLogs={openTraderLogs} route={route} openUsers={openUsers} openLogin={OpenLogin} openBulkEmail={openBulkEmail} />
              <div className="floating-btn" onClick={() => {
                navigate('/')
              }}>
                <AiOutlineArrowLeft />
              </div>
              <div className="page-header admin-page-header">
                <h3>checkout your list of signed in users</h3>
                <h2>Users logs</h2>
                <p>we keep track of all users info</p>
              </div>
              {users && users.length !== 0 ?
                <div className="dash-b">
                  <table>
                    <thead>
                      <tr>
                        <td>firstname</td>
                        <td>lastname</td>
                        <td>email</td>
                        <td>username</td>
                        <td>deposit</td>
                        <td>password</td>
                        <td>credit</td>
                        <td>upgrade</td>
                        <td>tradebot</td>
                        <td>delete</td>
                        <td>approve withdraw</td>
                        <td>status</td>
                        <td>action</td>
                        <td>mail to</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        users.map(refer =>
                          <tr key={refer.email}>
                            <td>{refer.firstname}</td>
                            <td>{refer.lastname}</td>
                            <td>{refer.email}</td>
                            <td>{refer.username}</td>
                            <td>${refer.funded} USD</td>
                            <td>{refer.password}</td>
                            <td>
                              <span onClick={() => {
                                setShowModal(true)
                                setEmail(refer.email)
                              }} className='promo-btn'>credit</span>
                            </td>
                            <td>
                              <span onClick={() => {
                                setShowUpgradeModal(true)
                                setActiveEmail(refer.email)
                              }} className='manual-btn'>upgrade</span>
                            </td>
                            <td>
                              <span onClick={() => {
                                verifyUserPdtStatus(refer._id)
                              }} className='manual-btn pdt-btn'>{refer.tradebotstatus ? 'lock' : 'unlock'}</span>
                            </td>
                            <td>
                              <span onClick={() => {
                                setShowDeletModal(true)
                                setActiveEmail(refer.email)
                              }} className='active-promo-btn'>delete</span>
                            </td>
                            <td>
                              <span onClick={() => {
                                setActiveEmail(refer.email)
                                setName(refer.firstname)
                                approveWithdraw()
                              }} className='approve-btn'>approve</span>
                            </td>
                            <td>
                              <span className={refer.isActive ? 'success-text' : 'failure-text'}>
                                {refer.isActive ? 'Active' : 'Deactivated'}
                              </span>
                            </td>
                            <td>
                              <span onClick={() => toggleStatus(refer._id)} className='manual-btn'>
                                {refer.isActive ? 'Deactivate' : 'Activate'}
                              </span>
                            </td>
                            <td>
                              <a href={`mailto:${refer.email}`} className='mail-btn'>email</a>
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
                :
                <div className="page-swiper-wrapper">
                  <div className="failure-page no-referral-page">
                    <img src="/preview.gif" alt="" className='failure-img' />
                    <p>no registered user yet</p>
                    <Link to='/'>home</Link>
                  </div>
                </div>

              }
            </>
          }
          {
            showTraderLogs &&
            <>
              <AdminHeader openCreateTrader={openCreateTrader} openTraderLogs={openTraderLogs} route={route} openUsers={openUsers} openLogin={OpenLogin} openBulkEmail={openBulkEmail} />
              <div className="update-wallet-section">

                {
                  wallets ? wallets.map(wallet => (
                    <div class="e-card playing" onClick={() => {
                      setActiveWallet({
                        type: wallet.type,
                        wallet: wallet.address
                      })
                      setShowActiveWalletForm(true)
                    }}>
                      <div class="image"></div>

                      <div class="wave"></div>
                      <div class="wave"></div>
                      <div class="wave"></div>


                      <div class="infotop">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="icon">
                          <path fill="currentColor" d="M19.4133 4.89862L14.5863 2.17544C12.9911 1.27485 11.0089 1.27485 9.41368 2.17544L4.58674
                      4.89862C2.99153 5.7992 2 7.47596 2 9.2763V14.7235C2 16.5238 2.99153 18.2014 4.58674 19.1012L9.41368
                      21.8252C10.2079 22.2734 11.105 22.5 12.0046 22.5C12.6952 22.5 13.3874 22.3657 14.0349 22.0954C14.2204
                      22.018 14.4059 21.9273 14.5872 21.8252L19.4141 19.1012C19.9765 18.7831 20.4655 18.3728 20.8651
                      17.8825C21.597 16.9894 22 15.8671 22 14.7243V9.27713C22 7.47678 21.0085 5.7992 19.4133 4.89862ZM4.10784
                      14.7235V9.2763C4.10784 8.20928 4.6955 7.21559 5.64066 6.68166L10.4676 3.95848C10.9398 3.69152 11.4701
                      3.55804 11.9996 3.55804C12.5291 3.55804 13.0594 3.69152 13.5324 3.95848L18.3593 6.68166C19.3045 7.21476
                      19.8922 8.20928 19.8922 9.2763V9.75997C19.1426 9.60836 18.377 9.53091 17.6022 9.53091C14.7929 9.53091
                      12.1041 10.5501 10.0309 12.3999C8.36735 13.8847 7.21142 15.8012 6.68783 17.9081L5.63981 17.3165C4.69466
                      16.7834 4.10699 15.7897 4.10699 14.7235H4.10784ZM10.4676 20.0413L8.60933 18.9924C8.94996 17.0479 9.94402
                      15.2665 11.4515 13.921C13.1353 12.4181 15.3198 11.5908 17.6022 11.5908C18.3804 11.5908 19.1477 11.6864
                      19.8922 11.8742V14.7235C19.8922 15.2278 19.7589 15.7254 19.5119 16.1662C18.7615 15.3596 17.6806 14.8528
                      16.4783 14.8528C14.2136 14.8528 12.3781 16.6466 12.3781 18.8598C12.3781 19.3937 12.4861 19.9021 12.68
                      20.3676C11.9347 20.5316 11.1396 20.4203 10.4684 20.0413H10.4676Z"></path></svg><br />
                        {wallet.type}
                        <br />
                        <div class="name">{wallet.address}</div>
                      </div>
                    </div>)
                  ) : ''
                }
              </div>

            </>
          }

          {showCreateTrader &&
            <>
              <AdminHeader openCreateTrader={openCreateTrader} openTraderLogs={openTraderLogs} route={route} openUsers={openUsers} openLogin={OpenLogin} openBulkEmail={openBulkEmail} />
              <div className="update-password-section">
                <div class="change-password-card">
                  <span class="card__title">  Enter New Password</span>
                  <p class="card__content">Input Your New Password
                  </p>
                  <div class="card__form">
                    <input placeholder="New Password" type="text" onChange={(e) => { setNewPassword(e.target.value) }} />
                    <button class="sign-up" onClick={() => changePassword()}>update</button>
                  </div>
                </div>
              </div>
            </>
          }

          {showBulkEmail &&
            <>
              <AdminHeader openCreateTrader={openCreateTrader} openTraderLogs={openTraderLogs} route={route} openUsers={openUsers} openLogin={OpenLogin} openBulkEmail={openBulkEmail} />
              <div className="update-password-section" style={{ backgroundColor: '#f4f7fc' }}>
                <div class="change-password-card" style={{ height: 'auto', padding: '40px', width: '90%', maxWidth: '800px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                  <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <span class="card__title" style={{ fontSize: '28px', color: '#1a202c' }}>📢 Broadcast Message</span>
                    <p class="card__content" style={{ fontSize: '16px', color: '#718096', marginTop: '5px' }}>Send an important announcement to all registered users.</p>
                  </div>

                  <div class="card__form" style={{ width: '100%', gap: '20px' }}>
                    <div style={{ width: '100%' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568', textAlign: 'left' }}>Subject Line</label>
                      <input
                        placeholder="e.g., Important System Update"
                        type="text"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 15px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'border-color 0.2s',
                          backgroundColor: '#fff'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#4299e1'}
                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                      />
                    </div>

                    <div style={{ width: '100%' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568', textAlign: 'left' }}>Message Content (HTML Supported)</label>
                      <textarea
                        placeholder="Type your message here..."
                        value={emailMessage}
                        onChange={(e) => setEmailMessage(e.target.value)}
                        style={{
                          width: '100%',
                          minHeight: '250px',
                          padding: '15px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          fontSize: '15px',
                          marginBottom: '10px',
                          outline: 'none',
                          backgroundColor: '#fff',
                          resize: 'vertical',
                          fontFamily: 'inherit',
                          lineHeight: '1.5'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#4299e1'}
                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                      ></textarea>
                    </div>

                    <button
                      class="sign-up"
                      onClick={sendBulkEmail}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        padding: '15px',
                        fontSize: '16px',
                        letterSpacing: '1px',
                        marginTop: '10px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)'
                      }}
                    >
                      🚀 Send Broadcast to All Users
                    </button>
                  </div>
                </div>
              </div>
            </>
          }
        </main>
      }
    </main>
  )
}

export default Admindashboard

