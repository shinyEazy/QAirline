import { Passenger } from "./passenger";

export interface BookingPayload {
  user_id: number | null; // Will be filled using token
  number_of_adults: number;
  number_of_children: number;
  flight_class: string | null;
  cancelled: boolean;
  flight_id: number | null;
  passengers: Passenger[];
}
