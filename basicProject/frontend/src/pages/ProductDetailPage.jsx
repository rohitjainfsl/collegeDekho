import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import api from '../api/axios'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/product/get').then((res) => {
      const found = res.data.message.find((p) => p._id === id)
      if (!found) navigate('/')
      else setProduct(found)
    }).finally(() => setLoading(false))
  }, [id, navigate])

  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete "${product.name}"? This cannot be undone.`)
    if (!confirmed) return
    try {
      await api.delete(`/product/delete/${id}`)
      navigate('/')
    } catch {
      alert('Failed to delete product.')
    }
  }

  if (loading) return <p className="text-center text-gray-500 mt-20">Loading…</p>
  if (!product) return null

  const discountPct =
    product.discountedPrice > 0 && product.originalPrice > product.discountedPrice
      ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
      : null

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-gray-700 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 truncate">{product.name}</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm grid md:grid-cols-2">
        {/* Image */}
        <div className="relative bg-gray-100 h-72 md:h-auto">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image' }}
          />
          {discountPct && (
            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded">
              -{discountPct}% OFF
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
              {product.category?.name ?? 'Uncategorized'}
            </p>
            <h1 className="text-xl font-bold text-gray-900 leading-snug mb-4">{product.name}</h1>

            {product.description && (
              <p className="text-sm text-gray-600 leading-relaxed mb-6">{product.description}</p>
            )}

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.discountedPrice > 0 ? product.discountedPrice : product.originalPrice}
              </span>
              {product.discountedPrice > 0 && product.discountedPrice < product.originalPrice && (
                <span className="text-base text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>

            {product.slug && (
              <p className="text-xs text-gray-400 mb-6">
                Slug: <span className="font-mono text-gray-500">{product.slug}</span>
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Link
              to={`/product/edit/${product._id}`}
              className="flex-1 text-center border border-gray-300 text-gray-700 text-sm font-medium py-2.5 rounded-md hover:bg-gray-50 transition-colors"
            >
              Edit Product
            </Link>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-500 text-white text-sm font-medium py-2.5 rounded-md hover:bg-red-600 transition-colors"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
