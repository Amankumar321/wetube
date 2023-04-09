import CommentModel from '../models/comment.js'
import ReplyModel from '../models/reply.js'

export const addreply = async (req, res) => {
    try {
        const comment_id = req.body.comment_id
        const replyText = req.body.reply

        if (replyText.length === 0) {
            return res.status(500).json({ message: "Something went wrong" })
        }

        const reply = await ReplyModel.create({user_id: req.userid, username: req.username, text: replyText})
        await CommentModel.findByIdAndUpdate(comment_id, {$push: {replies: reply._id}, $inc: {reply_count: 1}})

        return res.status(200).json({message: "Reply added"})
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}