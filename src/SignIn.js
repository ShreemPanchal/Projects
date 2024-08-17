import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { app } from "./FirebaseConfig";

function SignIn() {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // Set user data in Firestore
      const docRef = doc(db, "UserData", user.uid); // Assuming user ID is the document ID
      await setDoc(docRef, {
        email: data.email,
        password: data.password,
        name: data.name,
        address: data.address,
      });

      // Fetch user data from Firestore for verification
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }

      // Store user's email in local storage
      localStorage.setItem("userEmail", user?.email);

      // Check if the email is admin email and navigate accordingly
      if (data.email === "admin@gmail.com") {
        navigate("/Products");
      }
    } catch (error) {
      console.error("Error signing in or writing to Firestore:", error.message);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-image"></div>
      <div className="signin-form">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={data.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
