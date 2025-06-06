import React, { useState } from "react";

const Register = () => {
   const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
  });

const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const newUser = await registerUser(formData);
    //   if (newUser?.success) {
      
    //     alert("Registration successful! Please log in.");
    //     // Optionally redirect to login page
    //     // navigate("/login");
    //   } else {
    //     alert("Registration failed: " + (newUser?.message || "Unknown error"));
    //   }
    // } catch (error) {
    //   console.error("Register failed:", error);
    // }
    // navigate("/test")
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        Register
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="name"
            className="form-label"
            style={{ color: "#f8f9fa" }}
          >
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            style={{
              background: "#181a20",
              color: "#f8f9fa",
              border: "1px solid #444",
            }}
            value={formData.name}
            onChange={handleChange}
          />
        </div>
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
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
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
            style={{
              background: "#181a20",
              color: "#f8f9fa",
              border: "1px solid #444",
            }}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3" style={{ color: "#b0b3b8" }}>
          Already have an account?{" "}
          <a href="/" style={{ color: "#0d6efd" }}>
            Login
          </a>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          style={{ background: "#0d6efd", border: "none" }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
