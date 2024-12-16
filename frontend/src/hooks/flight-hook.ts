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

export async function updateFlight(flightId: number, flightData: {
  registration_number: string;
  estimated_departure_time: string;
  actual_departure_time: string;
  estimated_arrival_time: string;
  actual_arrival_time: string;
  flight_price: number;
  status: string;
}) {

  try {
    flightData.actual_departure_time = flightData.estimated_departure_time;
    flightData.actual_arrival_time = flightData.estimated_arrival_time;
    const response = await axios.put(`/api/flights/${flightId}`, flightData);
    return response.data;
  } catch (error) {
    console.error("Error updating flight", error);
    throw error;
  }
}
export async function fetchFlightSeats(flight_id: number) {
  try {
    const response = await axios.get(`/api/flights/flight-seats/${flight_id}`);

    const flights_matrix = response.data;

    return flights_matrix;
  } catch (error) {
    console.error("Error fetching flights matrix", error);
    throw error;

  }
}

// export async function getAvailableSeats(flight_id: number) {
//   try {
//     const response = await axios.get(`/api/flights/flight-seats-available/${flight_id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching available seats", error);
//     throw error;
//   }
// }
