// Doctors.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Doctors.css';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/doctors')
      .then(response => response.json())
      .then(data => {
        console.log('Doctor data received:', data); // Debugging
        if (data.length > 0) {
          // Group doctors by name and avoid duplication
          const doctorMap = new Map();
          data.forEach(doctor => {
            if (!doctorMap.has(doctor.name)) {
              doctorMap.set(doctor.name, {
                name: doctor.name,
                specialization: doctor.specialization,
                slots: []
              });
            }
            doctorMap.get(doctor.name).slots.push(doctor.slot_time);
          });
          setDoctors(Array.from(doctorMap.values()));
        } else {
          setError('No doctors available.');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching doctor data:', err);
        setError('Failed to fetch doctors.');
        setLoading(false);
      });
  }, []);

  const formatDate = (slot) => {
    const date = new Date(slot);
    if (isNaN(date.getTime())) {
      console.error('Invalid date format:', slot);
      return 'Invalid Date';
    }
    return date.toLocaleString(); // Convert to readable date-time
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Replace with actual health data from records.js
  const healthData = {
    bloodPressure: '90/60 mmHg',
    heartRate: 55,
    bloodOxygen: 90,
  };

  return (
    <div className="doctors-list">
      <h1>Doctors List</h1>
      {doctors.map((doctor, index) => (
        <div key={index} className="doctor-card">
          <h3>{doctor.name}</h3>
          <p>Specialization: {doctor.specialization}</p>
          <div className="slots">
            {doctor.slots.map((slot, i) => (
              <Link
                key={i}
                to={{
                  pathname: '/book-appointment',
                  state: {
                    doctorName: doctor.name,
                    specialization: doctor.specialization,
                    slot, // This should be the actual slot
                    healthData, // Pass the health data
                  },
                }}
              >
                <button className="slot-button">{formatDate(slot)}</button>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Doctors;
