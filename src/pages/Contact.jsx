import { motion } from "framer-motion";
import "./Contact.scss";

export default function Contact() {
  return (
    <motion.div
      className="contact"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="contact-content">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Contact Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          For inquiries or customer support, reach out to us:
        </motion.p>

        <motion.div
          className="contact-info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>
            <strong>Email:</strong> support@hytinc.com
          </p>
          <p>
            <strong>Phone:</strong> +91 123 456 7890
          </p>
          <p>
            <strong>Address:</strong> 123 Fashion St, Delhi, India
          </p>

          <p>
            <strong>Facebook</strong>, <strong>Instagram</strong>,
            <strong>Twitter</strong>,<strong>Youtube :</strong>{" "}HYT Inc.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
