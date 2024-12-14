import { Passenger } from "./passenger";

export interface BookingPayload {
  booker_email: string;
  number_of_adults: number;
  number_of_children: number;
  flight_class: string | null;
  cancelled: boolean;
  flight_id: number | null;
  passengers: Passenger[];
}


