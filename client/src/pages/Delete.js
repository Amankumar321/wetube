import React from 'react'
import { useState, useEffect } from 'react'
import Grid from '../components/Grid/Grid.js'
import NavBar from '../components/NavBar/NavBar.js'
import { getMyVideos } from '../api/index.js'
import { useSelector } from 'react-redux'

const Delete = () => {
    const [videos, setVideos] = useState([])
    const [visibleLoginAlert, setVisibleLoginAlert] = useState(false)
    const [visibleNoVideoAlert, setVisibleNoVideoAlert] = useState(false)
    const isLogged = useSelector(state => state.user.isLoggedIn)
  
    const getMyVideosArray = async () => {
        await getMyVideos().then(response => {
            if (response.data.videos.length === 0) {
                setVisibleNoVideoAlert(true)
            }
            setVideos(response.data.videos)
        })
    }

    useEffect(() => {
        if (isLogged) {
            getMyVideosArray()
        }
        else {
            setVisibleLoginAlert(true)
        }
    }, [])

  return (
    <div className="h-full w-full">
        <NavBar activePage={"Delete"} />
        <div className="h-full w-full flex flex-col">
            <div className="h-14 sm:h-16 w-full flex-none"></div>
            <div className="flex-auto flex p-4">
                <div className="h-full w-60 hidden lg:block flex-none"></div>
                <div className="h-full grow">
                    {
                        visibleLoginAlert ?
                        <div className="text-2xl font-semibold text-gray-600 w-fit relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Login to delete videos</div>
                        : null
                    }
                    {
                        visibleNoVideoAlert ?
                        <div className="text-2xl font-semibold text-gray-600 w-fit relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">No uploaded videos</div>
                        : null
                    }
                    {
                        !visibleNoVideoAlert && !visibleLoginAlert ? 
                        <Grid videos={videos} setVideos={setVideos} showDelete={true} />
                        : null
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Delete