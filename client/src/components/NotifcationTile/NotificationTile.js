import React from 'react'

const NotificationTile = ({video}) => {
    const handleClick = (e) => {
        e.stopPropagation()
        window.location.assign("/video/" + video.key)
    }

  return (
    <div className="flex flex-col font-sans h-max w-full" onClick={(e) => {handleClick(e)}}>
        <div className="p-2">
            <div className="flex w-max text-sm justify-start">
                <div className="font-semibold">
                    {video.name}
                </div>
                 &nbsp;by&nbsp;
                <div className="font-semibold">
                    {video.username}
                </div>
            </div>
            <div className="w-max text-xs">
                {video.date}
            </div>
        </div>
        <div className="w-full h-px bg-gray-400"></div>
    </div>
  )
}

export default NotificationTile