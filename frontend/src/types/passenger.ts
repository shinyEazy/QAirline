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

export let defaultPassenger: Passenger = {
  citizen_id: null as unknown as string,
  passport_number: null as unknown as string,
  gender: null as unknown as string,
  phone_number: null as unknown as string,
  first_name: null as unknown as string,
  last_name: null as unknown as string,
  nationality: null as unknown as string,
  date_of_birth: null as unknown as string,
  seat_row: null as unknown as number,
  seat_col: null as unknown as string,
};

export function updatePassengerSeat(
  passenger: Passenger,
  seatID: string
): Passenger {
  return {
    ...passenger, // Preserve other properties
    seat_row: Number(seatID.slice(0, -1)), // Update seat_row
    seat_col: seatID.slice(-1), // Update seat_col
  };
}
