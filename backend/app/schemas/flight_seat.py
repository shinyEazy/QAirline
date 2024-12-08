from .base import SchemaModel


class FlightSeatsBase(SchemaModel):
    flight_seats_id: int
    flight_id: int
    flight_class: str
    flight_price: float
    child_multiplier: float


class FlightSeatsCreate(SchemaModel):
    flight_id: int
    flight_class: str
    flight_price: float
    child_multiplier: float
    max_row_seat: int
    max_col_seat: str


class FlightSeatsUpdate(SchemaModel):
    flight_class: str
    flight_price: float
    child_multiplier: float
    max_row_seat: int
    max_col_seat: str
