from datetime import datetime
from typing import List, Optional
from .base import SchemaModel
from .airplane import AirplaneBase as Airplane
from .flight_seat import FlightSeatsBase as FlightSeats


class Flight(SchemaModel):
    flight_id: int
    estimated_departure_time: datetime
    actual_departure_time: Optional[datetime]
    estimated_arrival_time: datetime
    actual_arrival_time: Optional[datetime]
    destination_airport_id: int
    status: str
    airplane: Airplane
    flight_seats: List[FlightSeats]


class FlightCreate(SchemaModel):
    airplane_id: int
    estimated_departure_time: datetime
    estimated_arrival_time: datetime
    destination_airport_id: int
    status: str = (
        "Scheduled"  # Trạng thái chuyến bay, ví dụ: "Scheduled", "In-Flight", "Landed".
    )


class FlightUpdate(SchemaModel):
    estimated_departure_time: datetime
    actual_departure_time: Optional[datetime]
    estimated_arrival_time: datetime
    actual_arrival_time: Optional[datetime]
    status: str
