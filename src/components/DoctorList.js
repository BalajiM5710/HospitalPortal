import React, { useEffect, useState } from 'react';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [slots, setSlots] = useState([]);

    // Fetch all doctors
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:5000/doctors');
                if (!response.ok) {
                    throw new Error('Failed to fetch doctors');
                }
                const data = await response.json();
                setDoctors(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDoctors();
    }, []);

    // Fetch available slots for a selected doctor
    const fetchSlots = async (doctorId) => {
        try {
            const response = await fetch(`http://localhost:5000/doctors/${doctorId}/slots`);
            if (!response.ok) {
                throw new Error('Failed to fetch slots');
            }
            const data = await response.json();
            setSlots(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Handle doctor selection
    const handleDoctorClick = (doctor) => {
        setSelectedDoctor(doctor);
        fetchSlots(doctor.id); // Fetch available slots for this doctor
    };

    return (
        <div>
            <h1>Doctors List</h1>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.id} onClick={() => handleDoctorClick(doctor)}>
                        {doctor.name} - {doctor.specialization}
                    </li>
                ))}
            </ul>

            {selectedDoctor && (
                <div>
                    <h2>Available Slots for {selectedDoctor.name}</h2>
                    <ul>
                        {slots.map((slot) => (
                            <li key={slot.id}>{slot.slot_time}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DoctorList;
