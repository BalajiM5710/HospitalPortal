import React from 'react';
import { FaHeartbeat, FaStethoscope, FaTint } from 'react-icons/fa';
import './Records.css';

function Records() {
  const healthData = {
    bloodPressure: '90/60 mmHg',
    heartRate: 55,
    bloodOxygen: 90,
  };

  const getBarLevel = (value, maxValue) => {
    return (value / maxValue) * 100 + '%';
  };

  return (
    <div className="records">
      <h1>Health Records</h1>

      <div className="record-item">
        <FaHeartbeat className="icon" />
        <h3>Heart Rate</h3>
        <div className="bar-container">
          <div
            className="bar"
            style={{ width: getBarLevel(healthData.heartRate, 120) }}
          >
            {healthData.heartRate} bpm
          </div>
        </div>
      </div>

      <div className="record-item">
        <FaStethoscope className="icon" />
        <h3>Blood Pressure</h3>
        <div className="bar-container">
          <div
            className="bar"
            style={{ width: getBarLevel(healthData.bloodPressure.split('/')[0], 140) }}
          >
            {healthData.bloodPressure}
          </div>
        </div>
      </div>

      <div className="record-item">
        <FaTint className="icon" />
        <h3>Blood Oxygen</h3>
        <div className="bar-container">
          <div
            className="bar"
            style={{ width: getBarLevel(healthData.bloodOxygen, 100) }}
          >
            {healthData.bloodOxygen}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default Records;
