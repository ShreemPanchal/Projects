import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { FaUser } from 'react-icons/fa';


const Navbar = () => {
  const { userEmail } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/">Home</a>
        <a href="/signup">Sign Up</a>
        <a href="/signin">Sign In</a>
        <a href="/Products">Products</a>
      </div>
      <div className="navbar-right">
     {userEmail ? <span><span>
      <FaUser style={{marginRight:'0.5rem'}}/> {userEmail}
          </span></span> : <a href="/signin">Sign In</a>}
      </div>
    </nav>
  );
};

export default Navbar;
