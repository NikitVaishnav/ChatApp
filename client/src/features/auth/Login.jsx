import React, { useState } from "react";
import { loginUserService } from "../../services/authService.js";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";

const Login = () => {
  console.log("Login component rendered"); // log component render

  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting login:", formData); // log input
      const existingUser = await loginUserService(formData);
      // Use userId in your requests
      console.log("Login response:", existingUser); // log response

      if (existingUser?.success && existingUser.user && existingUser.user._id) {
        alert("Login successful!");
        localStorage.setItem("token", existingUser.token);
        localStorage.setItem("userId", existingUser.user._id);
        localStorage.setItem("username", existingUser.user.username);
        console.log("navigating to dashboard")
        navigate("/dashboard");
      } else {
        alert("Login failed: " + (existingUser?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    // <div
    //   className="container mt-5"
    //   style={{
    //     maxWidth: "400px",
    //     background: "#23272f",
    //     color: "#f8f9fa",
    //     borderRadius: "10px",
    //     boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    //     padding: "2rem",
    //   }}
    // >
    //   <h2 className="mb-4 text-center" style={{ color: "#f8f9fa" }}>
    //     Login
    //   </h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-3">
    //       <label
    //         htmlFor="email"
    //         className="form-label"
    //         style={{ color: "#f8f9fa" }}
    //       >
    //         Email address
    //       </label>
    //       <input
    //         type="email"
    //         className="form-control"
    //         name="email"
    //         value={formData.email}
    //         onChange={handleChange}
    //         placeholder="Enter email"
    //         style={{
    //           background: "#181a20",
    //           color: "#f8f9fa",
    //           border: "1px solid #444",
    //         }}
    //       />
    //     </div>
    //     <div className="mb-3">
    //       <label
    //         htmlFor="password"
    //         className="form-label"
    //         style={{ color: "#f8f9fa" }}
    //       >
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         name="password"
    //         placeholder="Password"
    //         value={formData.password}
    //         onChange={handleChange}
    //         style={{
    //           background: "#181a20",
    //           color: "#f8f9fa",
    //           border: "1px solid #444",
    //         }}
    //       />
    //     </div>
    //     <div className="mb-3" style={{ color: "#b0b3b8" }}>
    //       New user?{" "}
    //       <a href="/register" style={{ color: "#0d6efd" }}>
    //         Register
    //       </a>
    //     </div>
    //     <button
    //       type="submit"
    //       className="btn btn-primary w-100"
    //       style={{ background: "#0d6efd", border: "none" }}
    //     >
    //       Login
    //     </button>
    //   </form>
    // </div>
      <div className="ring">
      <i style={{ "--clr": "#ff69b4" }}></i>
      <i style={{ "--clr": "#ff0057" }}></i>
      <i style={{ "--clr": "#fffd44" }}></i>
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div className="inputBx mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>
          <div className="inputBx mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>
          <div className="inputBx">
            <input type="submit" value="Sign in" />
          </div>
        </form>
        <div className="links">
          <Link to="#">Forget Password</Link>
          <Link to="/register">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
