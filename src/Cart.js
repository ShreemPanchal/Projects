import React from 'react';
import { useCart } from './cartContext';
import { FaIndianRupeeSign, FaTrash } from 'react-icons/fa6';
import './App.css';

function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-list">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-price">
                  <FaIndianRupeeSign />
                  {item.price}
                </p>
                <button className="remove-from-cart" onClick={() => removeFromCart(item.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;
