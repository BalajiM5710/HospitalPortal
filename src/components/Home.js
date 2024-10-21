import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Amrita Hospitals</h1>
      <p>At Amrita Hospitals, we are committed to providing world-class healthcare solutions. Our dedicated team of doctors, nurses, and staff are here to support your health and wellness journey. Explore our state-of-the-art facilities, expert services, and personalized care options.</p>
      <div className="section">
        <h2>Comprehensive Healthcare Services</h2>
        <p>We offer a wide range of services including cardiology, neurology, orthopedics, and more. Our team of specialists ensures that every patient receives the best possible treatment tailored to their specific needs.</p>
      </div>
      <div className="section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>24/7 Emergency Services</li>
          <li>Advanced Diagnostics and Equipment</li>
          <li>Compassionate and Experienced Medical Professionals</li>
          <li>Patient-Centered Care</li>
        </ul>
      </div>

      {/* New Button */}
      <div className="appointment-button-container">
        <Link to="/Doctors" className="appointment-button">
          Book Appointment
        </Link>
      </div>
    </div>
  );
}

export default Home;
