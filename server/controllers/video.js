import fs from 'fs'
import jwt from 'jsonwebtoken'
import VideoModel from '../models/video.js'
import ProfileModel from '../models/profile.js'
import CommentModel from '../models/comment.js'

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const fetchvideo = async (req, res) => {
    try {
        const id = req.params.id
        const video = await VideoModel.findById(id)
        var range = req.headers.range
        if(!range) range = 'bytes=0-'
        const videoPath = './public' + video.url
        const videoSize  = fs.statSync(videoPath).size
        const chunkSize = 1 * 1e6
        const start = Number(range.replace(/\D/g, ""))
        const end = Math.min(start + chunkSize, videoSize - 1)
        const contentLength = end - start + 1;

        const headers = {
            "Content-Range" : `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges" : "bytes",
            "Content-Length" : contentLength,
            "Content-Type" : "video/mp4"
        }

        res.writeHead(206, headers)
        const stream = fs.createReadStream(videoPath, {start, end})
        stream.pipe(res)    

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}


export const getvideos =  async (req, res) => {

    try {
        const videos = await VideoModel.find({})
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        const videosModified = []

        for (let i = 0; i < videos.length; i++) {
            const v = videos[i];
            const date = new Date(v.date)
            const dateString = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()
            videosModified.push({name: v.name.toString(), key: v._id.toString(), date: dateString, url: v.url.toString()})
        }

        videosModified.reverse()
        return res.status(200).json({ videos: videosModified })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}


export const getvideo =  async (req, res) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]
    
            let decodedData;
    
            if(token){
                decodedData = jwt.verify(token, 'test')
                req.userid = decodedData.userid
                req.username = decodedData.username
            }
        }

        const video = await VideoModel.findById(req.params.id)
        
        const videoModified = {}

        const v = video;
        const date = new Date(v.date)
        const dateString = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()
        videoModified.name =  v.name.toString()
        videoModified.key = v._id.toString()
        videoModified.date = dateString,
        videoModified.url = v.url.toString()
        videoModified.view_count = v.view_count
        videoModified.like_count = v.like_count
        videoModified.isLiked = false

        if (req.userid) {
            const profile = await ProfileModel.findOne({user_id: req.userid})
            const watched_videos = profile.watched_videos
            if (watched_videos.indexOf(v._id) === -1) {
                await ProfileModel.findOneAndUpdate({user_id: req.userid}, {$addToSet: { watched_videos: v._id }})
                await VideoModel.findByIdAndUpdate(v._id, {$inc: {view_count: 1}})
            }
            if (profile.liked_videos.indexOf(video._id) !== -1) {
                videoModified.isLiked = true
            }
        }

        return res.status(200).json({ video: videoModified })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}


export const uploadvideo = async (req, res) => {
    try {
        const v = await VideoModel.create({user_id: req.userid, username: req.username, name: req.body.title, url: '/videos/' + req.file.filename})
        await ProfileModel.findOneAndUpdate({user_id: req.userid}, {$push: { uploaded_videos: v._id }})
        
        return res.status(200).json({ message: "Upload successful" })

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

export const getrecentvideos = async (req, res) => {
    try {
        const profile = await ProfileModel.findOne({user_id: req.userid})
        const watched_videos = profile.watched_videos
        const videos = []
        
        for (const video_id of watched_videos) {
            const watched_video = await VideoModel.findById(video_id)
            videos.push(watched_video)
        }

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        const videosModified = []

        for (let i = 0; i < videos.length; i++) {
            const v = videos[i];
            const date = new Date(v.date)
            const dateString = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()
            const isLiked = profile.watched_videos.indexOf(v._id) === -1 ? false : true
            videosModified.push({name: v.name.toString(), key: v._id.toString(), date: dateString, url: v.url.toString(), isLiked: isLiked})
        }

        return res.status(200).json({ videos: videosModified })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}


export const likevideo = async (req, res) => {
    try {
        const video_id = req.params.id

        const profile = await ProfileModel.findOne({user_id: req.userid})

        if (profile.liked_videos.indexOf(video_id) === -1) {
            await ProfileModel.findOneAndUpdate({user_id: req.userid}, {$addToSet: {liked_videos: video_id}})
            await VideoModel.findByIdAndUpdate(video_id, {$inc: {like_count: 1}})
        }
        return res.status(200).json({})

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

export const unlikevideo = async (req, res) => {
    try {
        const video_id = req.params.id

        const profile = await ProfileModel.findOne({user_id: req.userid})
        
        if (profile.liked_videos.indexOf(video_id) !== -1) {
            await ProfileModel.findOneAndUpdate({user_id: req.userid}, {$pull: {liked_videos: video_id}})
            await VideoModel.findByIdAndUpdate(video_id, {$inc: {like_count: -1}})
        }

        return res.status(200).json({})

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}


export const getlikedvideos = async (req, res) => {
    try {
        const profile = await ProfileModel.findOne({user_id: req.userid})
        const liked_videos = profile.liked_videos
        const videos = []
        
        for (const video_id of liked_videos) {
            const liked_video = await VideoModel.findById(video_id)
            videos.push(liked_video)
        }

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        const videosModified = []

        for (let i = 0; i < videos.length; i++) {
            const v = videos[i];
            const date = new Date(v.date)
            const dateString = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()
            const isLiked = profile.liked_videos.indexOf(v._id) === -1 ? false : true
            videosModified.push({name: v.name.toString(), key: v._id.toString(), date: dateString, url: v.url.toString(), isLiked: isLiked})
        }
        videosModified.reverse()
        return res.status(200).json({ videos: videosModified })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}


export const getuploadedvideos = async (req, res) => {
    try {
        const profile = await ProfileModel.findOne({user_id: req.userid})
        const uploaded_videos = profile.uploaded_videos
        const videos = []
        
        for (const video_id of uploaded_videos) {
            const uploaded_video = await VideoModel.findById(video_id)
            videos.push(uploaded_video)
        }

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        const videosModified = []

        for (let i = 0; i < videos.length; i++) {
            const v = videos[i];
            const date = new Date(v.date)
            const dateString = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()
            const isLiked = profile.uploaded_videos.indexOf(v._id) === -1 ? false : true
            videosModified.push({name: v.name.toString(), key: v._id.toString(), date: dateString, url: v.url.toString(), isLiked: isLiked})
        }
        videosModified.reverse()

        return res.status(200).json({ videos: videosModified })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}


export const deletevideo = async (req, res) => {
    try {
        const video_id = req.params.id
        const profile = await ProfileModel.findOne({user_id: req.userid})
        const uploaded_videos = profile.uploaded_videos

        if (uploaded_videos.indexOf(video_id) !== -1) {
            await ProfileModel.updateMany({}, {$pull: {uploaded_videos: video_id, liked_videos: video_id, watched_videos: video_id}})
            var v = await VideoModel.findByIdAndDelete(video_id)
            fs.rm('./public' + v.url, () => {})
            return res.status(200).json({ message: "Deleted successfully" })
        }
        else return res.status(401).json({ message: "Unauthorized" })
        
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

export const getcomments = async (req, res) => {
    try {
        const video_id = req.params.id

        const video = await VideoModel.findById(video_id)

        const comments = []

        for (const comment_id of video.comments) {
            var comment = await CommentModel.findById(comment_id)
            const date = new Date(comment.date)
            const dateString = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()
            comments.push({key: comment._id, username: comment.username, date: dateString, text: comment.text, reply_count: comment.reply_count})
        }   

        comments.reverse()
        return res.status(200).json({comments: comments})

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}