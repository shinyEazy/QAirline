from .base import SchemaModel


class FlightSeatsBase(SchemaModel):
    flight_seats_id: int
    flight_id: int
    flight_price: float
    flight_class: str
    available_seats: int

class FlightSeatsCreate(SchemaModel):
    flight_id: int
    flight_price: float
    flight_class: str
    available_seats: int

class FlightSeatsUpdate(SchemaModel):
    flight_price: float
    flight_class: str
    available_seats: int
