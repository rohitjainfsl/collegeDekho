import express from 'express'
import { uploadImages } from '../controllers/uploadController.js'
import { requireAdmin } from '../middleware/auth.js'
import { multerUpload } from '../middleware/upload.js'

const router = express.Router()

router.post('/', requireAdmin, multerUpload, uploadImages)

export default router
