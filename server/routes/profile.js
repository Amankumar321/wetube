import express from 'express'
import auth from '../middleware/auth.js'
import { getnotifications, clearnotifications } from '../controllers/profile.js'

const router = express.Router()

router.get("/notification", auth, getnotifications)
router.post("/notification", auth, clearnotifications)

export default router