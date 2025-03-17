import { Link } from "react-router-dom";
import { FaSearch, FaBars, FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import logo from "../assets/ElecShop Logo.png";

// Add CSS styles for nav-header and search bar
const navHeaderStyle = {
  margin: "0 10px",
  display: "flex",
  alignItems: "center"
};

const searchContainerStyle = {
  position: "relative" as const,
  flex: "1",
  maxWidth: "500px",
  margin: "0 20px"
};

const searchInputStyle = {
  width: "100%",
  padding: "8px 40px 8px 15px",
  borderRadius: "20px",
  border: "none",
  outline: "none"
};

const searchButtonStyle = {
  position: "absolute" as const,
  right: "15px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  cursor: "pointer"
};

const cartIconStyle = {
  color: "white",
  fontSize: "24px",
  marginLeft: "20px"
};

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#13AE5C", padding: "10px 20px" }}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/" style={{ color: "black" }}>
          <img src={logo} alt="ElecShop Logo" style={{ height: "40px", marginRight: "10px" }} />
          <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>ElecShop</span>
        </Link>

        {/* Search Bar */}
        <div style={searchContainerStyle} className="d-none d-lg-block">
          <input
            type="text"
            placeholder="Search for a product"
            style={searchInputStyle}
          />
          <button style={searchButtonStyle}>
            <FaSearch style={{ color: "black" }} />
          </button>
        </div>
        
        <div className="d-flex align-items-center">
          <Link to="/cart" className="d-lg-none" style={cartIconStyle}>
            <FaShoppingCart />
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={toggleMenu}
            style={{ border: "none", marginLeft: "15px" }}
          >
            <FaBars style={{ color: "white", fontSize: "24px", outline: "none" }} />
          </button>
        </div>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-header" style={navHeaderStyle}>
              <Link to="/products" style={{ color: "white" }}>Products</Link>
            </li>
            <li className="nav-header" style={navHeaderStyle}>
              <Link to="/profile" className="nav-link" style={{ color: "white" }}>My profile</Link>
            </li>
            <li className="nav-header" style={navHeaderStyle}>
              <Link to="/contact" className="nav-link" style={{ color: "white" }}>Contact Us</Link>
            </li>
            <li className="nav-header" style={navHeaderStyle}>
              <Link to="/login" style={{ color: "white" }}>Sign in</Link>
            </li>
            <li className="nav-header" style={navHeaderStyle}>
              <Link to="/signup" style={{ color: "white" }}>Register</Link>
            </li>
            <li className="nav-header d-none d-lg-block" style={navHeaderStyle}>
              <Link to="/cart" style={cartIconStyle}>
                <FaShoppingCart />
              </Link>
            </li>
          </ul>
        </div>

  
        <div style={searchContainerStyle} className="d-lg-none mt-2 w-100">
          <input
            type="text"
            placeholder="Search for a product"
            style={searchInputStyle}
          />
          <button style={searchButtonStyle}>
            <FaSearch style={{ color: "black" }} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;