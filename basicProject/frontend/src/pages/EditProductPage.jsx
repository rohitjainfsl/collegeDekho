import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'

export default function EditProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(null)
  const [currentImages, setCurrentImages] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    Promise.all([
      api.get('/product/get'),
      api.get('/category/get'),
    ]).then(([productRes, catRes]) => {
      const product = productRes.data.message.find((p) => p._id === id)
      if (!product) { navigate('/'); return }
      setCurrentImages(product.images ?? [])
      setForm({
        name: product.name,
        originalPrice: product.originalPrice,
        discountedPrice: product.discountedPrice ?? 0,
        description: product.description ?? '',
        category: product.category?._id ?? '',
      })
      setCategories(catRes.data.categories)
    })
  }, [id, navigate])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImageFiles(files)
    setImagePreviews(files.map((f) => URL.createObjectURL(f)))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.originalPrice) e.originalPrice = 'Original price is required'
    if (!form.category) e.category = 'Category is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    try {
      let images = currentImages

      // If new files selected, upload them and replace current images
      if (imageFiles.length > 0) {
        const formData = new FormData()
        formData.append('name', form.name)
        imageFiles.forEach((file) => formData.append('images', file))
        const uploadRes = await api.post('/upload', formData)
        images = uploadRes.data.urls
      }

      await api.put(`/product/update/${id}`, {
        ...form,
        originalPrice: Number(form.originalPrice),
        discountedPrice: Number(form.discountedPrice) || 0,
        images,
      })
      navigate('/')
    } catch (err) {
      setErrors({ server: err.response?.data?.message ?? 'Something went wrong' })
    } finally {
      setSubmitting(false)
    }
  }

  if (!form) return <p className="text-center text-gray-500 mt-20">Loading product…</p>

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Product</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm space-y-5">
        {errors.server && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-md p-3">{errors.server}</p>
        )}

        <Field label="Product Name" error={errors.name}>
          <input name="name" value={form.name} onChange={handleChange}
            className={input(errors.name)} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Original Price (₹)" error={errors.originalPrice}>
            <input name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange}
              className={input(errors.originalPrice)} />
          </Field>
          <Field label="Discounted Price (₹)" error={errors.discountedPrice}>
            <input name="discountedPrice" type="number" value={form.discountedPrice} onChange={handleChange}
              className={input(errors.discountedPrice)} />
          </Field>
        </div>

        <Field label="Category" error={errors.category}>
          <select name="category" value={form.category} onChange={handleChange} className={input(errors.category)}>
            <option value="">— Select category —</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </Field>

        {/* Current image preview */}
        <div>
          <p className="block text-sm font-medium text-gray-700 mb-2">Current Image</p>
          {currentImages.length > 0 ? (
            <div className="flex gap-3 flex-wrap mb-3">
              {currentImages.map((src, i) => (
                <img key={i} src={src} alt={`Current ${i + 1}`}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 mb-3">No image uploaded yet.</p>
          )}

          {/* Replace image input */}
          <p className="block text-sm font-medium text-gray-700 mb-1">Replace Image <span className="text-gray-400 font-normal">(optional)</span></p>
          <input
            type="file"
            accept="image/*"
            multiple
            max="5"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-gray-700 file:cursor-pointer cursor-pointer"
          />
          {/* New image preview */}
          {imagePreviews.length > 0 && (
            <div className="flex gap-3 mt-3 flex-wrap">
              {imagePreviews.map((src, i) => (
                <img key={i} src={src} alt={`New preview ${i + 1}`}
                  className="w-24 h-24 object-cover rounded-lg border-2 border-gray-900" />
              ))}
            </div>
          )}
        </div>

        <Field label="Description" error={errors.description}>
          <textarea name="description" value={form.description} onChange={handleChange}
            rows={3} className={input(errors.description)} />
        </Field>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => navigate('/')}
            className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={submitting}
            className="flex-1 bg-gray-900 text-white py-2.5 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50">
            {submitting ? (imageFiles.length > 0 ? 'Uploading & Saving…' : 'Saving…') : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

const input = (error) =>
  `w-full border ${error ? 'border-red-400' : 'border-gray-300'} rounded-md px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 transition`
