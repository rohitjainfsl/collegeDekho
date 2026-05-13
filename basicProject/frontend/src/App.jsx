import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-gray-900 hover:text-gray-600 transition-colors"
          >
            ProductHub
          </Link>
          <Link
            to="/product/add"
            className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            + Add New Product
          </Link>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "product/add", element: <AddProductPage /> },
      { path: "product/edit/:id", element: <EditProductPage /> },
      { path: "product/details/:id", element: <ProductDetailPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
