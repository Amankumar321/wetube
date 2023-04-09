import NotificationBox from '../NotificationBox/NotificationBox.js'
import { useState } from 'react'
import { clearNotifications } from '../../api/index.js'

const NotificationButton = ({notifications, setNotifications}) => {
  const [showNotification, setShowNotification] = useState(false)
  
  const toggleNotificationBox = async () => {
    notifications = []
    setShowNotification(v => !v)
    if (showNotification === true) {
      await clearNotifications().then(e => {
        setNotifications([])
      })
    }
  }

  return (
    <button className="relative">
      <i className="fa-regular fa-bell text-lg" onClick={toggleNotificationBox}> 
        {
          showNotification ? <NotificationBox notifications={notifications} /> : null
        }
        {
          notifications.length > 0 ?
          <div className="text-xs font-sans absolute top-0 right-0 w-4 h-4 rounded-sm bg-red-300 translate-x-1/2 translate-y-0">
             {notifications.length}
          </div>
          : null
        }
      </i>
    </button>
  )
}

export default NotificationButton