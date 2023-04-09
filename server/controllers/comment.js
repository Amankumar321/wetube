import CommentModel from '../models/comment.js'
import VideoModel from '../models/video.js'
import ReplyModel from '../models/reply.js'

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


export const addcomment = async (req, res) => {
    try {
        const video_id = req.body.video_id
        const commentText = req.body.comment

        if (commentText.length === 0) {
            return res.status(500).json({ message: "Something went wrong" })
        }

        const comment = await CommentModel.create({user_id: req.userid, username: req.username, text: commentText})
        await VideoModel.findByIdAndUpdate(video_id, {$push: {comments: comment._id}})

        return res.status(200).json({message: "Comment added"})
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

export const getreplies = async (req, res) => {
    try {
        const comment_id = req.params.id

        const comment = await CommentModel.findById(comment_id)

        const replies = []

        for (const reply_id of comment.replies) {
            var reply = await ReplyModel.findById(reply_id)
            const date = new Date(reply.date)
            const dateString = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()
            replies.push({key: reply._id, username: reply.username, date: dateString, text: reply.text})
        }   
        replies.reverse()
        return res.status(200).json({replies: replies})

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}