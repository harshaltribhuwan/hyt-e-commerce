import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, addToCart } from "../store/cartSlice";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Cart.scss";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      savedCart.forEach((item) => {
        // Check if item already exists in Redux store
        const itemExists = cartItems.some(
          (cartItem) => cartItem.id === item.id
        );
        if (!itemExists) {
          dispatch(addToCart(item));
        }
      });
    }
  }, [dispatch, cartItems]); // Added cartItems to the dependency array

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]); // Sync localStorage with Redux state

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));

    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
      <motion.h1
        className="cart-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Your Cart
      </motion.h1>

      {cartItems.length === 0 ? (
        <motion.p
          className="empty-cart"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          Your cart is empty
        </motion.p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => {
              const discountedPrice =
                item.price - (item.price * item.discount) / 100; // Calculate discounted price dynamically
              return (
                <motion.div
                  className="cart-item"
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Link to={`/product/${item.id}`} className="cart-item-link">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <div className="item-price-info">
                        {item.discount > 0 ? (
                          <>
                            <span className="discounted-price">
                              ₹{discountedPrice.toFixed(2)}
                            </span>
                            <span className="original-price">
                              ₹{item.price}
                            </span>
                            <span className="discount-percent">
                              ({item.discount}% off)
                            </span>
                          </>
                        ) : (
                          <span className="discounted-price">
                            ₹{item.price}
                          </span>
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
              );
            })}
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
            <motion.button
              className="clear-btn"
              onClick={handleClearCart}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <span>Clear Cart</span>
            </motion.button>
            <motion.button
              className="checkout-btn"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <span>Proceed to Checkout</span>
            </motion.button>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Cart;
