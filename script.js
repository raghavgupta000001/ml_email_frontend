// REPLACE THIS WITH YOUR RENDER API URL
const RENDER_API_URL = "https://ml-email-class.onrender.com"; 

document.getElementById('predict-button').addEventListener('click', async () => {
    const textInput = document.getElementById('text-input').value;
    const resultBox = document.getElementById('result-box');
    resultBox.innerHTML = 'Analyzing...';
    resultBox.className = 'loading';

    if (!textInput.trim()) {
        resultBox.innerHTML = 'Please enter some text.';
        resultBox.className = 'error';
        return;
    }

    try {
        const response = await fetch(`${RENDER_API_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput }),
        });

        const result = await response.json();

        if (response.ok) {
            const label = result.prediction_label;
            
            resultBox.innerHTML = `Prediction: <strong>${label}</strong>`;
            
            if (label.toLowerCase() === 'spam') {
                resultBox.className = 'result spam';
            } else {
                resultBox.className = 'result not-spam';
            }
        } else {
            // Handle API errors (e.g., model failed to load)
            resultBox.innerHTML = `API Error: ${result.error || 'Check backend logs.'}`;
            resultBox.className = 'error';
        }
    } catch (error) {
        // Handle network errors
        resultBox.innerHTML = 'Network Error: Could not connect to the API.';
        resultBox.className = 'error';
        console.error("Fetch error:", error);
    }
});