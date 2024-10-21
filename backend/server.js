const express = require('express');
const mysql = require('mysql2');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;


const multer = require('multer');
const upload = multer();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'amrita_hospital'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

// API to get doctors' info
app.get('/api/doctors', (req, res) => {
  const query = `
    SELECT d.id, d.name, d.specialization, s.slot_time 
    FROM doctors d 
    LEFT JOIN slots s ON d.id = s.doctor_id
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching doctor data:", err);
      res.status(500).send("Error fetching doctor data");
      return;
    }
    res.json(results);
  });
});

// Route to call the Flask API for diabetes prediction
app.post('/api/predict/diabetes', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:5000/predict/diabetes', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error predicting diabetes:', error);
    res.status(500).send('Error predicting diabetes');
  }
});

// Route to call the Flask API for heart disease prediction
app.post('/api/predict/heart', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:5000/predict/heart', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error predicting heart disease:', error);
    res.status(500).send('Error predicting heart disease');
  }
});

// Route to call the Flask API for respiratory disease prediction
app.post('/api/predict/respiratory', upload.single('file'), async (req, res) => {
    try {
      const formData = new FormData();
      formData.append('file', req.file.buffer, req.file.originalname); // Use the buffer from multer
  
      const response = await axios.post('http://localhost:5000/predict/respiratory', formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error predicting respiratory disease:', error);
      res.status(500).send('Error predicting respiratory disease');
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Node.js server running on http://localhost:${PORT}`);
});
