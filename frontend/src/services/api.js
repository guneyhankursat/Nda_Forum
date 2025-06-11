import axios from 'axios';

const API_BASE = 'http://localhost:3000/nda';

export const checkNdaAI = async (text) => {
  try {
    const response = await axios.post(`${API_BASE}/check-ai`, { text });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Server error';
  }
};