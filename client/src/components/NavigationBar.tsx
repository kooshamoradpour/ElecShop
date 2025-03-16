import { Link } from "react-router-dom";
import logo from "../assets/ElecShop Logo.png";

// Add CSS styles for nav-header
const navHeaderStyle = {
  margin: "0 10px",
  display: "flex",
  alignItems: "center"
};

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#13AE5C", padding: "10px 20px" }}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/" style={{ color: "black" }}>
          <img src={logo} alt="ElecShop Logo" style={{ height: "40px", marginRight: "10px" }} />
          <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>ElecShop</span>
        </Link>
        
        <div className="nav-menu">
          <ul className="navbar-nav">
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;