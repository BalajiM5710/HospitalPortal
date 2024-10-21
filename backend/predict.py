from flask import Flask, request, jsonify
from flask_cors import CORS
import librosa
import numpy as np
import os
import pickle
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

# Load the pre-trained respiratory model from the .h5 file
respiratory_model = load_model('respiratory_model.h5')  # Ensure your model file is correctly named

# Load the pre-trained models for diabetes and heart disease
diabetes_model = pickle.load(open('d.pkl', 'rb'))
heart_model = pickle.load(open('h.pkl', 'rb'))

# Disease names corresponding to the respiratory model's output classes
disease_names = ["COPD", "Bronchiolitis", "Pneumonia", "URTI", "Healthy"]

def stretch(data, rate):
    """Stretch the audio data by a specified rate."""
    return librosa.effects.time_stretch(data, rate=rate)

def extract_features(audio_path):
    """Extract MFCC features from the audio file."""
    # Load the audio file
    data_x, sampling_rate = librosa.load(audio_path)
    
    # Stretch the audio data
    data_x = stretch(data_x, 1.2)
    
    # Extract MFCC features and return the mean values
    features = np.mean(librosa.feature.mfcc(y=data_x, sr=sampling_rate, n_mfcc=32).T, axis=0)  # Ensure 32 features
    features = features.reshape(1, 32)  # Shape should be (1, 32) to match the model input shape
    return features

@app.route('/')
def home():
    """Home route to provide information about the API."""
    return jsonify({"message": "Welcome to the Disease Prediction API! Use the /predict endpoints for respiratory, heart, and diabetes predictions."})

@app.route('/api/predict/respiratory', methods=['POST'])
def predict_respiratory():
    """Handle the respiratory disease prediction request."""
    try:
        # Check for the audio file in the request
        audio_file = request.files['file']
        
        # Create a temporary file path
        temp_audio_path = os.path.join(os.getenv('TEMP', 'C:\\Temp'), 'uploaded_audio.wav')  # Default to 'C:\\Temp'
        
        # Save the uploaded audio file temporarily
        audio_file.save(temp_audio_path)
        
        # Extract features from the audio file
        features = extract_features(temp_audio_path)
        
        # Make prediction using the loaded respiratory model
        prediction = respiratory_model.predict(features)
        predicted_class = np.argmax(prediction)

        # Get the predicted disease name
        predicted_disease = disease_names[predicted_class] if 0 <= predicted_class < len(disease_names) else "Unknown Disease"

        # Return the prediction result as a JSON response
        return jsonify({
            'predicted_class': int(predicted_class),
            'predicted_disease': predicted_disease,
            'prediction': prediction.tolist()
        })
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/api/predict/diabetes', methods=['POST'])
def predict_diabetes():
    """Handle the diabetes prediction request."""
    try:
        data = request.json
        
        # Create a feature array with the necessary features
        features = np.array([[ 
            data['Pregnancies'], 
            data['Glucose'], 
            data['BloodPressure'], 
            data['SkinThickness'], 
            data['Insulin'], 
            data['BMI'], 
            data['DiabetesPedigreeFunction'], 
            data['Age']
        ]])
        
        # Make prediction
        prediction = diabetes_model.predict(features)[0]  # Make sure diabetes_model is defined and loaded
        result = 'Diabetes' if prediction == 1 else 'No Diabetes'
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/heart', methods=['POST'])
def predict_heart():
    """Handle the heart disease prediction request."""
    try:
        data = request.json
        features = np.array([[
            data['age'], data['sex'], data['cp'], data['trestbps'], data['chol'],
            data['fbs'], data['restecg'], data['thalach'], data['exang'],
            data['oldpeak'], data['slope'], data['ca'], data['thal']
        ]])
        prediction = heart_model.predict(features)[0]
        result = 'Heart Disease' if prediction == 1 else 'No Heart Disease'
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Run the Flask app on port 5000
    app.run(port=5000, debug=True)
