import React, { useState } from "react";
import { registerUserService } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newuser = await registerUserService(formData);
      localStorage.setItem("token", newuser.token);
      if (newuser.success && newuser.user && newuser.user._id) {
        localStorage.setItem("token", newuser.token);
        localStorage.setItem("userId", newuser.user._id);
        localStorage.setItem("username", newuser.user.username); // for register
        navigate("/");
        alert("Registration successful!");
      }

      // if (newuser.success) {
      //   navigate("/");
      //   alert("Registration successful!");
      // }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed: " + (error.message || "Unknown error"));
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    //     Register
    //   </h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-3">
    //       <label
    //         htmlFor="name"
    //         className="form-label"
    //         style={{ color: "#f8f9fa" }}
    //       >
    //         Name
    //       </label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         name="name"
    //         placeholder="Enter name"
    //         style={{
    //           background: "#181a20",
    //           color: "#f8f9fa",
    //           border: "1px solid #444",
    //         }}
    //         value={formData.name}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div className="mb-3">
    //       <label
    //         htmlFor="username"
    //         className="form-label"
    //         style={{ color: "#f8f9fa" }}
    //       >
    //         Username
    //       </label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         name="username"
    //         placeholder="Enter username"
    //         style={{
    //           background: "#181a20",
    //           color: "#f8f9fa",
    //           border: "1px solid #444",
    //         }}
    //         value={formData.username}
    //         onChange={handleChange}
    //       />
    //     </div>
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
    //         placeholder="Enter email"
    //         value={formData.email}
    //         onChange={handleChange}
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
    //         style={{
    //           background: "#181a20",
    //           color: "#f8f9fa",
    //           border: "1px solid #444",
    //         }}
    //         value={formData.password}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div className="mb-3" style={{ color: "#b0b3b8" }}>
    //       Already have an account?{" "}
    //       <a href="/" style={{ color: "#0d6efd" }}>
    //         Login
    //       </a>
    //     </div>
    //     <button
    //       type="submit"
    //       className="btn btn-primary w-100"
    //       style={{ background: "#0d6efd", border: "none" }}
    //     >
    //       Register
    //     </button>
    //   </form>
    // </div>
    <div className="ring">
      <i style={{ "--clr": "#ff69b4" }}></i>
      <i style={{ "--clr": "#ff0057" }}></i>
      <i style={{ "--clr": "#fffd44" }}></i>
      <div className="login">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div className="inputBx mb-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputBx mb-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputBx mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
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
              required
            />
          </div>
          <div className="inputBx mb-3">
            <input type="submit" value="Register" />
          </div>
        </form>
        <div className="links">
          <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
