import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Navbar from "./Navbar";
import Products from "./Products";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from './cartContext';
import Cart from "./Cart";

function App() {
  const [productList, setProductList] = useState([]);

  const addProduct = (product) => {
    setProductList([...productList, product]);
  };

  return (
    <div className="App">
      <CartProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home productList={productList} />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route
              path="/Products"
              element={<Products addProduct={addProduct} />}
            />
            <Route path="/Cart" element={<Cart />} />
          </Routes>
          
        </Router>
      </AuthProvider>
      </CartProvider>
    </div>
  );
}

export default App;
