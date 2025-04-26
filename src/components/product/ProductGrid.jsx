import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "../../data/products"; // Import mock product data
import "./ProductGrid.scss";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
};

export default function ProductGrid() {
  return (
    <div className="product-grid">
      <h2 className="title">Shop the Collection</h2>
      <motion.div
        className="product-grid__items"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.slice(0, 20).map((product) => {
          const discountedPrice =
            product.price - (product.price * product.discount) / 100;
          return (
            <Link
              to={`/product/${product.id}`}
              key={product.name}
              className="product-card-link"
            >
              <motion.div
                className="product-card"
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <div className="item-price-info">
                  {product.discount > 0 ? (
                    <>
                      <span className="discounted-price">
                        ₹{discountedPrice}
                      </span>
                      <span className="original-price">₹{product.price}</span>
                      <span className="discount-percent">
                        ({product.discount}% off)
                      </span>
                    </>
                  ) : (
                    <span className="discounted-price">₹{product.price}</span>
                  )}
                </div>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
