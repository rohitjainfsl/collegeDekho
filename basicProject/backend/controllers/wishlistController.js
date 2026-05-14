import Wishlist from '../models/Wishlist.js'

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate(
      'products',
      'name image originalPrice discountedPrice slug category'
    )
    res.status(200).json({ wishlist: wishlist || { products: [] } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body
    let wishlist = await Wishlist.findOne({ user: req.user.id })

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, products: [] })
    }

    const alreadyAdded = wishlist.products.some((p) => p.toString() === productId)
    if (!alreadyAdded) {
      wishlist.products.push(productId)
    }

    await wishlist.save()
    res.status(200).json({ message: 'Added to wishlist', wishlist })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params
    const wishlist = await Wishlist.findOne({ user: req.user.id })
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' })

    wishlist.products = wishlist.products.filter((p) => p.toString() !== productId)
    await wishlist.save()
    res.status(200).json({ message: 'Removed from wishlist', wishlist })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
