import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Main.css';

const Main = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="main-container">
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants}>
          Professional Home Services
        </motion.h1>
        <motion.p variants={itemVariants}>
          Book trusted professionals for all your home maintenance needs
        </motion.p>
        <motion.div className="hero-buttons" variants={itemVariants}>
          <Link to="/home" className="primary-button">
            Book a Service
          </Link>
          <Link to="/aboutus" className="secondary-button">
            Learn More
          </Link>
        </motion.div>
      </motion.div>
      
      <div className="services-preview">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-preview-card">
            <img 
              src="https://images.pexels.com/photos/5592293/pexels-photo-5592293.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Plumbing services" 
            />
            <h3>Plumbing</h3>
            <p>Expert plumbing services for all your needs</p>
          </div>
          
          <div className="service-preview-card">
            <img 
              src="https://images.pexels.com/photos/4107130/pexels-photo-4107130.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="House cleaning" 
            />
            <h3>House Cleaning</h3>
            <p>Professional cleaning services for your home</p>
          </div>
          
          <div className="service-preview-card">
            <img 
              src="https://images.pexels.com/photos/8005368/pexels-photo-8005368.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Electrical services" 
            />
            <h3>Electrical</h3>
            <p>Certified electricians for safe electrical work</p>
          </div>
          
          <div className="service-preview-card">
            <img 
              src="https://images.pexels.com/photos/6444271/pexels-photo-6444271.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Painting services" 
            />
            <h3>Painting</h3>
            <p>Quality painting services for interior and exterior</p>
          </div>
        </div>
        <div className="view-all-link">
          <Link to="/home">View All Services</Link>
        </div>
      </div>
      
      <div className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="quote">"</div>
            <p>The plumber was punctual, professional, and fixed our leak quickly. Highly recommended!</p>
            <div className="testimonial-author">
              <span className="author-name">Sarah Johnson</span>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="quote">"</div>
            <p>The house cleaning service was thorough and efficient. My home has never looked better!</p>
            <div className="testimonial-author">
              <span className="author-name">Michael Thompson</span>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="quote">"</div>
            <p>Booking was easy and the electrician was knowledgeable. Great service from start to finish.</p>
            <div className="testimonial-author">
              <span className="author-name">Emily Rodriguez</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;