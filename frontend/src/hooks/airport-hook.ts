import axios from './axios-config';
import { AirportCreateData, AirportUpdateData } from 'types/airport';
// Define the interface for creating an airport

// Fetch a specific airport by airport_id
export async function getAirport(airport_id: number) {
  try {
    const response = await axios.get(`/api/airports/${airport_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching airport", error);
    throw error;
  }
}

// Create a new airport
export async function createAirport(airportData: AirportCreateData) {
  try {
    const response = await axios.post("/api/airports/", airportData);
    return response.data;
  } catch (error) {
    console.error("Error creating airport", error);
    throw error;
  }
}

// Update an existing airport by airport_id
export async function updateAirport(airport_id: number, airportData: AirportUpdateData) {
  try {
    const response = await axios.put(`/api/airports/${airport_id}`, airportData);
    return response.data;
  } catch (error) {
    console.error("Error updating airport", error);
    throw error;
  }
}

// Delete an airport by airport_id
export async function deleteAirport(airport_id: number) {
  try {
    const response = await axios.delete(`/api/airports/${airport_id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting airport", error);
    throw error;
  }
}
