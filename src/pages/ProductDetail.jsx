// src/pages/ProductDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products"; // import your product data
import "./ProductDetail.scss"; // import your SCSS for styling

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id); // id from URL is string, so convert to number

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail__back" onClick={() => navigate(-1)}>
        ← Back
      </div>

      <div className="product-detail__image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-detail__info">
        <h1>{product.name}</h1>
        <p className="product-detail__price">{product.price} INR</p>
        <button className="product-detail__button">Add to Cart</button>
      </div>
    </div>
  );
}
