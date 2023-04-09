import React from 'react'
import VideoThumbnail from '../VideoThumbnail/VideoThumbnail.js'

const Grid = ({videos, setVideos, showDelete}) => {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 w-full">
        {
          videos.map(video => <VideoThumbnail key={video.key} setVideos={setVideos} video={video} showDelete={showDelete}></VideoThumbnail>)
        }
    </div>
  )
}

export default Grid