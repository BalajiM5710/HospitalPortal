import sys
import json
import pickle
import numpy as np

# Load models manually
with open(r"C:\Users\Dell\Downloads\diabetes.pkl", 'rb') as f:
    diabetes_model = pickle.load(f)

with open(r"C:\Users\Dell\Downloads\heart.pkl", 'rb') as f:
    heart_model = pickle.load(f)

def predict(model_name, input_data):
    """Make predictions using manually loaded models."""
    data = np.array(input_data).reshape(1, -1)

    if model_name == 'diabetes':
        prediction = diabetes_model.predict(data)
    elif model_name == 'heart':
        prediction = heart_model.predict(data)
    else:
        raise ValueError("Invalid model name")

    return prediction[0]

if __name__ == '__main__':
    # Read input from Node.js
    input_json = sys.argv[1]
    data = json.loads(input_json)

    model_name = data['model_name']
    input_features = data['input_features']

    # Generate prediction
    result = predict(model_name, input_features)

    # Send result back to Node.js
    print(json.dumps({'prediction': result}))
