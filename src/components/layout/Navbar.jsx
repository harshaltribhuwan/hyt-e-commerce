import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.scss";
import { FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">hyt</Link>
      </div>

      {/* NEW: Mobile Cart + Hamburger */}
      <div className="navbar__mobile-icons">
        <Link to="/cart" className="cart-icon-mobile">
          <FiShoppingCart size={24} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        <motion.div
          className="navbar__toggle"
          onClick={toggleMenu}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bar"
            initial={{ rotate: 0 }}
            animate={{ rotate: isOpen ? 45 : 0, translateY: isOpen ? 7 : 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
          <motion.div
            className="bar"
            initial={{ opacity: 1 }}
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
          <motion.div
            className="bar"
            initial={{ rotate: 0 }}
            animate={{ rotate: isOpen ? -45 : 0, translateY: isOpen ? -7 : 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </motion.div>
      </div>

      <div className={`navbar__links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to="/shop" onClick={() => setIsOpen(false)}>
          Shop
        </Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>
          About
        </Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>
          Contact
        </Link>

        {/* Desktop Cart Icon */}
        <Link to="/cart" onClick={() => setIsOpen(false)} className="cart-icon">
          <FiShoppingCart size={24} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}
