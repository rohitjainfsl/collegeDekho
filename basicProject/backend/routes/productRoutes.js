import express from 'express'
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/get', getAllProducts)
router.post('/add', requireAdmin, addProduct)
router.put('/update/:id', requireAdmin, updateProduct)
router.delete('/delete/:id', requireAdmin, deleteProduct)

export default router
