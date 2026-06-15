import { useContext } from "react";
import { cartContext } from "../contexts/CartContext";
import { Link } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { cart } = useContext(cartContext);
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav>
      <h1>
        <Link to="/">ECOMMERCE</Link>
      </h1>
      <ul>
        <li>
          <Link to="/" className="cart-count">
            Cart <span>{cart.length}</span>
          </Link>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button 
                onClick={logout} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'inherit', 
                  cursor: 'pointer', 
                  font: 'inherit', 
                  padding: 0 
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;

