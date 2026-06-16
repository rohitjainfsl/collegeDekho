import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails.jsx";
import Home from "./Home.jsx";
import App from "./App.jsx";
import CartProvider from "./contexts/CartContext.jsx";
import Login from "./Auth/Login.jsx";
import Signup from "./Auth/Signup.jsx"
import AuthProvider from "./contexts/AuthContext.jsx";
import Profile from "./pages/Profile.jsx";
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
      {
        path: "/login",
        element: <Login />
      },
      {
      path: "/register",
      element: <Signup/>
      },
      {
        path:"/profile",
        element:<Profile />
      }
    ],
  },
]);

function Router() {
  return (
    <>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />;
      </CartProvider>
      </AuthProvider>
    </>
  );
}
export default Router;
