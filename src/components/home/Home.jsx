import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import PaymentForm from "../payment/PaymentForm";
import './Home.css';

const serviceOptions = [
  {
    type: "Plumbing",
    price: 75,
    image: "https://images.pexels.com/photos/5592293/pexels-photo-5592293.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Fix leaks, install fixtures, and resolve pipe issues.",
    features: "Certified Plumber, 2-hour service window, Emergency available"
  },
  {
    type: "House Cleaning",
    price: 90,
    image: "https://images.pexels.com/photos/4107130/pexels-photo-4107130.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Deep cleaning services for kitchens, bathrooms, and more.",
    features: "Eco-friendly products, Trained professionals, Satisfaction guarantee"
  },
  {
    type: "Electrician",
    price: 85,
    image: "https://images.pexels.com/photos/8005368/pexels-photo-8005368.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Fix electrical issues and install lights or sockets.",
    features: "Licensed Electrician, Quick diagnostics, Safety-focused"
  },
  {
    type: "Painting",
    price: 120,
    image: "https://images.pexels.com/photos/6444271/pexels-photo-6444271.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Professional wall painting and surface finishing for interiors and exteriors.",
    features: "Experienced Painters, Clean Finish, Quality Materials"
  }
];

const Home = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [status, setStatus] = useState("");
  const today = new Date();
  const minDate = format(today, 'yyyy-MM-dd');
  const username = localStorage.getItem("username")
  
  useEffect(() => {
    setSelectedService(null);
    setDate("");
    setTime("");
    setAddress("");
    setErrorMessage("");
    setIsBookingSuccess(false);
    setShowPayment(false);
  }, []);

  const validateForm = () => {
    if (!selectedService) {
      setErrorMessage("Please select a service");
      return false;
    }
    
    if (!date) {
      setErrorMessage("Please select a date");
      return false;
    }
    
    if (!time) {
      setErrorMessage("Please select a time");
      return false;
    }
    
    if (!address) {
      setErrorMessage("Please enter your address");
      return false;
    }
    
    if (!isLoggedIn) {
      setErrorMessage("Please login to book a service");
      return false;
    }
    
    return true;
  };

  const handleBooking = () => {
    setErrorMessage("");
    
    if (!validateForm()) return;
    
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
  const bookingData = {
    serviceType: selectedService.type,
    price: selectedService.price,
    date,
    time,
    address,
    status: "Pending",
    username: username
  };

  try {
    const response = await axios.post("http://localhost:8080/api/bookings", bookingData);
    console.log("Booking saved:", response.data);
    setIsBookingSuccess(true);
    setTimeout(() => {
      navigate("/bookings");
    }, 2000);
  } catch (error) {
    console.error("Failed to save booking:", error);
    setErrorMessage("Failed to save booking. Please try again.");
    setShowPayment(false);
  }
};



  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    document.querySelector('.booking-form').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Professional Home Services at Your Fingertips</h1>
          <p>Book trusted professionals for all your home maintenance needs</p>
          <button 
            className="cta-button"
            onClick={() => document.querySelector('.services-section').scrollIntoView({ behavior: 'smooth' })}
          >
            Book a Service
          </button>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Select a service to get started</p>
        </div>

        <div className="service-list">
          {serviceOptions.map((service, index) => (
            <div
              key={index}
              className={`service-card ${selectedService?.type === service.type ? "selected" : ""}`}
              onClick={() => handleServiceSelect(service)}
            >
              <div className="service-image">
                <img src={service.image} alt={service.type} />
              </div>
              <div className="service-info">
                <h3>{service.type}</h3>
                <p className="service-description">{service.description}</p>
                <p className="service-features"><strong>Features:</strong> {service.features}</p>
                <p className="service-price">From <span>${service.price}</span></p>
                <button className="select-service-button">Select</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="booking-section">
        {!showPayment ? (
          <div className="booking-form">
            <h2>Schedule Your Service</h2>
            {isBookingSuccess ? (
              <div className="success-message">
                <p>Your booking has been confirmed!</p>
                <p>Redirecting to your bookings...</p>
              </div>
            ) : (
              <>
                {errorMessage && (
                  <div className="error-message">
                    {errorMessage}
                  </div>
                )}
                
                {!isLoggedIn && (
                  <div className="login-prompt">
                    <p>You need to be logged in to book a service.</p>
                    <button 
                      className="login-redirect-button"
                      onClick={() => navigate('/login')}
                    >
                      Login / Sign Up
                    </button>
                  </div>
                )}
                
                <div className="form-group">
                  <label>Selected Service</label>
                  <div className="selected-service-display">
                    {selectedService ? (
                      <div className="selected-service-info">
                        <span className="service-name">{selectedService.type}</span>
                        <span className="service-price">${selectedService.price}</span>
                      </div>
                    ) : (
                      <p className="no-selection">Please select a service from above</p>
                    )}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input 
                      type="date" 
                      id="date"
                      min={minDate}
                      value={date} 
                      onChange={e => setDate(e.target.value)} 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input 
                      type="time" 
                      id="time"
                      value={time} 
                      onChange={e => setTime(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="address">Service Address</label>
                  <textarea 
                    id="address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Enter your full address"
                    rows={3}
                  ></textarea>
                </div>
                
                <button 
                  className="confirm-booking-button"
                  onClick={handleBooking}
                  disabled={!isLoggedIn}
                >
                  Confirm Booking
                </button>
              </>
            )}
          </div>
        ) : (
          <PaymentForm
            amount={selectedService.price}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        )}
      </section>

      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose Us</h2>
          <p>Our commitment to quality service</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✓</div>
            <h3>Verified Professionals</h3>
            <p>All our service providers undergo thorough background checks</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⏱</div>
            <h3>On-Time Service</h3>
            <p>We value your time and commit to punctual service delivery</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Transparent Pricing</h3>
            <p>No hidden fees or charges - pay only what you see</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Satisfaction Guaranteed</h3>
            <p>Not happy? We'll make it right or your money back</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;