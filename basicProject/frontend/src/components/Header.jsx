import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCartCount() {
      const res = await axios.get("http://localhost:4000/cart", {
        credentials: true,
      });
      console.log(res.data);
    }
    fetchCartCount();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-gray-900 hover:text-gray-600 transition-colors"
        >
          ProductHub
        </Link>

        <div className="flex items-center gap-3">
          {!user && (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}

          {user?.role === "user" && (
            <>
              <Link
                to="/wishlist"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Wishlist
              </Link>
              <Link
                to="/cart"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cart <span></span>
              </Link>
              <Link
                to="/orders"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                My Orders
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link
                to="/product/add"
                className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                + Add Product
              </Link>
              <Link
                to="/category/add"
                className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                + Add Category
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-600 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
