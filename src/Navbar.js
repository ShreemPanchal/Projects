import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useCart } from "./cartContext"; // Import useCart to access cart state
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Navbar = () => {
  const { userEmail } = useContext(AuthContext);
  const { cart } = useCart(); // Access cart state
  const navigate = useNavigate(); // Initialize navigation

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/">Home</a>
        <a href="/signup">Sign Up</a>
        <a href="/signin">Sign In</a>
        <a href="/Products">Products</a>
      </div>
      <div className="navbar-right">
        {userEmail ? (
          <span>
            <FaUser style={{ marginRight: '0.5rem' }} /> {userEmail}
          </span>
        ) : (
          <a href="/signin">Sign In</a>
        )}
        <div
          className="cart-icon"
          onClick={() => navigate('/Cart')} // Navigate to cart page on click
          style={{ cursor: 'pointer', position: 'relative' }}
        >
          <FaShoppingCart size={24} />
          {cart.length > 0 && (
            <span className="cart-count">
              {cart.length}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
