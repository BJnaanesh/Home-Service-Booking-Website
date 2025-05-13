import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaCalendarAlt, FaEdit, FaSignOutAlt, FaSave, FaTimes } from 'react-icons/fa';
import './Profile.css';

const Profile = ({ setIsLoggedIn }) => {
  const [user, setUser] = useState(null);
  const [originalUser, setOriginalUser] = useState(null); // For cancel
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);


  const username = localStorage.getItem('username');
  const API_BASE = `http://localhost:8080/api/users`;

  useEffect(() => {
    if (!username) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    axios.get(`${API_BASE}/profile/${username}`)
      .then(res => {
        setUser(res.data);
        setOriginalUser(res.data); // Store original for cancel
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading profile:", err);
        setError("Failed to load profile");
        setLoading(false);
      });
  }, [username]);

  useEffect(() => {
  if (!username) {
    setError("User not logged in");
    setLoading(false);
    return;
  }

  const fetchProfile = axios.get(`${API_BASE}/profile/${username}`);
  const fetchBookings = axios.get(`http://localhost:8080/api/bookings/${username}`);

  Promise.all([fetchProfile, fetchBookings])
    .then(([profileRes, bookingsRes]) => {
      setUser(profileRes.data);
      setOriginalUser(profileRes.data);
      setBookings(bookingsRes.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error loading data:", err);
      setError("Failed to load profile or bookings");
      setLoading(false);
    });
}, [username]);


  const handleLogout = () => {
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios.put(`${API_BASE}/profile/${username}`, user)
      .then(res => {
        alert("Profile updated successfully");
        setUser(res.data);
        setOriginalUser(res.data);
        setEditing(false);
      })
      .catch(err => {
        console.error("Update failed:", err);
        alert("Failed to update profile");
      });
  };

  const handleCancel = () => {
    setUser(originalUser);
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-error">
        <p>{error}</p>
        <Link to="/login" className="login-button">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
      </div>

      <div className="profile-content">
        <div className="profile-card user-info">
          <div className="card-header">
            <h2>Personal Information</h2>
            {!editing ? (
              <button className="edit-button" onClick={() => setEditing(true)}>
                <FaEdit /> Edit
              </button>
            ) : (
              <div className="edit-controls">
                <button className="save-button" onClick={handleSave}>
                  <FaSave /> Save
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </div>

          <div className="user-details">
            <div className="user-avatar">
              <div className="avatar-circle">
                {user.username.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="user-info-details">
              <div className="info-item">
                <FaUser className="info-icon" />
                <div>
                  <label>Username</label>
                  <p>{user.username}</p>
                </div>
              </div>

              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div>
                  <label>Email</label>
                  {editing ? (
                    <input name="email" value={user.email} onChange={handleChange} required />
                  ) : (
                    <p>{user.email}</p>
                  )}
                </div>
              </div>

              <div className="info-item">
                <FaUser className="info-icon" />
                <div>
                  <label>Full Name</label>
                  {editing ? (
                    <input name="fullName" value={user.fullName} onChange={handleChange} required />
                  ) : (
                    <p>{user.fullName}</p>
                  )}
                </div>
              </div>

              <div className="info-item">
                <FaUser className="info-icon" />
                <div>
                  <label>Phone</label>
                  {editing ? (
                    <input name="phone" value={user.phone} onChange={handleChange} required />
                  ) : (
                    <p>{user.phone}</p>
                  )}
                </div>
              </div>

              <div className="info-item">
                <FaUser className="info-icon" />
                <div>
                  <label>Address</label>
                  {editing ? (
                    <input name="address" value={user.address} onChange={handleChange} required />
                  ) : (
                    <p>{user.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-card bookings-info">
          <div className="card-header">
            <h2>My Bookings</h2>
            <Link to="/bookings" className="view-all-button">
              View All
            </Link>
          </div>

          {bookings.length > 0 ? (
  <div className="user-bookings">
    {bookings.map((booking, index) => (
      <div key={index} className="booking-item">
        <div className="booking-icon">
          <FaCalendarAlt />
        </div>
        <div className="booking-details">
          <div className="booking-service">
            <h3>{booking.serviceType ?? 'Service'}</h3>
            <span className={`booking-status ${booking.status.toLowerCase()}`}>
              {booking.status}
            </span>
          </div>
          <div className="booking-meta">
  <span className="booking-date">
    <FaCalendarAlt className="meta-icon" />
    {new Date(booking.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
  </span>
  <span className="booking-price">
    <br></br> ${booking.price.toFixed(2)}
  </span>
</div>

        </div>
      </div>
    ))}
  </div>
) : (
  <div className="no-bookings">
    <p>You don't have any bookings yet.</p>
    <Link to="/home" className="book-service-button">
      Book a Service
    </Link>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default Profile;
