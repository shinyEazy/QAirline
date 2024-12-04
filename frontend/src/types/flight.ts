export type Flight = {
    flight_id: number;
    airplane_id: number;
    actual_departure_time: string; // ISO 8601 format
    estimated_arrival_time: string; // ISO 8601 format
    departure_airport_id: number;
    status: string;
    estimated_departure_time: string; // ISO 8601 format
    actual_arrival_time: string; // ISO 8601 format
    destination_airport_id: number;
};
