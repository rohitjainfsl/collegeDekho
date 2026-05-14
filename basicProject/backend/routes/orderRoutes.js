import express from 'express'
import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

router.post('/place', requireAuth, placeOrder)
router.get('/my', requireAuth, getMyOrders)
router.get('/all', requireAdmin, getAllOrders)
router.put('/status/:id', requireAdmin, updateOrderStatus)

export default router
