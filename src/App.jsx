// src/App.jsx
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";
import { Toaster } from "react-hot-toast";
import "./App.scss"
import { useEffect } from "react";
import { addToCart } from "./store/cartSlice.js";
import { useDispatch } from "react-redux";

export default function App() {
   const dispatch = useDispatch();
  // Sync localStorage with Redux store on initial load
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      savedCart.forEach((item) => {
        dispatch(addToCart(item)); // Dispatch each item to Redux store
      });
    }
  }, [dispatch]);
  return (
    <div className="app-container">
      <Navbar />
      <ScrollToTop />
      <AppRoutes />
      <Footer />
      <Toaster // <-- add this
        position="top-center"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            fontWeight: "bold",
            letterSpacing: "0.5px",
          },
        }}
      />
    </div>
  );
}
