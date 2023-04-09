import React, { useState } from 'react'
import { addReply } from '../../api'
import { useDispatch, useSelector } from 'react-redux'

const AddReply = ({comment, setShowAddReply, getRepliesArray}) => {
    const [reply, setReply] = useState("")
    const dispatch = useDispatch()
    const isLogged = useSelector(state => state.user.isLoggedIn)

    const handleAddReply = async () => {
        if (!isLogged) {
            dispatch({type: 'SHOW_AUTH'})
            return
        }
        if (reply.length === 0) {
            alert('Write a reply')
            return
        }

        await addReply({comment_id: comment.key, reply: reply}).then(res => {
            comment.reply_count++
            alert(res.data.message)
            getRepliesArray()
        }).catch(error => {
            alert(error.response.data.message)
        })
    }

    const handleHideAddReply = () => {
        setShowAddReply(false)
    }

    const handleChangeReply = (e) => {
        setReply(e.target.value)
    }


  return (
    <div className="flex w-full flex-col mt-2">
        <div className="flex w-full">
            <input className="w-full ring-2 ring-gray-300 px-2 rounded-md" onChange={(e) => {handleChangeReply(e)}} type="text"></input>
        </div>
        <div className="flex w-full">
            <div className="flex w-full justify-end">
                <button className="m-2 bg-gray-200 px-3 ring-2 ring-gray-300 py-1 text-sm rounded-lg" onClick={handleAddReply}>Reply</button>
                <button className="m-2 bg-gray-200 px-3 ring-2 ring-gray-300 py-1 text-sm rounded-lg" onClick={handleHideAddReply}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default AddReply