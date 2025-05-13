import React from "react";
import { FaCheck, FaClock, FaDollarSign, FaHeadset } from 'react-icons/fa';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>About Us</h1>
          <p>Your trusted platform for professional home services</p>
        </div>
      </div>
      
      <div className="aboutus-content">
        <section className="company-section">
          <div className="section-content">
            <h2>Our Story</h2>
            <p>
              Welcome to Home Service Booking, your trusted platform for booking reliable
              and professional home services. We connect customers with experienced
              professionals in plumbing, electrical repair, house cleaning, and more.
            </p>
            <p>
              Our mission is to simplify your life by providing a seamless booking
              experience, ensuring quality service at your convenience. Whether you're
              scheduling a repair or planning a deep clean, our platform ensures
              transparent pricing, trusted professionals, and on-time service.
            </p>
          </div>
          
          <div className="section-image">
            <img 
              src="https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Professional home service" 
            />
          </div>
        </section>
        
        <section className="values-section">
          <h2>Why Choose Us</h2>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FaCheck />
              </div>
              <h3>Verified Professionals</h3>
              <p>All our service providers undergo thorough background checks and skill verification to ensure you receive the highest quality service.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FaClock />
              </div>
              <h3>Easy Booking</h3>
              <p>Our intuitive platform makes it simple to book services at your preferred date and time, with just a few clicks.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FaDollarSign />
              </div>
              <h3>Transparent Pricing</h3>
              <p>No surprises or hidden fees. We provide clear pricing information upfront so you know exactly what you're paying for.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FaHeadset />
              </div>
              <h3>Customer Support</h3>
              <p>Our responsive support team is always ready to assist you with any questions or concerns about your booking.</p>
            </div>
          </div>
        </section>
        
        <section className="commitment-section">
          <div className="section-image">
            <img 
              src="https://images.pexels.com/photos/3856635/pexels-photo-3856635.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Home service professional" 
            />
          </div>
          
          <div className="section-content">
            <h2>Our Commitment</h2>
            <p>
              At HomeService, we're committed to making your home maintenance experience as smooth and stress-free as possible. We carefully vet all service professionals to ensure they meet our high standards for skill, reliability, and customer service.
            </p>
            <p>
              We believe everyone deserves access to quality home services without the hassle. Our platform is designed to save you time and provide peace of mind, knowing that your home is in good hands.
            </p>
            <p>
              Thank you for choosing HomeService. We look forward to serving your home maintenance needs and exceeding your expectations.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;