import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails.jsx";
import Home from "./Home.jsx";
import App from "./App.jsx";
import CartProvider from "./contexts/CartContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);

function Router() {
  return (
    <>
      <CartProvider>
        <RouterProvider router={router} />;
      </CartProvider>
    </>
  );
}
export default Router;
