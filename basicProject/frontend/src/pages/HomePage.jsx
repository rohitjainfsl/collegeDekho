import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/product/get");
      setProducts(res.data.message);
    } catch {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Delete "${name}"? This cannot be undone.`,
    );
    if (!confirmed) return;
    try {
      await api.delete(`/product/delete/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Failed to delete product.");
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-20">Loading products…</p>;
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;
  if (products.length === 0)
    return (
      <div className="text-center mt-20">
        <p className="text-gray-400 mb-4">No products yet.</p>
      </div>
    );

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}

function ProductCard({ product, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const discountPct =
    product.discountedPrice > 0 &&
    product.originalPrice > product.discountedPrice
      ? Math.round(
          ((product.originalPrice - product.discountedPrice) /
            product.originalPrice) *
            100,
        )
      : null;

  const addToCart = async (e) => {
    e.stopPropagation();
    try {
      await api.post("/cart/add", { productId: product._id, quantity: 1 });
      alert("Added to cart!");
    } catch {
      alert("Failed to add to cart.");
    }
  };

  const addToWishlist = async (e) => {
    e.stopPropagation();
    try {
      await api.post("/wishlist/add", { productId: product._id });
      alert("Added to wishlist!");
    } catch {
      alert("Failed to add to wishlist.");
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        <Link to={`/product/details/${product.slug}`}>
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://placehold.co/400x300?text=No+Image";
            }}
          />
        </Link>
        {discountPct && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
            -{discountPct}%
          </span>
        )}

        {/* Admin hover overlay */}
        {hovered && user?.role === "admin" && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3">
            <button
              onClick={() => navigate(`/product/edit/${product._id}`)}
              className="bg-white text-gray-900 text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product._id, product.name)}
              className="bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        )}

        {/* User hover overlay */}
        {hovered && user?.role === "user" && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3">
            <button
              onClick={addToCart}
              className="bg-white text-gray-900 text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              + Cart
            </button>
            <button
              onClick={addToWishlist}
              className="bg-white text-gray-900 text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              ♡ Wishlist
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
          {product.category?.name ?? "Uncategorized"}
        </p>
        <h2 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-3">
          {product.name}
        </h2>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-gray-900">
            ₹
            {product.discountedPrice > 0
              ? product.discountedPrice
              : product.originalPrice}
          </span>
          {product.discountedPrice > 0 &&
            product.discountedPrice < product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
        </div>
        <Link
          to={`/product/details/${product.slug}`}
          className="block text-center text-sm font-medium text-gray-900 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
