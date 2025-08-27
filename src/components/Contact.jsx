import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted.", formData);
    setSubmitted(true);

    // Disable form and reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <main className="container my-5 p-5">
      <section
        className="contact-us p-4 p-md-5 d-flex flex-column flex-lg-row gap-4 align-items-center"
        style={{
          minHeight: "75vh",
          backgroundColor: "rgb(136 203 197)",
          borderRadius: "10px",
        }}
      >
        <div className="left w-100 w-lg-50 d-flex justify-content-center">
          <img
            src="https://cdn.pixabay.com/photo/2022/03/01/08/11/call-center-7040784_960_720.png"
            alt="Contact us"
            style={{ maxWidth: "90%", height: "auto", borderRadius: "10px" }}
          />
        </div>

        <div
          className="right w-100 w-lg-50 p-4 bg-white rounded"
          style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
        >
          <h2
            className="fw-bold mb-4 text-center"
            style={{ color: "var(--primary-color)" }}
          >
            CONTACT US
          </h2>
          <p className="mb-4 w-100 text-muted text-center">
            Have questions or need assistance? We’re here to help! Reach out to
            us anytime.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                rows="4"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={submitted}
            >
              {submitted ? "Message Sent ✔" : "Send Message"}
            </button>
          </form>

          {submitted && (
            <div className="alert alert-success mt-3 fade-in" role="alert">
              Thank you for contacting us! We'll get back to you soon.
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Contact;
