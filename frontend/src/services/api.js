import axios from 'axios';

const API_BASE = '/api/nda';

export const checkNdaAI = async (text, jwt) => {
  try {
    const headers = jwt ? { Authorization: `Bearer ${jwt}` } : {};
    const response = await axios.post(`${API_BASE}/check-ai`, { text }, { headers });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server returned an error response
      const errorMessage = error.response.data?.message || 
                          error.response.data?.error || 
                          `Server error: ${error.response.status}`;
      throw new Error(errorMessage);
    } else if (error.request) {
      // Network request failed
      throw new Error('No response from server. Please check if the backend is running.');
    } else {
      // Other error occurred
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};