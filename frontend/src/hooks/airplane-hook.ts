import axios from "./axios-config";

interface FlightSeat {
  registration_number: string;
  flight_class: string;
  class_multiplier: number;
  child_multiplier: number;
  max_row_seat: number;
  max_col_seat: string;
}

interface AirplaneData {
  airplane_model_id: number;
  registration_number: string;
  flight_seats: FlightSeat[];
}

export async function createAirplane(airplaneData: AirplaneData) {
  try {
    const response = await axios.post("/api/airplanes/", airplaneData);
    return response.data;
  } catch (error) {
    console.error("Error creating flight", error);
    throw error;
  }
}

export async function fetchAirplane() {
  try {
    const response = await axios.get("/api/airplanes");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch airplanes", error);
    throw error;
  }
}
