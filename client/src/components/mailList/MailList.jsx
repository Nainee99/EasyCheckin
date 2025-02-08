"use client";

import { useState } from "react";
import "./MailList.css";

const MailList = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the subscription logic
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <section className="mail-list">
      <div className="mail-list-container">
        <h2 className="mail-list-title">Save time, save money!</h2>
        <p className="mail-list-desc">
          Sign up and we'll send the best deals to you
        </p>
        <form className="mail-list-form" onSubmit={handleSubmit}>
          <div className="mail-list-input-container">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mail-list-input"
            />
            <button type="submit" className="mail-list-button">
              Subscribe
            </button>
          </div>
        </form>
        <p className="mail-list-privacy">
          By subscribing, you agree to our Privacy Policy and Terms of Service.
        </p>
      </div>
    </section>
  );
};

export default MailList;
