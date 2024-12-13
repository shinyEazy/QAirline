export interface AirportCreateData {
  airport_code: string
  city: string;
  name: string;
}

// Define the interface for updating an airport
export interface AirportUpdateData extends AirportCreateData {
}

