import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookAppointment.css'; // Add styling if needed

function BookAppointment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data passed from the previous page (doctor's name, slot, etc.)
  const { doctor, slot } = location.state || {}; 

  // Define the state for form data
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    doctorName: doctor?.name || '',
    specialization: doctor?.specialization || '',
    slotTime: slot || '',
    issue: ''
  });

  // Fetch user details (simulating getting user data from API or state)
  useEffect(() => {
    // You can replace this logic with API calls if you are fetching user data
    const fetchUserData = () => {
      // Mock user data (You can fetch this data from your backend API if needed)
      const userData = {
        name: 'John Doe',
        mobile: '1234567890',
        email: 'johndoe@example.com'
      };

      // Prefill form data with user details
      setFormData(prevFormData => ({
        ...prevFormData,
        name: userData.name,
        mobile: userData.mobile,
        email: userData.email
      }));
    };

    fetchUserData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Replace this URL with the endpoint to book an appointment
      const response = await axios.post('http://localhost:5000/api/book-appointment', formData);

      // Handle success (You can show a success message or redirect the user)
      alert('Appointment booked successfully!');
      navigate('/'); // Redirect to home page or any other page
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment. Please try again.');
    }
  };

  return (
    <div className="book-appointment">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="doctorName">Doctor:</label>
          <input
            type="text"
            id="doctorName"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="specialization">Specialization:</label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="slotTime">Slot Time:</label>
          <input
            type="text"
            id="slotTime"
            name="slotTime"
            value={new Date(formData.slotTime).toLocaleString()} // Format slot time
            onChange={handleChange}
            required
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="issue">Issue/Concern:</label>
          <textarea
            id="issue"
            name="issue"
            value={formData.issue}
            onChange={handleChange}
            placeholder="Describe your issue or concern"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BookAppointment;
