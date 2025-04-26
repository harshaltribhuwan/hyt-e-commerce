import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "../../data/products"; // Import mock product data
import "./ProductGrid.scss";

export default function ProductGrid() {
  return (
    <div className="product-grid">
      <h2 className="title">Shop the Collection</h2>
      <div className="product-grid__items">
        {products.slice(0, 20).map((product) => {
          const discountedPrice =
            product.price - (product.price * product.discount) / 100;
          return (
            <Link
              to={`/product/${product.id}`}
              key={product.name}
              className="product-card-link" // Add a custom class to apply styles
            >
              <motion.div
                className="product-card"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
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
      </div>
    </div>
  );
}
