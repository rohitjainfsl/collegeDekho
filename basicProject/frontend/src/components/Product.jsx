import { FaRupeeSign } from "react-icons/fa";
function Product({ product }) {
  return (
    <div className="product">
      <h3>{product.title}</h3>
      <p>{product.category}</p>
      <a href={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
      </a>
      <p>
        <FaRupeeSign />
        {product.price}
      </p>

      <a href={`/product/${product.id}`}>View Details</a>
    </div>
  );
}
export default Product;
