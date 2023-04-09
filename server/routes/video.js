import express from 'express'
import { getvideo, getvideos, fetchvideo, uploadvideo, getrecentvideos, getcomments, likevideo, unlikevideo, getlikedvideos, getuploadedvideos, deletevideo } from '../controllers/video.js'
import auth from '../middleware/auth.js'
import { uploadVideoMiddleware } from '../middleware/uploadVideo.js'

const router = express.Router()

router.get("/", getvideos)
router.get("/recent", auth, getrecentvideos)
router.get("/liked", auth, getlikedvideos)
router.get("/uploaded", auth, getuploadedvideos)
router.get("/watch/:id", fetchvideo)
router.get("/:id", getvideo)
router.get("/:id/comments", getcomments)
router.post("/:id/delete", auth, deletevideo)
router.post("/:id/like", auth, likevideo)
router.post("/:id/unlike", auth, unlikevideo)
router.post("/", auth, uploadVideoMiddleware, uploadvideo)

export default router