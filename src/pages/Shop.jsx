import React from "react";
import ProductGrid from "../components/product/ProductGrid";
import { products } from "../data/products";

function Shop() {
  return (
    <div className="shop">
      <ProductGrid products={products} />
    </div>
  );
}

export default Shop;
