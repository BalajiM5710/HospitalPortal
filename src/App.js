// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/login';
import Register from './components/Register'; // Import the Register component
import Appointment from './components/Appointment';
import DietRecommendation from './components/DietRecommendation';
import PredictiveHealth from './components/PredictiveHealth';
import Records from './components/Records';
import Doctors from './components/Doctors';
import BookAppointment from './components/BookAppointment'
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <Router>
            <div className="container">
                <Sidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/BookAppointment" element={<BookAppointment />} />
                        <Route path="/diet" element={<DietRecommendation />} />
                        <Route path="/predictive-health" element={<PredictiveHealth />} />
                        <Route path="/records" element={<Records />} />
                        <Route path="/doctors" element={<Doctors />} />
                        <Route path="/book-appointment" element={<BookAppointment />} />
                    </Routes>
                    <Footer />
                </div>
            </div>
        </Router>
    );
}

export default App;
