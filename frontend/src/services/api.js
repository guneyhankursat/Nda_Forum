import axios from 'axios';

const API_BASE = 'http://localhost:3000/nda';

export const checkNdaAI = async (text) => {
  try {
    const response = await axios.post(`${API_BASE}/check-ai`, { text });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.message || 
                          error.response.data?.error || 
                          `Server error: ${error.response.status}`;
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('No response from server. Please check if the backend is running.');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};