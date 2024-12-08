from datetime import datetime
from typing import List, Optional
from .base import SchemaModel
from .airplane import AirplaneBase as Airplane
from .flight_seat import FlightSeatsBase as FlightSeats, FlightSeatsCreate


class FlightBase(SchemaModel):
    flight_id: int
    flight_number: str
    estimated_departure_time: datetime
    actual_departure_time: Optional[datetime]
    estimated_arrival_time: datetime
    actual_arrival_time: Optional[datetime]
    destination_airport_id: int
    status: str
    airplane: Airplane


class FlightCreate(SchemaModel):
    flight_number: str
    registration_number: str
    estimated_departure_time: datetime
    estimated_arrival_time: datetime
    destination_airport_id: int
    status: str = (
        "Scheduled"  # Trạng thái chuyến bay, ví dụ: "Scheduled", "In-Flight", "Landed".
    )

    flight_seats: List[FlightSeatsCreate]


class FlightUpdate(SchemaModel):
    estimated_departure_time: datetime
    actual_departure_time: Optional[datetime]
    estimated_arrival_time: datetime
    actual_arrival_time: Optional[datetime]
    status: str


class FlightDelay(SchemaModel):
    flight_id: int
    actual_departure_time: Optional[datetime]
    actual_arrival_time: Optional[datetime]
    status: str
