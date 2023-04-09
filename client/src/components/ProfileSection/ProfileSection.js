import React from 'react'
import { useMediaQuery } from 'react-responsive';
import NotificationButton from '../NotificationButton/NotificationButton.js'
import SearchButton from '../SearchButton/SearchButton.js';

const ProfileSection = ({notifications, setNotifications}) => {
  const isMobile = useMediaQuery({ query: `(max-width: 639px)` })

  return (
    <div className="flex h-full items-center mx-4">
        {
          isMobile ?
          <SearchButton />
          : null
        }
        <NotificationButton notifications={notifications} setNotifications={setNotifications} />
    </div>
  )
}

export default ProfileSection