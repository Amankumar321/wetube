import React, { useEffect, useState } from 'react'
import LogoSection from '../LogoSection/LogoSection.js'
import SearchSection from '../SearchSection/SearchSection.js'
import ProfileSection from '../ProfileSection/ProfileSection.js'
import NavPane from '../NavPane/NavPane.js'
import NavOptionButton from '../NavOptionButton/NavOptionButton.js'
import { useMediaQuery } from 'react-responsive';
import LoginButton from '../LoginButton/LoginButton.js'
import AuthForm from '../AuthForm/AuthForm.js'
import Overlay from '../Overlay/Overlay.js'
import { useSelector } from 'react-redux'
import { getNotifcations } from '../../api/index.js'

const NavBar = ({activePage}) => {
  const showAuth = useSelector(state => state.user.showAuth)
  const [notifications, setNotifications] = useState([])

  const isMobile = useMediaQuery({ query: `(max-width: 1023px)` }, undefined, (value) => {
    setNavPaneVisible(!value)
  });

  const isLogged = useSelector(state => state.user.isLoggedIn)
  
  const [navPaneVisible, setNavPaneVisible] = useState(!isMobile)

  const fetchNotifications = async () => {
    await getNotifcations().then(res=> {
      setNotifications(res.data.videos)
    }).catch(error => {
      alert(error.response.data.message)
    })
  }

  useEffect(() => {
    if (isLogged) {
      fetchNotifications()
    }
  }, [])
  

  return (
    <div>
      {
        showAuth ? (
          <div >
            <Overlay z="z-40"/>
            <AuthForm />
          </div>
        )
        : null
      }
      <div className="flex bg-white fixed z-40 w-full h-14 sm:h-16 items-center">
          <NavOptionButton setNavPaneVisible={setNavPaneVisible} />
          <LogoSection />
          <SearchSection />
          {
            isLogged ?
            <ProfileSection notifications={notifications} setNotifications={setNotifications} /> : null
          }
          <LoginButton/>
      </div>
      {
        navPaneVisible ?
        <div>
          {
            isMobile ? <Overlay z="z-20" /> : null
          }
          <NavPane activePage={activePage} />
        </div> : null
        
      }
    </div>
  )
}

export default NavBar