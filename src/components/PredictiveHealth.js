import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PredictiveHealth.css'; // Ensure you create this CSS file for styling

function PredictiveHealth() {
  const [audioFile, setAudioFile] = useState(null);
  const [respiratoryPrediction, setRespiratoryPrediction] = useState('');
  const [heartData, setHeartData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });
  const [heartPrediction, setHeartPrediction] = useState('');
  const [diabetesData, setDiabetesData] = useState({
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigreeFunction: '',
    age: ''
});

  const [diabetesPrediction, setDiabetesPrediction] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // Handle audio file upload
  const handleAudioUpload = (e) => {
    setAudioFile(e.target.files[0]);
  };

  // Handle respiratory test analysis
  const handleRespiratoryTestAnalysis = async () => {
    if (!audioFile) {
      alert('Please upload a .wav file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', audioFile);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/predict/respiratory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Respiratory API Response:', response.data); // Log the full response
      setRespiratoryPrediction(response.data.predicted_disease); // Set the prediction state
    } catch (error) {
      console.error('Error fetching respiratory prediction:', error.response || error);
      alert('Error fetching respiratory prediction. Please try again.');
    }
  };

  // Handle heart disease prediction
  const handleHeartPrediction = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/predict/heart', heartData);
      console.log('Heart API Response:', response.data);
      setHeartPrediction(response.data.result); // Adjust this if your response structure is different
    } catch (error) {
      console.error('Error fetching heart disease prediction:', error.response || error);
      alert('Error fetching heart disease prediction: ' + (error.response ? error.response.data : 'Please try again.'));
    }
  };
  

  // Handle diabetes prediction
  const handleDiabetesPrediction = async () => {
    console.log('Diabetes data to be sent:', diabetesData); // Log the data
    try {
        const response = await axios.post('http://127.0.0.1:5000/api/predict/diabetes', diabetesData);
        console.log('Diabetes API Response:', response.data);
        setDiabetesPrediction(response.data.result);
    } catch (error) {
        console.error('Error fetching diabetes prediction:', error.response || error);
        alert('Error fetching diabetes prediction. Please try again.');
    }
};


  // Handle input changes for heart disease
  const handleHeartChange = (e) => {
    const { name, value } = e.target;
    setHeartData({ ...heartData, [name]: value });
  };

  // Handle input changes for diabetes
  const handleDiabetesChange = (e) => {
    const { name, value } = e.target;
    setDiabetesData({ ...diabetesData, [name]: value });
  };

  // Navigate to book an appointment
  const handleBookAppointment = () => {
    navigate('/BookAppointment');
  };

  return (
    <div className="predictive-health">
      <h1>Predictive Health Monitoring</h1>

      <div className="upload-audio">
        <h2>Upload Your Breathing Audio (.wav file)</h2>
        <input type="file" accept=".wav" onChange={handleAudioUpload} />
      </div>

      <button onClick={handleRespiratoryTestAnalysis}>Test Respiratory Analysis</button>

      {respiratoryPrediction && (
        <div className="results">
          <h3>Respiratory Prediction Result</h3>
          <p>{respiratoryPrediction}</p> {/* Display predicted disease */}
        </div>
      )}

      <div className="heart-disease-input">
        <h2>Heart Disease Prediction</h2>
        {Object.keys(heartData).map((key) => (
          <div key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              type="text"
              name={key}
              value={heartData[key]}
              onChange={handleHeartChange}
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
        <button onClick={handleHeartPrediction}>Predict Heart Disease</button>
      </div>

      {heartPrediction && (
        <div className="results">
          <h3>Heart Disease Prediction Result</h3>
          <p>{heartPrediction}</p> {/* Display predicted heart disease */}
        </div>
      )}

      <div className="diabetes-input">
        <h2>Diabetes Prediction</h2>
        {Object.keys(diabetesData).map((key) => (
          <div key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              type="text"
              name={key}
              value={diabetesData[key]}
              onChange={handleDiabetesChange}
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
        <button onClick={handleDiabetesPrediction}>Predict Diabetes</button>
      </div>

      {diabetesPrediction && (
        <div className="results">
          <h3>Diabetes Prediction Result</h3>
          <p>{diabetesPrediction}</p> {/* Display predicted diabetes */}
        </div>
      )}

      <button onClick={handleBookAppointment}>Book an Appointment</button>
    </div>
  );
}

export default PredictiveHealth;
