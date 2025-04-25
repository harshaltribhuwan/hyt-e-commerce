import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Hero.scss";

export default function Hero() {
  return (
    <div className="hero">
      <motion.div
        className="hero__content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>Elevate Your Style</h1>
        <p>Discover premium quality clothing for the modern lifestyle</p>
        <Link to="/shop" className="btn">
          Shop Now
        </Link>
      </motion.div>
    </div>
  );
}
