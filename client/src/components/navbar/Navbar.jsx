import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          EasyCheckin
        </a>
        <div className="navbar-buttons">
          <button className="navbar-button">Register</button>
          <button className="navbar-button navbar-button-primary">Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
