from .base import SchemaModel
from models import FlightClass


class FlightSeats(SchemaModel):
    flight_seats_id: int
    flight_id: int
    flight_class: FlightClass
    available_seats: int
