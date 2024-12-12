from .base import SchemaModel


class FlightSeatsBase(SchemaModel):
    flight_seats_id: int
    regestration_number: str
    flight_class: str
    class_multiplier: float
    child_multiplier: float


class FlightSeatsCreate(SchemaModel):
    registration_number: str
    flight_class: str
    class_multiplier: float
    child_multiplier: float
    max_row_seat: int
    max_col_seat: str


class FlightSeatsUpdate(SchemaModel):
    flight_class: str
    class_multiplier: float
    child_multiplier: float
    max_row_seat: int
    max_col_seat: str
