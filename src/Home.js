import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "./FirebaseConfig";
import './App.css';
import { FaIndianRupeeSign } from "react-icons/fa6";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'Product Details');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  return (
    <div className='home-container'>
      <div className='hero-image'>
        <div >
        <img
          src='https://plus.unsplash.com/premium_photo-1683758342885-7acf321f5d53?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          height="100vh"
          width="100vw"
          alt=''
        /></div>
        <div className='hero-text'>
          <h1>Welcome to Our SmartShop!!</h1>
        </div>
      </div>
      <div className='product' >
        <h2>Product List</h2>
        <div className="product-list">
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p ><FaIndianRupeeSign />{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
