from .base import SchemaModel
from .flight_seat import FlightSeatsBase as FlightSeats, FlightSeatsCreate
from typing import List

class AirplaneModelBase(SchemaModel):
    airplane_model_id: int
    name: str
    manufacturer: str
    total_seats: int


class AirplaneModelCreate(SchemaModel):
    name: str
    manufacturer: str
    total_seats: int


class AirplaneModelUpdate(SchemaModel):
    name: str
    manufacturer: str
    total_seats: int


class AirplaneBase(SchemaModel):
    airplane_id: int
    airplane_model_id: int
    registration_number: str
    current_airport_id: int


class AirplaneCreate(SchemaModel):
    airplane_model_id: int
    registration_number: str
    current_airport_id: int
    flight_seats: List[FlightSeatsCreate]


class AirplaneUpdate(SchemaModel):
    registration_number: str
    current_airport_id: int


class AirplaneInfo(SchemaModel):
    registration_number: str
    airplane_model_name: str
