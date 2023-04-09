import React, { useState, useEffect } from 'react'
import HorizontalSeparator from '../HorizontalSeparator/HorizontalSeparator'
import ReplySection from '../ReplySection/ReplySection'
import AddReply from '../AddReply/AddReply'
import { getReplies } from '../../api'

const CommentTile = ({comment}) => {
    const [replyIcon, setReplyIcon] = useState("fa-chevron-down")
    const [showReply, setShowReply] = useState(false)
    const [showAddReply, setShowAddReply] = useState(false)
    const [replies, setReplies] = useState([])

    const handleShowReply = () => {
        if (showReply) {
            setReplyIcon("fa-chevron-down")
            setShowReply(false)
        }
        else {
            setReplyIcon("fa-chevron-up")
            setShowReply(true)
        }
    }

    const handleShowAddReply = () => {
        setShowAddReply(v => !v)
    }

    const getRepliesArray = async () => {
        await getReplies(comment.key).then(response => {
            comment.reply_count = response.data.replies.length
            setReplies(response.data.replies)
        }).catch(e => {
            alert(e.response.data.message)
        })
    }

    useEffect(() => {
        if (comment) {
            getRepliesArray()
        }
    }, [])

  return (
    <div className="pl-0 sm:pl-4 mt-4">
        <div className="flex items-center">
            <div className="text-sm font-semibold mr-4">
                {comment.username}
            </div>
            <div className="text-xs text-gray-500">
                {comment.date}
            </div>
        </div>
        <div className="py-1">
            {comment.text}
        </div>
        <div className="flex text-sm py-1">
            <button className="text-blue-600" onClick={handleShowReply}>
                {`${comment.reply_count} replies`}
                <i className={`fa-sharp fa-solid ${replyIcon} pl-2`}></i>
            </button>
            <button className="border-1 ml-4 p-sm w-16 rounded-lg bg-gray-200 ring-2 ring-gray-300" onClick={handleShowAddReply}>Reply</button>
        </div>
        {
            showAddReply ? <AddReply comment={comment} setShowAddReply={setShowAddReply} getRepliesArray={getRepliesArray} /> : null
        }
        {
            showReply ? <ReplySection comment={comment} replies={replies} setReplies={setReplies} /> : null
        }
        <HorizontalSeparator />
    </div>
  )
}

export default CommentTile