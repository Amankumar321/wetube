import express from 'express'
import { addreply } from '../controllers/reply.js'
import auth from '../middleware/auth.js'

const router = express.Router()


router.post("/", auth, addreply)


export default router