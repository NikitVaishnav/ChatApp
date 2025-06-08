import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../features/auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from '../features/auth/Register';
import Dashboard from '../features/chat/Dashboard';
import ProtectedRoute from './ProtectedRoutes';
// ...existing code...

const Router = () => {
  return (
 <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router