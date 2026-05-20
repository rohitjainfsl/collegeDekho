import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function CartPage() {
  const [cart, setCart] = useState({ items: [] })
  const [loading, setLoading] = useState(true)
  const [placingOrder, setPlacingOrder] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart')
      setCart(res.data.cart)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCart() }, [])

  const updateQty = async (productId, quantity) => {
    await api.put('/cart/update', { productId, quantity })
    fetchCart()
  }

  const remove = async (productId) => {
    await api.delete(`/cart/remove/${productId}`)
    fetchCart()
  }

  const placeOrder = async () => {
    setPlacingOrder(true)
    try {
      await api.post('/order/place')
      setOrderSuccess(true)
      setCart({ items: [] })
    } catch (err) {
      alert(err.response?.data?.message ?? 'Failed to place order')
    } finally {
      setPlacingOrder(false)
    }
  }

  if (loading) return <p className="text-center text-gray-500 mt-20">Loading cart…</p>

  if (orderSuccess) {
    return (
      <div className="text-center mt-20">
        <p className="text-2xl font-bold text-gray-900 mb-2">Order placed! 🎉</p>
        <p className="text-gray-500 mb-6">Your order has been confirmed.</p>
        <Link to="/orders" className="bg-gray-900 text-white px-5 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors">
          View My Orders
        </Link>
      </div>
    )
  }

  const total = cart.items.reduce((sum, item) => {
    const price = item.product?.discountedPrice > 0
      ? item.product.discountedPrice
      : item.product?.originalPrice ?? 0
    return sum + price * item.quantity
  }, 0)

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

      {cart.items.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">Your cart is empty.</p>
          <Link to="/" className="bg-gray-900 text-white px-5 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => {
              const price = item.product?.discountedPrice > 0
                ? item.product.discountedPrice
                : item.product?.originalPrice
              return (
                <div key={item.product?._id} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-center">
                  <img
                    src={item.product?.images?.[0]}
                    alt={item.product?.name}
                    className="w-20 h-20 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                    onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=?' }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{item.product?.name}</p>
                    <p className="text-gray-500 text-sm mt-0.5">₹{price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.product._id, item.quantity - 1)}
                      className="w-7 h-7 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 text-sm font-bold flex items-center justify-center">
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQty(item.product._id, item.quantity + 1)}
                      className="w-7 h-7 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 text-sm font-bold flex items-center justify-center">
                      +
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 w-20 text-right">
                    ₹{(price * item.quantity).toLocaleString()}
                  </p>
                  <button onClick={() => remove(item.product._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors text-lg ml-2">
                    ×
                  </button>
                </div>
              )
            })}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit">
            <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <button
              onClick={placeOrder}
              disabled={placingOrder}
              className="w-full mt-5 bg-gray-900 text-white py-2.5 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {placingOrder ? 'Placing order…' : 'Place Order'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
