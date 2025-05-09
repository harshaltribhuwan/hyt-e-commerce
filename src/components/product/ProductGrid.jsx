import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import "./ProductGrid.scss";
import useDebounce from "../common/useDebounce";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04, // Smaller stagger for smoother look
      delayChildren: 0.1,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0 }, // only fade, no scale
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function ProductGrid() {
  const [sortOrder, setSortOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // NEW
  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  const handleSortChange = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

const filteredProducts = products
  .filter((product) =>
    product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
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
      <button
        className="filter-toggle-btn"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="filter-section"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
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
                <i
                  className={`fas fa-chevron-${isDropdownOpen ? "up" : "down"}`}
                />
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
          </motion.div>
        )}
      </AnimatePresence>

      {filteredProducts.length === 0 && searchQuery && (
        <p className="no-results-message">No results found</p>
      )}

      {filteredProducts.length > 0 && (
        <motion.div
          className="product-grid__items"
          key={searchQuery + sortOrder}
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
