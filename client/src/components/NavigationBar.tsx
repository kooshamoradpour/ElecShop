import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png"

const  NavigationBar = () => {
  return (
    <ul className="nav nav-tabs" style={{display: "flex", listStyle: "none", justifyContent: "space-between", background:"#13AE5C"}}>
      <img src={Logo} alt="logo" style={{width: "60px" , height: "60px"}} />
      <div className="links" style={{display:"flex"}}>
      <li className="nav-item" style={{padding: '0 10px'}}>
        <Link to="/">
          <h1 className="m-0">Home</h1>
        </Link>
      </li>
      <li className="nav-item" style={{padding: '0 10px'}}>
      <Link  to="/login">
          <h1 className="m-0">Login</h1>
        </Link>
      </li>
      <li className="nav-item" style={{padding: '0 10px'}}>
      <Link  to="/signup">
          <h1 className="m-0">Sign Up</h1>
        </Link>
      </li>
      </div>
    </ul>
  );
}

export default NavigationBar;
