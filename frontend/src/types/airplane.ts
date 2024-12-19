export interface Airplanes {
  airplane_id: number;
  airplane_model: string;
  registration_number: string;
  manufacturer: string;
  total_seats: number;
  active: boolean;
}

export interface AirplaneModel {
  airplane_model_id: number;
  manufacturer: string;
  name: string;
  total_seats: number;
}
