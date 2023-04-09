import express from 'express'
import auth from '../middleware/auth.js'
import { addcomment, getreplies } from '../controllers/comment.js'


const router = express.Router()

router.post("/", auth, addcomment)
router.get("/:id/replies", getreplies)

export default router