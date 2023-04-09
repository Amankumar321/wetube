import VideoModel from '../models/video.js'
import ProfileModel from '../models/profile.js'

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


export const getnotifications = async (req, res) => {
    try {
        const user_id = req.userid

        const profile = await ProfileModel.findOne({user_id: user_id})

        const videos = await VideoModel.find({date: {$gt: profile.last_notification}})
        const videosModified = []

        for (let i = 0; i < videos.length; i++) {
            const v = videos[i];
            const date = new Date(v.date)
            const dateString = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()
            videosModified.push({name: v.name, key: v._id.toString(), date: dateString, url: v.url, username: v.username})
        }

        videosModified.reverse()

        return res.status(200).json({videos: videosModified})

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}


export const clearnotifications = async (req, res) => {
    try {
        const user_id = req.userid
        const date = new Date()
        await ProfileModel.findOneAndUpdate({user_id: user_id}, {last_notification: date})

        return res.status(200).json({})
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}