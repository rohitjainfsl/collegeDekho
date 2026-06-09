import { useContext } from "react";
import { cartContext } from "../contexts/CartContext";

function Header() {
  const { cart } = useContext(cartContext);

  return (
    <nav>
      <h1>
        <a href="/">ECOMMERCE</a>
      </h1>
      <ul>
        <li>
          <a href="/">
            Cart <span>{cart.length}</span>
          </a>
        </li>

        <li>
          <a href="">Login</a>
        </li>
        <li>
          <a href="">Register</a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
