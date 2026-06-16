import { useContext } from "react";
import { cartContext } from "../contexts/CartContext";
import {Link} from 'react-router-dom'
function Header() {
  const { cart } = useContext(cartContext);

  return (
    <nav>
      <h1>
        <Link to="/">ECOMMERCE</Link>
      </h1>
      <ul>
        <li>
          <Link to="/">
            Cart <span>{cart.length}</span>
          </Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
