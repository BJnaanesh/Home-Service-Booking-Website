import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import './Services.css';
import { FaHome, FaFilter, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

const Services = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!username) {
      setError("Username not found. Please log in again.");
      setLoading(false);
      window.location.href = '/home';
      return;
    }

    axios.get(`http://localhost:8080/api/bookings/${username}`)
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings", err);
        setError("Failed to load your bookings. Please try again.");
        setLoading(false);
      });
  }, [username]);

  const filteredBookings = bookings.filter(booking => {
    if (filter === "all") return true;
    return booking.status?.toLowerCase() === filter.toLowerCase();
  });

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="bookings-container">
      <div className="bookings-header">
        <h1>My Bookings</h1>
        <Link to="/home" className="back-to-home">
          <FaHome /> Back to Home
        </Link>
      </div>

      <div className="bookings-filter">
        <div className="filter-label">
          <FaFilter /> Filter by status:
        </div>
        <div className="filter-options">
          {["all", "pending", "completed", "cancelled"].map(status => (
            <button
              key={status}
              className={`filter-button ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <FaSpinner className="spin-animation" />
          <p>Loading your bookings...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <FaExclamationTriangle />
          <p>{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="empty-state">
          <p>No {filter !== 'all' ? filter : ''} bookings found.</p>
          <Link to="/home" className="book-service-button">
            Book a Service
          </Link>
        </div>
      ) : (
        <div className="bookings-list">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className={`booking-card status-${booking.status?.toLowerCase()}`}>
              <div className="booking-header">
                <h2>{booking.serviceType}</h2>
                <div className={`booking-status ${booking.status?.toLowerCase()}`}>
                  {booking.status}
                </div>
              </div>

              <div className="booking-details">
                <div className="booking-info">
                  <p><strong>Date:</strong> {formatDate(booking.date)}</p>
                  <p><strong>Time:</strong> {booking.time}</p>
                  <p><strong>Address:</strong> {booking.address}</p>
                  <p className="booking-price"><strong>Price:</strong> ${booking.price}</p>
                </div>

                <div className="booking-actions">
                  {booking.status === 'Pending' && (
                    <>
                      <button className="action-button reschedule">Reschedule</button>
                      <button className="action-button cancel">Cancel</button>
                    </>
                  )}
                  {['Completed', 'Cancelled'].includes(booking.status) && (
                    <button className="action-button book-again">Book Again</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
