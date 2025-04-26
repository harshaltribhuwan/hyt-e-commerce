import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.scss";
import { FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion"; // Import Framer Motion

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">hyt</Link>
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
        <Link to="/cart" onClick={() => setIsOpen(false)} className="cart-icon">
          <FiShoppingCart size={24} />
          {cartItems?.length > 0 && (
            <span className="cart-count">{cartItems?.length}</span>
          )}
        </Link>
      </div>

      <motion.div
        className="navbar__toggle"
        onClick={toggleMenu}
        animate={{ rotate: isOpen ? 180 : 0 }} // Rotate the toggle icon when menu is open
        transition={{ duration: 0.3 }}
      >
        {/* Use Framer Motion's animate for smooth transitions */}
        <motion.div
          className="bar"
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 45 : 0, translateY: isOpen ? 7 : 0 }} // First bar rotation
          transition={{ duration: 0.3 }}
        ></motion.div>
        <motion.div
          className="bar"
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpen ? 0 : 1 }} // Hide the middle bar when the menu is open
          transition={{ duration: 0.3 }}
        ></motion.div>
        <motion.div
          className="bar"
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? -45 : 0, translateY: isOpen ? -7 : 0 }} // Third bar rotation
          transition={{ duration: 0.3 }}
        ></motion.div>
      </motion.div>
    </nav>
  );
}
