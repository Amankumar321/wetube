import React, { useEffect } from 'react'
import NavBar from '../components/NavBar/NavBar'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { getVideoById } from '../api'
import VideoPlayer from '../components/VideoPlayer/VideoPlayer'
import CommentSection from '../components/CommentSection/CommentSection'

const Video = () => {
  const { id } = useParams()

  const [video, setVideo] = useState(null)

    const getVideo = async (id) => {
        await getVideoById(id).then(response => {
            setVideo(response.data.video)
        })
    }

    useEffect(() => {
        getVideo(id)
    }, [id])


  return (
    <div>
        <NavBar/>
        <div>
        <div className="h-12 sm:h-16 w-full"></div>
        <div className="h-full w-full flex">
                <div className="h-full w-60 hidden lg:block"></div>
                <div className="h-full grow">
                    <VideoPlayer video={video} />
                    <CommentSection video={video} />
                </div>
            </div>
        </div>
    </div>
    )
}


export default Video