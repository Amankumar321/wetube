import React from 'react'
import { useEffect, useState } from 'react'
import { getReplies } from '../../api'
import ReplyTile from '../ReplyTile/ReplyTile.js'

const ReplySection = ({comment, replies, setReplies}) => {

  return (
    <div>
        {
            replies.map(reply => <ReplyTile key={reply.key} reply={reply} />)
        }
    </div>
  )
}

export default ReplySection