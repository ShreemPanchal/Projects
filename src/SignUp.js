import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from './FirebaseConfig'; // Ensure correct import of Firebase config
import { useNavigate } from "react-router-dom";


function SignUp() {
    const [data, setData] = useState({ name: "", email: "", password: "" });
    const Navigate=useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(data,null,2))
        const auth = getAuth(app); // Initialize auth with the app instance
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                Navigate("/SignIn");
                console.log(userCredential);
                console.log(user)
                
                // You can redirect the user or display a success message here
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                // Handle errors here (e.g., show an error message)
            });
    };

    return (
        <div className="signup-container">
            <div className="signup-image">
                <img src="" 
                alt=""></img>
            </div>
            <div className="signup-form">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
