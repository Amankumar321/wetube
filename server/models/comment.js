import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    username: { type: String, required: true },
    date: { type: Date, default: Date.now },
    reply_count: { type: Number, default: 0 },
    text: { type: String },
    replies: { type: [mongoose.Schema.Types.ObjectId], default: [] }
})

export default mongoose.model("Comment", commentSchema)