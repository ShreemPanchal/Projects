import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storage, db } from "./FirebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { FaIndianRupeeSign } from "react-icons/fa6";

function Products() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  console.log(auth);
  useEffect(() => {
    //const user = auth?.currentUser;
    const userEmail = localStorage.getItem("userEmail");

    if (userEmail !== "admi@gmail.com") {
      navigate("/"); // Redirect non-admin users to the homepage
    }

    const unsubscribe = onSnapshot(
      collection(db, "Product Details"),
      (snap) => {
        const productList = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
        console.log(productList);
      }
    );

    return () => unsubscribe();
  }, [navigate, auth?.currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (file) {
      const storageRef = ref(storage, file.name);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } else {
      console.log("No file selected");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadFile();
      if (imageUrl) {
        const docRef = await addDoc(collection(db, "Product Details"), {
          name: product.name,
          description: product.description,
          price: product.price,
          image: imageUrl,
        });
        console.log("Document written with ID: ", docRef.id);
        setProduct({ name: "", description: "", price: "", image: "" });
        setFile(null);
      } else {
        console.error("Image upload failed");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Product Details", id));
    console.log("Deleted document with ID:", id);
  };

  return (
    <div className="products-container">
      <form
        className="product-form"
        // style={{ marginTop: "20%" }}
        onSubmit={handleSubmit}
      >
        <h2>Add a New Product</h2>
        <div className="input-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="file"
            name="file"
            placeholder="file"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
      <div className="product">
        <h2>Product List</h2>
        <div className="product-list">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <FaIndianRupeeSign />
                {product.price}
              </p>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
