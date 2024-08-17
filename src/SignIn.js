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
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
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
    setLoading(true); // Show loading spinner

    const auth = getAuth(app);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // Set user data in Firestore
      const docRef = doc(db, "UserData", user.uid);
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
      } else {
        navigate("/Home");
      }
    } catch (error) {
      setError("Invalid email or password."); // Set error message
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-content">
        <div className="signin-form-container">
          <h2 className="signin-heading">Sign In</h2>
          {error && <p className="signin-error">{error}</p>}
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                required
                className="signin-input"
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
                className="signin-input"
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
                className="signin-input"
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                  className="signin-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button type="submit" className="signin-button" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
