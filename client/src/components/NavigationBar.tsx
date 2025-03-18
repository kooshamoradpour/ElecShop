import { Link } from "react-router-dom";
import { FaSearch, FaBars, FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import logo from "../assets/ElecShop Logo.png";

import LoginForm from "./LoginForm.js";
import SignupForm from "./SignupForm.js";

import Auth from "../utils/auth.js"

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
  color: "black",
  fontSize: "24px",
  marginLeft: "20px"
};

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<"login" | "signup" | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleModalClose = () => {setFormType(null)}

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

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-header" style={navHeaderStyle}>
              <Link to="/Home" style={{ color: "white" }}>Home</Link>
            </li>
            <li className="nav-header" style={navHeaderStyle}>
              <Link to="/contact" className="nav-link" style={{ color: "white" }}>Contact Us</Link>
            </li>

            {/* Login and Signup Buttons */}
            {Auth.loggedIn() ? (
               <button className="login" onClick={Auth.logout} style={{ margin: "0 10px", padding: "8px 16px", borderRadius: "10px", border: "none", backgroundColor: "#000", color: "#fff" }}>
               Log Out
             </button>
            ):(
              <>
              <button className="login" onClick={() => setFormType("login")} style={{ margin: "0 10px", padding: "8px 16px", borderRadius: "10px", border: "none", backgroundColor: "#000", color: "#fff" }}>
              Sign in
              </button>
              <button className="signup" onClick={() => setFormType("signup")} style={{ padding: "8px 16px", borderRadius: "10px", border: "none", backgroundColor: "#fff", color: "#000" }}>
              New customer?
              </button>
              </>
            )}

            <li className="nav-header d-none d-lg-block" style={navHeaderStyle}>
              <Link to="/cart" style={cartIconStyle}>
                <FaShoppingCart />
              </Link>
            </li>
          </ul>
        </div>


        {/* Mobile Search Bar with Icons */}
        <div className="d-lg-none w-100 mt-2">
          <div className="d-flex align-items-center justify-content-between">
            <div style={{ ...searchContainerStyle, margin: "0", flex: "1" }}>
              <input
                type="text"
                placeholder="Search for a product"
                style={searchInputStyle}
              />
              <button style={searchButtonStyle}>
                <FaSearch style={{ color: "black" }} />
              </button>
            </div>
            <div className="d-flex align-items-center ms-3">
              <Link to="/cart" style={cartIconStyle}>
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
          </div>

        </div>
      </div>

      {/* Forms for Login and Signup */}
      {formType && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setFormType(null)} className="close-button">
              ✖
            </button>
            {formType === 'login' ? (<LoginForm handleModalClose={handleModalClose}/>) : formType === 'signup'? (<SignupForm handleModalClose={handleModalClose} />) : null }            
          </div>
        </div>
      )}
      <style>
  {`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 10px;
      width: 300px;
      text-align: center;
      position: relative;
    }
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
    }
    .form {
      display: flex;
      flex-direction: column;
    }
    .form label {
      margin-bottom: 10px;
    }
    .form input {
      padding: 8px;
      margin-top: 5px;
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .form button {
      margin-top: 10px;
      padding: 10px;
      background: #13AE5C;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  `}
</style>


    </nav>
  );
}

export default NavigationBar;
