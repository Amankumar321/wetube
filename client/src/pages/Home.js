import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar.js'
import Grid from '../components/Grid/Grid.js'
import { getVideos } from '../api/index.js'

const Home = () => {
    const [videos, setVideos] = useState([])
    const [visibleNoVideoAlert, setVisibleNoVideoAlert] = useState(false)

    const getVideosArray = async () => {
        await getVideos().then(response => {
            if (response.data.videos.length === 0) {
                setVisibleNoVideoAlert(true)
            }
            setVideos(response.data.videos)
        })
    }

    useEffect(() => {
        getVideosArray()
    }, [])

    return (
        <div className="h-full w-full">
            <NavBar activePage={"Home"}/>
            <div className="h-full w-full flex flex-col">
                <div className="h-14 sm:h-16 w-full flex-none"></div>
                <div className="flex-auto flex p-4">
                    <div className="h-full w-60 hidden lg:block flex-none"></div>
                    <div className="h-full grow">
                        {
                            visibleNoVideoAlert ?
                            <div className="text-2xl font-semibold text-gray-600 w-fit relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">No videos</div>
                            : <Grid videos={videos} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home