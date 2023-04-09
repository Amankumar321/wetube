import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    url: { type: String, required: true },
    view_count: { type: Number, default: 0 },
    like_count: { type: Number, default: 0 },
    comments: { type: [mongoose.Schema.Types.ObjectId], default: [] }
})

export default mongoose.model("Video", videoSchema)