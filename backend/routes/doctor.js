// backend/routes/doctor.js
const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root@123',
    database: 'amrita_hospital'
});

// Route to fetch doctors with their slots
router.get('/doctors', (req, res) => {
    const query = `
        SELECT d.id AS doctor_id, d.name AS doctor_name, d.specialization, s.slot_time 
        FROM doctors d 
        LEFT JOIN slots s ON d.id = s.doctor_id
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query failed:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }

        // Organize the results by specialization
        const doctorsBySpecialization = results.reduce((acc, row) => {
            const { specialization, doctor_name, doctor_id, slot_time } = row;

            if (!acc[specialization]) {
                acc[specialization] = {
                    specialization,
                    doctors: [],
                };
            }

            const doctor = acc[specialization].doctors.find(d => d.id === doctor_id);
            if (!doctor) {
                acc[specialization].doctors.push({
                    id: doctor_id,
                    name: doctor_name,
                    slots: slot_time ? [slot_time] : [], // Initialize with available slots
                });
            } else {
                if (slot_time) doctor.slots.push(slot_time); // Add available slot
            }

            return acc;
        }, {});

        res.json(Object.values(doctorsBySpecialization)); // Return array of specializations
    });
});

module.exports = router;
