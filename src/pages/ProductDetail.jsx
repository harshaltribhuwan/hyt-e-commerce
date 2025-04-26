import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import "./ProductDetail.scss";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productId = parseInt(id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div>Product not found.</div>;
  }

  const handleAddToCart = () => {
    console.log("Dispatching addToCart with product:", product); // Debugging line

    dispatch(addToCart(product));
  };


  return (
    <div className="product-detail">
      <div className="product-detail__image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-detail__info">
        <h1>{product.name}</h1>
        <p className="product-detail__price">{product.price} INR</p>
        <button className="product-detail__button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
