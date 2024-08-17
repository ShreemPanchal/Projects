import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import "./App.css";
import { FaIndianRupeeSign, FaStar } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useCart } from "./cartContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOption, setSortOption] = useState("price-asc");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

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

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
  };

  const filteredProducts = products
    .filter((product) => {
      return (
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (categoryFilter === "all" || product.category === categoryFilter)
      );
    })
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "rating") return b.rating - a.rating;
      return 0;
    });

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showIndicators={true}
          showArrows={true}
          interval={3000}
          transitionTime={500}
        >
          <div>
            <img
              src="https://img.freepik.com/premium-photo/stylish-round-eyeglasses-wooden-podium-glasses-sale-banner_721474-3652.jpg?w=1380"
              alt="Hero 1"
            />
            <p className="carousel-caption">Stylish Eyewear Collection</p>
          </div>
          <div>
            <video
              src="https://videocdn.cdnpk.net/videos/56024950-db68-4856-a401-dd372c2b715f/horizontal/previews/clear/small.mp4?token=exp=1723048637~hmac=21a558a42f2863c9fe5c8def5fd78722564931922375e7f836719e8947529c08"
              alt="Hero 2"
              autoPlay
              muted
              loop
            />
            <p className="carousel-caption">Explore Our Latest Trends</p>
          </div>
        </Carousel>
        <div className="hero-text">
          <h1>Welcome to Beauty And Bling!!</h1>
          <p>Discover the latest trends and timeless classics.</p>
        </div>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="filters">
        <select onChange={handleSort} value={sortOption} className="sort-select">
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
        <select onChange={handleCategoryFilter} value={categoryFilter} className="category-select">
          <option value="all">All Categories</option>
          <option value="eyewear">Eyewear</option>
          <option value="makeup">Makeup</option>
          <option value="jewelry">Jewelry</option>
        </select>
      </div>
      <div className="product">
        <h2>Product List</h2>
        <div className="product-list">
          {filteredProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      color={i < product.rating ? "#FFD700" : "#ddd"}
                    />
                  ))}
                </div>
                <p className="product-price">
                  <FaIndianRupeeSign />
                  {product.price}
                </p>
                {product.isNew && <span className="badge new">New</span>}
                {product.isBestSeller && (
                  <span className="badge bestseller">Best Seller</span>
                )}
                {product.isDiscounted && (
                  <span className="badge discount">Discount</span>
                )}
                <button
                  className="view-details"
                  onClick={() => openModal(product)}
                >
                  View Details
                </button>
                <button
                  className="add-to-cart"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProduct.name}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <p>{selectedProduct.description}</p>
            <p className="modal-price">
              <FaIndianRupeeSign />
              {selectedProduct.price}
            </p>
            <button className="close-modal" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
      <div
        className="cart-icon"
        onClick={() => {
          navigate("/Cart");
        }}
      >
        <FaShoppingCart size={24} />
        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </div>
    </div>
  );
}

export default Home;
