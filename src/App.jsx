// src/App.jsx
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";
import { Toaster } from "react-hot-toast";
import "./App.scss"

export default function App() {
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
