import Cart from '../models/Cart.js'

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      'items.product',
      'name image originalPrice discountedPrice slug'
    )
    res.status(200).json({ cart: cart || { items: [] } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body
    let cart = await Cart.findOne({ user: req.user.id })

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] })
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    )
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.items.push({ product: productId, quantity })
    }

    await cart.save()
    res.status(200).json({ message: 'Added to cart', cart })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const cart = await Cart.findOne({ user: req.user.id })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })

    const item = cart.items.find((i) => i.product.toString() === productId)
    if (!item) return res.status(404).json({ message: 'Item not in cart' })

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.product.toString() !== productId)
    } else {
      item.quantity = quantity
    }

    await cart.save()
    res.status(200).json({ message: 'Cart updated', cart })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params
    const cart = await Cart.findOne({ user: req.user.id })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })

    cart.items = cart.items.filter((i) => i.product.toString() !== productId)
    await cart.save()
    res.status(200).json({ message: 'Removed from cart', cart })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
    if (cart) {
      cart.items = []
      await cart.save()
    }
    res.status(200).json({ message: 'Cart cleared' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
