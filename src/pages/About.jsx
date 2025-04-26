import { useEffect } from "react";
import { motion } from "framer-motion";
import "./About.scss";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when page loads
  }, []);

  return (
    <motion.div
      className="about"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="about-content">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          About Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          At <strong>HYT Inc.</strong>, we believe in delivering the finest
          quality clothing for the modern lifestyle. Our mission is to provide
          luxurious yet affordable clothing that enhances your style.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          We are committed to quality, innovation, and ensuring that you feel
          confident every time you wear our products.
        </motion.p>

        <motion.div
          className="about-mission"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2>Our Mission</h2>
          <p>
            We strive to be at the forefront of fashion trends while maintaining
            a focus on comfort and durability. Every piece we create is designed
            with care, ensuring that it meets the highest standards of
            craftsmanship.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
