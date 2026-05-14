import Order from '../models/Order.js'
import Cart from '../models/Cart.js'

export const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product')
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' })
    }

    const items = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      priceAtOrder:
        item.product.discountedPrice > 0
          ? item.product.discountedPrice
          : item.product.originalPrice,
    }))

    const totalAmount = items.reduce(
      (sum, item) => sum + item.priceAtOrder * item.quantity,
      0
    )

    const order = await Order.create({ user: req.user.id, items, totalAmount })

    // Clear cart after placing order
    cart.items = []
    await cart.save()

    res.status(201).json({ message: 'Order placed', order })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product', 'name image')
      .sort({ createdAt: -1 })
    res.status(200).json({ orders })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name image')
      .sort({ createdAt: -1 })
    res.status(200).json({ orders })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.status(200).json({ message: 'Status updated', order })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
