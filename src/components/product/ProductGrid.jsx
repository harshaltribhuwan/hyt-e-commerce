import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "../../data/products"; // Import mock product data
import "./ProductGrid.scss";

export default function ProductGrid() {
  return (
    <div className="product-grid">
      <h2 className="title">Shop the Collection</h2>
      <div className="product-grid__items">
        {products.slice(0, 10).map((product) => (
          <motion.div
            key={product.name}
            className="product-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price} INR</p>
            <Link to={`/product/${product.name}`} className="btn">
              View Details
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
