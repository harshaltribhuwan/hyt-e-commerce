import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, addToCart } from "../store/cartSlice";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // 🚀 Add Framer Motion
import "./Cart.scss";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Save cart to localStorage
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      savedCart.forEach((item) => {
        dispatch(addToCart(item));
      });
    }
  }, [dispatch]);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.removeItem("cart");
  };

  const totalAmount = cartItems.reduce((acc, item) => {
    const discountedPrice = item.price - (item.price * item.discount) / 100;
    return acc + discountedPrice * item.quantity;
  }, 0);

  return (
    <div className="cart">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <motion.div
                className="cart-item"
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Link to={`/product/${item.id}`} className="cart-item-link">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <div className="item-price-info">
                      {item.discountedPrice !== item.price ? (
                        <>
                          <span className="discounted-price">
                            ₹{item.discountedPrice}
                          </span>
                          <span className="original-price">₹{item.price}</span>
                          <span className="discount-percent">
                            ({item.discount}% off)
                          </span>
                        </>
                      ) : (
                        <span className="discounted-price">₹{item.price}</span>
                      )}
                    </div>
                    <p>Quantity: {item.quantity}</p>
                    <p>
                      Stock:{" "}
                      {item.stock > 0
                        ? `${item.stock} available`
                        : "Out of Stock"}
                    </p>
                  </div>
                </Link>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <FiTrash2 size={20} />
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="cart-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="total-amount">
              <h2>Total: ₹{totalAmount.toFixed(2)}</h2>
            </div>
            <button className="clear-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Cart;
