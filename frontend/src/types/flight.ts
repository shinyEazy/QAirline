export interface Flight {
    id: number;
    departureTime: string;
    arrivalTime: string;
    from: string;
    to: string;
    departure_airport_code: string;
    arrival_airport_code: string;
    seatsLeft: number;
    flightNumber: string;
    price: number;
    flightDate: string;
    flightRoute: string;
    departureDetailTime: string;
    departureAirport: string;
    arrivalDetailTime: string;
    arrivalAirport: string;
    duration: string;
    flight_seat_matrix: [string, number][];
}