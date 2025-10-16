import axios from 'axios';

// The URL for your Python ML service
const ML_SERVICE_URL = 'http://127.0.0.1:5001';

/**
 * Service to communicate with the ML service for URL scanning
 */
export async function scanURLWithML(url) {
    try {
        console.log(`[ML Service] Sending request to ${ML_SERVICE_URL}/scan with URL: ${url}`);
        // This is the key change: send a POST request with the URL in the body
        const response = await axios.post(`${ML_SERVICE_URL}/scan`, { url });
        console.log(`[ML Service] Received response:`, response.data);
        
        // The ML service already returns the data in the correct format, so just return it.
        const result = {
            url: url,
            status: response.data.label,
            score: response.data.score,
            reasons: response.data.reasons || []
        };
        console.log(`[ML Service] Transformed response:`, result);
        return result;
    } catch (error) {
        console.error('[ML Service] Error:', error.message);
        if (error.response) {
            console.error('[ML Service] Response error:', error.response.data);
            throw new Error(`ML service error: ${error.response.data.detail || error.response.data}`);
        }
        throw new Error('ML service unavailable');
    }
}