import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function WishlistPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchWishlist = async () => {
    try {
      const res = await api.get('/wishlist')
      setProducts(res.data.wishlist?.products ?? [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchWishlist() }, [])

  const remove = async (productId) => {
    await api.delete(`/wishlist/remove/${productId}`)
    setProducts((prev) => prev.filter((p) => p._id !== productId))
  }

  const addToCart = async (productId) => {
    try {
      await api.post('/cart/add', { productId, quantity: 1 })
      alert('Added to cart!')
    } catch {
      alert('Failed to add to cart.')
    }
  }

  if (loading) return <p className="text-center text-gray-500 mt-20">Loading wishlist…</p>

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h1>

      {products.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">Your wishlist is empty.</p>
          <Link to="/" className="bg-gray-900 text-white px-5 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const price = product.discountedPrice > 0 ? product.discountedPrice : product.originalPrice
            return (
              <div key={product._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=No+Image' }}
                  />
                </div>
                <div className="p-4">
                  <p className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">{product.name}</p>
                  <p className="text-lg font-bold text-gray-900 mb-4">₹{price.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product._id)}
                      className="flex-1 bg-gray-900 text-white text-sm py-2 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => remove(product._id)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-gray-600 hover:text-red-500 hover:border-red-300 transition-colors text-sm"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
