import axios from "axios";
import { PassengerResponse } from "../types/passenger";
export async function getPassengerInFlight(flightId: number) {

    try {
        const response = await axios.get<PassengerResponse[]>(`/api/flights/passengers/${flightId}`);
        const passengers = response.data.map((item) => ({
            ...item.passenger,
            flight_class: item.flight_class,
        }));
        return passengers;
    } catch (error) {
        console.error("Error get passenger", error);
        throw error;
    }
}