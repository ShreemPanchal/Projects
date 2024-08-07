import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import "./App.css";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "Product Details");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="hero-section">
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          <div>
            <img src="https://img.freepik.com/premium-photo/stylish-round-eyeglasses-wooden-podium-glasses-sale-banner_721474-3652.jpg?w=1380" alt="Hero 1"  />
          </div>
          <div>
            <img src="https://www.freepik.com/premium-ai-image/straw-hat-sunglasses-pink-teal-background-generative-ai_227222288.htm#from_view=detail_alsolike" alt="Hero 2" />
          </div>
        </Carousel>
        <div className="hero-text">
          <h1>Welcome to Beauty And Bling!!</h1>
        </div>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search for products..." value={searchQuery} onChange={handleSearch} />
      </div>
      <div className="product">
        <h2>Product List</h2>
        <div className="product-list">
          {filteredProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <FaIndianRupeeSign />
                {product.price}
              </p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
