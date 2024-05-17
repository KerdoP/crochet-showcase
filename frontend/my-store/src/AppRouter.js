// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import AddCrochetItem from './components/AddCrochetItem';
import About from './components/About';
import Contact from './components/Contact';
import ListCrochetItems from './components/ListCrochetItems';
import CrochetItem from './components/CrochetItem';
import Register from './components/Register';
import Login from './components/Login';
import EditCrochetItem from './components/EditCrochetItem';
import Navbar from './components/Navbar';

const AppRouter = () => {
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={isAuthenticated ? <ListCrochetItems /> : <Navigate to="/login" />} />
        <Route path="/item/:id" element={isAuthenticated ? <CrochetItem /> : <Navigate to="/login" />} />
        <Route path="/add" element={isAuthenticated ? <AddCrochetItem /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={isAuthenticated ? <EditCrochetItem /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
