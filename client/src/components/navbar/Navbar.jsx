"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          EasyCheckin
        </a>
        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <button className="navbar-button">Register</button>
          <button className="navbar-button navbar-button-primary">Login</button>
        </div>
        <button className="navbar-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
