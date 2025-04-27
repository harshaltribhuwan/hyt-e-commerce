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
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSortChange = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false); // Close the dropdown after selection
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
      <h2 className="title">Shop the Collection</h2>

      {/* Filter Section */}
      <div className="filter-section">
        {/* Search Input with Icon */}
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

        {/* Custom Sort Dropdown with Icons */}
        <div className="sort-dropdown-container">
          <div
            className="sort-dropdown-selected"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>
              {sortOrder === "lowToHigh" ? (
                <>Low to High Price</>
              ) : (
                <>High to Low Price</>
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

      {/* No results found message */}
      {filteredProducts.length === 0 && searchQuery && (
        <p className="no-results-message">No results found</p>
      )}

      {/* Product Items */}
      {filteredProducts.length > 0 && (
        <motion.div
          className="product-grid__items"
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
