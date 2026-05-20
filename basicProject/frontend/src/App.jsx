import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'

import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AddProductPage from './pages/AddProductPage'
import EditProductPage from './pages/EditProductPage'
import AddCategoryPage from './pages/AddCategoryPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import OrdersPage from './pages/OrdersPage'

function Layout() {
  return (
    <div className="bg-gray-50 text-gray-900">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
        <Outlet />
      </main>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // Public
      { index: true, element: <HomePage /> },
      { path: 'product/details/:slug', element: <ProductDetailPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },

      // Admin-protected
      {
        element: <ProtectedRoute requiredRole="admin" />,
        children: [
          { path: 'product/add', element: <AddProductPage /> },
          { path: 'product/edit/:id', element: <EditProductPage /> },
          { path: 'category/add', element: <AddCategoryPage /> },
        ],
      },

      // User-protected (any authenticated user)
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'cart', element: <CartPage /> },
          { path: 'wishlist', element: <WishlistPage /> },
          { path: 'orders', element: <OrdersPage /> },
        ],
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
