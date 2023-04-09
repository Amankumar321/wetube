import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    user_id: { type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true},
    watched_videos: [{ type: mongoose.Schema.Types.ObjectId }],
    liked_videos: [{ type: mongoose.Schema.Types.ObjectId }],
    uploaded_videos: [{ type: mongoose.Schema.Types.ObjectId }],
    last_notification: { type: Date, default: Date.now },
})

export default mongoose.model("Profile", profileSchema)