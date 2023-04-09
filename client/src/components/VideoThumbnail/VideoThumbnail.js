import React, { useState } from 'react'
import { serverURL } from '../../constants/constants'
import { deleteVideo, fetchVideoById } from '../../api'

const VideoThumbnail = ({setVideos, video, showDelete}) => {
  const [hover, setHover] = useState(false)
  const baseURL = serverURL

  const mouseIn = async () => {
    var ele = document.getElementById('thumbnail-' + video.key)
    var playPromise;
    if (ele) {
      playPromise = ele.play()
    }

    fetchVideoById(video.key)
    setHover(true)
  }

  const mouseOut = () => {
    var ele = document.getElementById('thumbnail-' + video.key)
    if (ele) {
      ele.pause()
      ele.currentTime = 0
    }
    setHover(false)
  }

  const handleClick = () => {
    window.location.assign("./video/" + video.key)
  }

  const handleDelete = async (event) => {
    event.stopPropagation();
    await deleteVideo(video.key).then(r => {
      alert(r.data.message)
      setVideos(videos => {
        return videos.filter(v => v.key !== video.key)
      })
    }).catch(e => {
      alert(e.response.data.message)
    })
  }

  return (
    <div className="aspect-video bg-white-100 rounded-lg hover:drop-shadow-md" onMouseEnter={mouseIn} onMouseLeave={mouseOut} onClick={handleClick}>
      <video className={"object-contain object-center h-full w-full bg-black " + (hover ? "rounded-none" : "rounded-lg")} id={'thumbnail-' + video.key} src={baseURL.slice(0, -1) + video.url} muted={true} autoPlay={hover}>
      </video>
      <div className={"flex p-4 box-border border-b-2 " + (hover ? "border-gray-200 bg-gray-200" : "border-transparent bg-white")}>
        <div className="flex-1">
          <div className="font-semibold">
            {video.name}
          </div>
          <div className="text-sm">
            {video.date}
          </div>
        </div>
        {
          showDelete ? 
          <div className="p-2">
            <button onClick={(e) => {handleDelete(e)}} className="p-2 z-20">
            <i className="fa-sharp fa-solid fa-trash text-lg"></i>
            </button>
          </div> : null
        }
      </div>
    </div>
  )
}

export default VideoThumbnail