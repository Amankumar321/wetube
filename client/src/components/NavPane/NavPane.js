import React from 'react'
import NavPaneTile from '../NavPaneTile/NavPaneTile.js'
import HorizontalSeparator from '../HorizontalSeparator/HorizontalSeparator.js'
import { useSelector } from 'react-redux'

const NavPane = ({activePage}) => {

  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  
  return (
    <div className="w-60 z-30 h-full fixed top-0 bg-white left-0 block lg:block overflow-auto">
        <div className="h-14 sm:h-16"></div>
        <div className="p-4 grid gap-2">
            <NavPaneTile name="Home" link="/" icon="fa-sharp fa-solid fa-house" color="text-gray-700" activePage={activePage} />
            {
              isLoggedIn ?
              <NavPaneTile name="Recent" link="/recent" icon="fa-sharp fa-solid fa-history" color="text-gray-700" activePage={activePage} />
              :null
            }
            {
              isLoggedIn ?
              <NavPaneTile name="Liked" link="/liked" icon="fa-sharp fa-solid fa-thumbs-up" color="text-gray-700" activePage={activePage} />
              :null
            }
            <HorizontalSeparator />
            {
              isLoggedIn ?
              <NavPaneTile name="Upload" link="/upload" icon="fa-sharp fa-solid fa-upload" color="text-gray-700" activePage={activePage} />
              :null
            }
            {
              isLoggedIn ?
              <NavPaneTile name="Delete" link="/delete" icon="fa-sharp fa-solid fa-trash" color="text-gray-700" activePage={activePage} />
              :null
            }
            {
              isLoggedIn ?
              <HorizontalSeparator />
              :null
            }
            <NavPaneTile name="Help" link="/help" icon="fa-sharp fa-solid fa-circle-info" color="text-gray-700" activePage={activePage} />
            <NavPaneTile name="Settings" link="/settings" icon="fa-sharp fa-solid fa-gear" color="text-gray-700" activePage={activePage} />
            <NavPaneTile name="About Us" link="/about" icon="fa-sharp fa-solid fa-address-card" color="text-gray-700" activePage={activePage} />
            <NavPaneTile name="Contact" link="/contact" icon="fa-sharp fa-solid fa-message" color="text-gray-700" activePage={activePage} />
            <HorizontalSeparator />
            <NavPaneTile name="Twitter" link="/twitter" icon="fa-brands fa-twitter" color="text-blue-400" activePage={activePage} />
            <NavPaneTile name="Instagram" link="/instagram" icon="fa-brands fa-instagram" color="text-orange-600" activePage={activePage} />
            <NavPaneTile name="LinkedIn" link="/linkedin" icon="fa-brands fa-linkedin" color="text-blue-600" activePage={activePage} />
        </div>
    </div>
  )
}

export default NavPane