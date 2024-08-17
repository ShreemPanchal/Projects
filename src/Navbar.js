import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useCart } from "./cartContext"; // Import useCart to access cart state
import { FaUser, FaShoppingCart, FaSearch, FaBell, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Navbar = () => {
  const { userEmail } = useContext(AuthContext);
  const { cart } = useCart(); // Access cart state
  const navigate = useNavigate(); // Initialize navigation
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">Brand</a>
        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <a href="/">Home</a>
          <a href="/signup">Sign Up</a>
          <a href="/signin">Sign In</a>
          <a href="/Products">Products</a>
        </div>
      </div>
      <div className="navbar-right">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <FaSearch />
        </div>
        <div className="notifications-icon">
          <FaBell size={24} />
        </div>
        {userEmail ? (
          <span className="user-info">
            <FaUser style={{ marginRight: '0.5rem' }} /> {userEmail}
          </span>
        ) : (
          <a href="/signin">Sign In</a>
        )}
        
        <div className="menu-toggle" onClick={handleMenuToggle}>
          <FaBars size={24} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
