import React from 'react'
import CommentTile from '../CommentTile/CommentTile'
import { addComment, getComments } from '../../api'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CommentSection = ({video}) => {
    const [comments, setComments] = useState([])
    const dispatch = useDispatch()
    const isLogged = useSelector(state => state.user.isLoggedIn)

    const handleAddComment = async () => {
        if (!isLogged) {
            dispatch({type: "SHOW_AUTH"})
            return
        }
        const ele = document.getElementById('comment-input')
        
        if (ele.value.length > 0) {
            await addComment({video_id: video.key, comment: ele.value}).then(res => {
                alert(res.data.message)
                getCommentsArray()
            }).catch(error => {
                alert(error.response.data.message)
            })
        }
        else {
            alert('Write a comment')
        }
    }

    const getCommentsArray = async () => {
        await getComments(video.key).then(response => {
            setComments(response.data.comments)
        }).catch(e => {
            alert(e.response.data.message)
        })
    }

    useEffect(() => {
        if (video) {
            getCommentsArray()
        }
    }, [video])


  return (
    <div className="flex flex-col p-4 w-full">
        <div className="px-4 font-bold sm:pb-4">
            Comments
        </div>
        <div className="px-4 flex flex-col sm:flex-row">
            <input className="w-full my-4 sm:my-0 sm:w-1/2 max-w-96 ring-2 ring-gray-400 rounded-md h-8 mr-10 p-2" required type='text' id="comment-input"></input>
            <button className="bg-gray-200 w-fit h-8 ring-2 ring-gray-400 px-4 rounded-md" onClick={handleAddComment}>Add Comment</button>
        </div>
        <div className="px-4 w-full md:w-2/3 xl:w-1/2">
            {
            comments.map(comment => <CommentTile key={comment.key} comment={comment} setComments={setComments} />)
            }
        </div>
    </div>
  )
}

export default CommentSection