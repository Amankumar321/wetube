import React from 'react'
import HorizontalSeparator from '../HorizontalSeparator/HorizontalSeparator.js'

const ReplyTile = ({reply}) => {
  return (
    <div className="pl-8 mt-2">
        <div className="flex items-center">
            <div className="text-sm font-semibold mr-4">
                {reply.username}
            </div>
            <div className="text-xs text-gray-500">
                {reply.date}
            </div>
        </div>
        <div className="py-1">
            {reply.text}
        </div>
        <HorizontalSeparator />
    </div>
  )
}

export default ReplyTile