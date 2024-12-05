import axios from './axios-config'

export async function fetchFlights() {
  try {
    const response = await axios.get("/api/flights");

    const flights = response.data;

    return flights;
  }
  catch (error) {
    console.error("Error fetching flights", error);
    throw error;
  }
} 
