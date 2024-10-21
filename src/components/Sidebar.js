// src/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; 

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/predictive-health">AI Predictive Health</Link></li>
        <li><Link to="/BookAppointment">Appointment</Link></li>
        <li><Link to="/diet">Diet Recommendations</Link></li>
        <li><Link to="/records">Records</Link></li>
        <li><Link to="/Doctors">Doctors</Link></li> {/* Corrected Link */}
      </ul>
    </nav>
  );
};

export default Sidebar;