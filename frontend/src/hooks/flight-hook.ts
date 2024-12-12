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

export async function createFlight(flightData: {
  flight_number: string;
  registration_number: string;
  estimated_departure_time: string;
  estimated_arrival_time: string;
  destination_airport_id: number;
  flight_price: number;
  status: string;
}) {
  try {
    const response = await axios.post("/api/flights/", flightData);
    return response.data;
  } catch (error) {
    console.error("Error creating flight", error);
    throw error;
  }
}

export async function fetchAirplanes() {
  try {
    const response = await axios.get(`/api/airplanes`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch airplanes", error);
    throw error;
  }
}