import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toast } from "react-hot-toast";
import "./ProductDetail.scss";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const productId = parseInt(id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div>Product not found.</div>;
  }

  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const loadingToast = toast.loading("Adding to cart...");

    const newCartItem = { ...product, selectedSize, quantity };

    dispatch(addToCart(newCartItem));

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, newCartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setTimeout(() => {
      toast.success(`${product.name} added to cart!`, {
        id: loadingToast,
      });
    }, 500); // fake slight delay for smoothness
  };

  useEffect(() => {
    if (product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]); // Set default size to the first size
    }
  }, [product.sizes]);

  return (
    <div className="product-detail">
      <div className="product-detail__image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-detail__info">
        <h1>{product.name}</h1>

        {product.discount > 0 ? (
          <div className="product-detail__price">
            <span className="original-price">{product.price} INR</span>
            <span className="discounted-price">
              {discountedPrice.toFixed(0)} INR
            </span>
            <span className="discount-percent">({product.discount}% OFF)</span>
          </div>
        ) : (
          <p className="product-detail__price">{product.price} INR</p>
        )}

        <p className="product-detail__stock">
          {product.stock > 0
            ? `In Stock (${product.stock} available)`
            : "Out of Stock"}
        </p>

        <div className="product-detail__sizes">
          <p>Select Size:</p>
          <div className="sizes">
            {product.sizes.map((size) => (
              <button
                key={size}
                className="size-btn"
                onClick={() => setSelectedSize(size)}
                style={{
                  backgroundColor: selectedSize === size ? "#111" : "#fff",
                  color: selectedSize === size ? "#fff" : "#000",
                  borderColor: selectedSize === size ? "#111" : "#ccc",
                  transition: "all 0.3s ease",
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="product-detail__quantity">
          <p>Quantity:</p>
          <div className="quantity-selector">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>

        <p className="product-detail__description">{product.description}</p>

        <button
          className="product-detail__button"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  );
}
