import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../features/auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from '../features/auth/Register';
// ...existing code...

const Router = () => {
  return (
 <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  )
}

export default Router