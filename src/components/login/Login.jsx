import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ setIsLoggedIn }) => {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const API_BASE = 'http://localhost:8080/api/users';

  const clearForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${API_BASE}/login`, {
      username,
      password,
    });

    if (response.status === 200) {
      localStorage.setItem('username', username);
      setIsLoggedIn(true);
      navigate('/');
    }
  } catch (err) {
    alert(err.response?.data || 'Login failed');
  }
};


  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_BASE}/signup`, {
        username,
        email,
        password,
      });
      alert(data);
      setMode('login');
      clearForm();
    } catch (err) {
      alert(err.response?.data || 'Signup failed');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_BASE}/reset-password`, {
        username,
        email,
        password,
      });
      alert(data);
      setMode('login');
      clearForm();
    } catch (err) {
      alert(err.response?.data || 'Password reset failed');
    }
  };

  const renderFormTitle = () => {
    switch (mode) {
      case 'signup':
        return 'Create Account';
      case 'forgot':
        return 'Reset Password';
      default:
        return 'Login to HomeService';
    }
  };

  const renderForm = () => (
    <form
      onSubmit={
        mode === 'signup'
          ? handleSignup
          : mode === 'forgot'
          ? handlePasswordReset
          : handleLogin
      }
    >
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter username"
        />
      </div>

      {(mode === 'signup' || mode === 'forgot') && (
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
          />
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          {mode === 'forgot' ? 'New Password' : 'Password'}
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder={mode === 'forgot' ? 'Enter new password' : 'Enter password'}
        />
      </div>

      {mode === 'login' && (
        <div className="d-flex justify-content-between mb-3">
          <button
            type="button"
            className="btn btn-link text-decoration-none p-0"
            onClick={() => {
              clearForm();
              setMode('forgot');
            }}
          >
            Forgot password?
          </button>
        </div>
      )}

      <button type="submit" className="btn btn-primary w-100">
        {mode === 'signup'
          ? 'Create Account'
          : mode === 'forgot'
          ? 'Reset Password'
          : 'Login'}
      </button>
    </form>
  );

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-3">{renderFormTitle()}</h3>
        {renderForm()}
        <div className="text-center mt-3">
          {mode === 'login' && (
            <button
              className="btn btn-link text-decoration-none"
              onClick={() => {
                clearForm();
                setMode('signup');
              }}
            >
              New user? Create an account
            </button>
          )}
          {(mode === 'signup' || mode === 'forgot') && (
            <button
              className="btn btn-link text-decoration-none"
              onClick={() => {
                clearForm();
                setMode('login');
              }}
            >
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
