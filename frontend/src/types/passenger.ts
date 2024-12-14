export interface Passenger {
    citizen_id: string;
    passport_number: string;
    gender: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    nationality: string;
    date_of_birth: string;
    seat_row: number;
    seat_col: string;
}
export interface PassengerResponse {
    passenger: Passenger;
    flight_class: string;
}

export interface NewPassenger {
    flight_class: string;
    citizen_id: string;
    passport_number: string;
    gender: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    nationality: string;
    date_of_birth: string;
    seat_row: number;
    seat_col: string;
}