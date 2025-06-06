import React, { useState } from "react";

const Login = () => {
   const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting login:", formData); // log input

      // if (user?.success) {
      //   alert("Login successful!");
      // } else {
      //   alert("Login failed: " + (user?.message || "Unknown error"));
      // }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      className="container mt-5"
      style={{
        maxWidth: "400px",
        background: "#23272f",
        color: "#f8f9fa",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        padding: "2rem",
      }}
    >
      <h2 className="mb-4 text-center" style={{ color: "#f8f9fa" }}>
        Login
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="form-label"
            style={{ color: "#f8f9fa" }}
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            style={{
              background: "#181a20",
              color: "#f8f9fa",
              border: "1px solid #444",
            }}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="form-label"
            style={{ color: "#f8f9fa" }}
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{
              background: "#181a20",
              color: "#f8f9fa",
              border: "1px solid #444",
            }}
          />
        </div>
        <div className="mb-3" style={{ color: "#b0b3b8" }}>
          New user?{" "}
          <a href="/register" style={{ color: "#0d6efd" }}>
            Register
          </a>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          style={{ background: "#0d6efd", border: "none" }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
