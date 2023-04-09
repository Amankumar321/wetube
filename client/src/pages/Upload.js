import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import { uploadVideo } from '../api'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Upload = () => {
    const [progress, setProgress] = useState(0)
    const [visibleLoginAlert, setVisibleLoginAlert] = useState(false)
    const isLogged = useSelector(state => state.user.isLoggedIn)

    const handleUpload = (e) => {
        const ele = document.getElementById('video-upload-file')
        const title = document.getElementById('video-upload-title')

        if(title.value.length === 0) {
            alert('Give a title')
            return
        }

        const file = ele.files[0]

        if (!file) {
            alert('Upload a video')
            return
        }

        if (file.size > 1024 * 1024 * 50) {
            alert('File must be less than 50MB')
            return
        }
        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', title.value)
        uploadVideo(formData, setProgress).then((v) => {
            alert('Upload successful')
            setProgress(0)
        }).catch((error) => {
            setProgress(0)
            alert(error.response.data.message)
        })
    }

    useEffect(() => {
      if (!isLogged) {
        setVisibleLoginAlert(true)
      }
    }, [isLogged])
    

  return (
    <div className="h-full w-full">
        <NavBar activePage={"Upload"} />
        <div className="h-full w-full flex flex-col">
            <div className="h-12 sm:h-16 w-full flex-none"></div>
            <div className="flex-auto flex p-4">
                <div className="h-full w-60 hidden lg:block flex-none"></div>
                <div className="h-full grow">
                    {
                        visibleLoginAlert ? 
                        <div className="text-2xl font-semibold text-gray-600 w-fit relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Login to upload videos</div>
                        : 
                        <div className="bg-gray-100 p-8 w-max md:w-96 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                            <label htmlFor="video-upload-file" className="ring-2 p-2 ring-gray-400 hover:bg-gray-400">
                                Choose File
                            </label>
                            <input className="my-4 p-2 flex flex-col bg-white hidden" type='file' accept='video/mp4' id="video-upload-file"></input>
                            <input className="my-4 px-2 bg-white py-1 w-full ring-2 ring-gray-400 rounded-md" placeholder='Title' type='text' id="video-upload-title"></input>
                            <button className="relative bg-white font-semibold px-4 py-1 w-fit my-4 ring-2 ring-gray-600 rounded-md" onClick={handleUpload}>Upload</button>
                            {
                                progress > 0 ? 
                                <div className="absolute w-full top-full left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 px-8 flex flex-col items-start">
                                    <div className="w-full h-2 bg-white ring-1 ring-gray-600">
                                        <div className="h-2 bg-red-300" style={{"width": `${progress}%`}}></div>
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Upload