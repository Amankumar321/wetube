import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import videoRoutes from './routes/video.js'
import commentRoutes from './routes/comment.js'
import replyRoutes from './routes/reply.js'
import userRoutes from './routes/user.js'
import profileRoutes from './routes/profile.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT

app.use(cors())
app.use(express.static('./public'))
app.use(express.json({limit: "50mb", extended: true}))
app.use(express.urlencoded({limit: "50mb", extended: true}))

app.use('/user', userRoutes)
app.use('/profile', profileRoutes)
app.use('/video', videoRoutes)
app.use('/comment', commentRoutes)
app.use('/reply', replyRoutes)

app.get('/', (req, res) => {
    res.send('running')
})


mongoose.connect(CONNECTION_URL)
.then(() =>{
    app.listen(PORT, () => {
        console.log('listening')
    })
})
.catch((error) => {
    console.log(error);
})