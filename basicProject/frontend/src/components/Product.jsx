function Product({ product }) {
  return (
    <div>
      <h3>{product.title}</h3>
      <p>{product.category}</p>
      <a href={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
      </a>
      <p>{product.price}</p>
    </div>
  );
}
export default Product;
