from datetime import datetime
from typing import Optional
from .base import SchemaModel


class BookingCreate(SchemaModel):
    passenger_id: int
    number_of_adults: int
    number_of_children: int
    flight_class: str  # Assuming `FlightClass` is an enum
    cancelled: Optional[bool] = False
    flight_id: int


class BookingBase(BookingCreate):
    booking_date: datetime


class BookingUpdate(SchemaModel):
    number_of_adults: int
    number_of_children: int
    flight_class: str  # Assuming `FlightClass` is an enum
    cancelled: Optional[bool] = False
    flight_id: int
    booking_date: datetime
