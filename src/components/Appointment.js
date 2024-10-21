// src/components/Appointment.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Appointment = () => {
    const [doctors, setDoctors] = useState([]); // Ensure it's initialized as an empty array

    useEffect(() => {
      const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/doctors');
            console.log(response.data); // Log the response to see its structure
            setDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };
    

        fetchDoctors();
    }, []);

    return (
        <div>
            <h1>Doctors</h1>
            {doctors.length > 0 ? ( // Check if doctors array has items
                doctors.map(doctor => (
                    <div key={doctor.id}>{doctor.name} - {doctor.specialization}</div>
                ))
            ) : (
                <p>No doctors found.</p> // Fallback message
            )}
        </div>
    );
};

export default Appointment;
