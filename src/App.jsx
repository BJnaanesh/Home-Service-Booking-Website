import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Services from './components/services/Services';
import AboutUs from './components/aboutUs/AboutUs';
import Login from './components/login/Login';
import Main from './components/main/Main';
import Layout from './components/layout/Layout';
import Profile from './components/profile/Profile';
import './styles/global.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return !!localStorage.getItem('username');
});

  
  // Check if user is logged in on initial load
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setIsLoggedIn(true);
    }
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  return (
    <div className="app-container">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="home" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="bookings" element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            } />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="profile" element={
              <ProtectedRoute>
                <Profile setIsLoggedIn={setIsLoggedIn} />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;