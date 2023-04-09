import mongoose from "mongoose";

const replySchema = mongoose.Schema({
    user_id: { type: String, required: true },
    username: { type: String, required: true },
    date: { type: Date, default: Date.now },
    text: { type: String }
})

export default mongoose.model("Reply", replySchema)