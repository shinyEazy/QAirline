import axios from './axios-config';
import { PassengerCreateData, PassengerUpdateData } from 'types/passenger';

// Example usage of the interfaces in functions
export async function createPassenger(passengerData: PassengerCreateData) {
  try {
    const response = await axios.post("/api/passenger/", passengerData);
    return response.data;
  } catch (error) {
    console.error("Error creating passenger", error);
    throw error;
  }
}

export async function updatePassenger(citizen_id: string, passengerData: PassengerUpdateData) {
  try {
    const response = await axios.put(`/api/passenger/${citizen_id}`, passengerData);
    return response.data;
  } catch (error) {
    console.error("Error updating passenger", error);
    throw error;
  }
}
// Fetch a specific passenger by citizen_id
export async function getPassenger(citizen_id: string) {
  try {
    const response = await axios.get(`/api/passenger/${citizen_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching passenger", error);
    throw error;
  }
}

// Get a passenger by citizen_id and flight_id
export async function getPassengerByFlight(citizen_id: string, flight_id: number) {
  try {
    const response = await axios.get(`/api/passenger/${citizen_id}/${flight_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching passenger for flight", error);
    throw error;
  }
}

// Delete a passenger by citizen_id and flight_id
export async function deletePassenger(citizen_id: string, flight_id: number) {
  try {
    const response = await axios.delete(`/api/passenger/${citizen_id}/${flight_id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting passenger", error);
    throw error;
  }
}

// Get all passengers
export async function getAllPassengers() {
  try {
    const response = await axios.get("/api/passenger/");
    return response.data;
  } catch (error) {
    console.error("Error fetching all passengers", error);
    throw error;
  }
}
