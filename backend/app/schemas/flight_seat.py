from .base import SchemaModel


class FlightSeatsBase(SchemaModel):
    flight_seats_id: int
    flight_id: int
    flight_class: str
    flight_price: float
    child_multiplier: float
    available_seats: int

class FlightSeatsCreate(SchemaModel):
    flight_id: int
    flight_class: str
    flight_price: float
    child_multiplier: float
    available_seats: int

class FlightSeatsUpdate(SchemaModel):
    flight_class: str
    flight_price: float
    child_multiplier: float
    available_seats: int
