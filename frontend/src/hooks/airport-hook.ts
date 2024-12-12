import axios from './axios-config'

export async function fetchAirport() {
    try {
        const response = await axios.get(`/api/airports/`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch airplanes", error);
        throw error;
    }
}