import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { cartContext } from "../contexts/CartContext";

function ProductDetails() {
  const { cart, setCart } = useContext(cartContext);

  const { id } = useParams();

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);

  async function fetchSingleProduct(id) {
    const response = await axios.get("https://fakestoreapi.com/products/" + id);
    setProduct(response.data);
  }

  function handleAddToCart(e, productToAdd) {
    e.preventDefault();
    setCart([...cart, product]);
  }

  const [product, setProduct] = useState({});

  console.log(cart);
  return (
    <div className="details">
      <div className="left">
        <img src={product.image} alt="" />
      </div>
      <div className="right">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <a href="" onClick={(e) => handleAddToCart(e, product)}>
          Add To Cart
        </a>
      </div>
    </div>
  );
}
export default ProductDetails;
