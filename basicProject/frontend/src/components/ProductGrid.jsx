import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product.jsx";

function ProductGrid() {
  useEffect(() => {
    fetchProducts();
  }, []);

  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const results = await axios.get("https://fakestoreapi.com/products");
    setProducts(results.data);
  }
  return (
    <div>
      <h1>Products</h1>
<div className="product-wrapper">
      {products.map((product) => {
        return <Product key={product.id} product={product} />
      })}
      </div>
    </div>
  );
}
export default ProductGrid;
