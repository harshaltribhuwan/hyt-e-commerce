import "./Contact.scss";

export default function Contact() {
  return (
    <div className="contact">
      <div className="contact-content">
        <h1>Contact Us</h1>
        <p>For inquiries or customer support, reach out to us:</p>
        <div className="contact-info">
          <p>
            <strong>Email:</strong> support@hytinc.com
          </p>
          <p>
            <strong>Phone:</strong> +91 123 456 7890
          </p>
          <p>
            <strong>Address:</strong> 123 Fashion St, Delhi, India
          </p>
        </div>
      </div>
    </div>
  );
}
