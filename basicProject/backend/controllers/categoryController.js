import Category from '../models/Category.js'

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().select('name slug _id')
    res.status(200).json({ categories })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body
    const newCategory = new Category({ name })
    await newCategory.save()
    res.status(201).json({ message: 'Category added', category: newCategory })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
