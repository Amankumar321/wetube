import React, { useEffect, useState } from 'react'
import { serverURL } from '../../constants/constants'
import { likeVideo, unlikeVideo } from '../../api'
import { useDispatch, useSelector } from 'react-redux'

const VideoPlayer = ({video}) => {
    const [isLiked, setIsLiked] = useState(false)
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    
    const sendLike = async () => {
        if (!isLoggedIn) {
            dispatch({type: "SHOW_AUTH"})
            return
        }

        if (isLiked && video) {
            setIsLiked(false)
            video.like_count--
            await unlikeVideo(video.key)
        }
        else if (video) {
            setIsLiked(true)
            video.like_count++
            await likeVideo(video.key)
        }
    }

    useEffect(() => {
      if (video) {
        setIsLiked(video.isLiked)
      }
    }, [video])

    const showShareAlert = async () => {
        navigator.clipboard.writeText(window.location.href).then(e => {
            alert("Copied link: " + window.location.href)
        }).catch(e => {
            alert('Failed to copy link')
        })
    }
    

  return (
    <div className="flex flex-col p-4 w-full">
        <div className="aspect-video flex-1 overflow-hidden bg-black">
            {
                video ?
                <video className="object-contain object-center h-full w-full bg-black" src={serverURL.slice(0, -1) + video.url} autoPlay={false} muted={false} controls={true}>
                </video>
                : null
            }
        </div>
        <div className="flex-1">
            <div className="flex flex-col w-full md:flex-row">
                <div className="w-full">
                    <div className="font-semibold flex-1 text-xl md:text-2xl pt-2 md:pt-4 mx-4">
                        {video ? video.name : ""}
                    </div>
                    <div className="flex">
                        <div className="text-sm mx-4 pt-1">
                            {video ? video.view_count + " views" : ""}
                        </div>
                        <div className="text-sm mx-4 pt-1">
                            {video ? video.date : ""}
                        </div>
                    </div>
                </div>
                <div className="flex w-max items-start pt-2 md:pt-4 justify-between px-2">
                    <button className={"bg-gray-200 ring-2 ring-gray-400 rounded-md w-20 mx-2 " + (isLiked ? "bg-gray-400" : "")} onClick={sendLike}>Like {video ? video.like_count : ""}</button>
                    <button className="bg-gray-200 ring-2 ring-gray-400 rounded-md w-20 mx-2" onClick={showShareAlert}>Share</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VideoPlayer