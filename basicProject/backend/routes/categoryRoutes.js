import express from 'express'
import { getCategories, addCategory } from '../controllers/categoryController.js'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/get', getCategories)
router.post('/add', requireAdmin, addCategory)

export default router
