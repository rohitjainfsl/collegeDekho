import fs from 'fs'
import cloudinary from '../config/cloudinary.js'

export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' })
    }

    const uploadPromises = req.files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'producthub',
      })
      // Delete temp file from disk after upload
      fs.unlink(file.path, (err) => {
        if (err) console.error('Failed to delete temp file:', file.path, err)
      })
      return result.secure_url
    })

    const urls = await Promise.all(uploadPromises)
    res.status(200).json({ urls })
  } catch (err) {
    // Clean up any temp files if upload failed
    if (req.files) {
      req.files.forEach((file) => {
        fs.unlink(file.path, () => {})
      })
    }
    res.status(500).json({ message: err.message })
  }
}
