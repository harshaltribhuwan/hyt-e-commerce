import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import "./ProductGrid.scss";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // faster stagger between cards (was 0.15)
      delayChildren: 0.1, // less delay before children animate (was 0.2)
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 }, // slightly smaller Y movement
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
    // springier, quicker
  },
};


export default function ProductGrid() {
  const [sortOrder, setSortOrder] = useState(null); // Start with null (no sort)
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSortChange = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") {
        return a.price - b.price;
      } else if (sortOrder === "highToLow") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div className="product-grid">
      <div className="filter-section">
        <div className="search-input-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="sort-dropdown-container">
          <div
            className="sort-dropdown-selected"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>
              {sortOrder === "lowToHigh" ? (
                <>Low to High Price</>
              ) : sortOrder === "highToLow" ? (
                <>High to Low Price</>
              ) : (
                <>Sort by Price</>
              )}
            </span>
            <i className={`fas fa-chevron-${isDropdownOpen ? "up" : "down"}`} />
          </div>

          {isDropdownOpen && (
            <div className="sort-dropdown-options">
              <div
                className="sort-dropdown-option"
                onClick={() => handleSortChange("lowToHigh")}
              >
                Low to High Price
              </div>
              <div
                className="sort-dropdown-option"
                onClick={() => handleSortChange("highToLow")}
              >
                High to Low Price
              </div>
            </div>
          )}
        </div>
      </div>

      {filteredProducts.length === 0 && searchQuery && (
        <p className="no-results-message">No results found</p>
      )}

      {filteredProducts.length > 0 && (
        <motion.div
          className="product-grid__items"
          key={searchQuery + sortOrder} // key added here to re-trigger animation
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.slice(0, 20).map((product) => {
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
      )}
    </div>
  );
}
