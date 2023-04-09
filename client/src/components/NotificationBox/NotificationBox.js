import React from 'react'
import NotificationTile from '../NotifcationTile/NotificationTile'

const NotificationBox = ({notifications}) => {


  return (
    <div className="w-48 md:w-60 bg-white absolute bottom-0 right-0 translate-y-full border border-gray-400">
        {
            notifications.map(video => <NotificationTile key={video.key} video={video} />)
        }
        {
            notifications.length === 0 ?
            <div className="font-sans p-4 h-max text-sm w-full">
                No notification
            </div>
            : null
        }
    </div>
  )
}

export default NotificationBox