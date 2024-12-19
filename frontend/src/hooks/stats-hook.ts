import axios from './axios-config';
export async function fetchStats() {
  try {
    const response = await axios.get(`/api/passenger/ticket/count/`);
    console.log("Response", response.data);
    return response.data;
  } catch (error) {
    console.error("Request error", error);
  }
}

