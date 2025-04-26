// src/App.jsx
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";
import "./App.scss"

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <ScrollToTop />
      <AppRoutes />
      <Footer />
    </div>
  );
}
