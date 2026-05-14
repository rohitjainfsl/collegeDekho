import Product from '../models/Product.js'

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name slug')
    res.status(200).json({ message: products })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.status(201).json({ message: 'Product Saved', product: newProduct })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    Object.assign(product, req.body)
    await product.save()
    res.status(200).json({ message: product })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Product.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ message: 'Product not found' })
    res.status(200).json({ message: 'Product deleted', product: deleted })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
