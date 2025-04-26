import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.scss";
import { FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const stateD = useSelector((state) => state.cart);


  console.log("Cart Items in Navbar:", stateD);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log("Hamburger menu is now:", isOpen ? "Open" : "Closed"); // Add this line for debugging
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
        {/* <Link to="/cart" onClick={() => setIsOpen(false)}>
          Cart
        </Link> */}
        <Link to="/cart" onClick={() => setIsOpen(false)} className="cart-icon">
          <FiShoppingCart size={24} />
          {cartItems?.length > 0 && (
            <span className="cart-count">{cartItems?.length}</span>
          )}
        </Link>
      </div>

      <div className="navbar__toggle" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
}
