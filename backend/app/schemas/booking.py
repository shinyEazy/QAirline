from datetime import datetime
from typing import Optional, List
from .base import SchemaModel
from .passenger import PassengerCreate, PassengerBase


class BookingBase(SchemaModel):
    user_id: Optional[int] = None
    number_of_adults: int
    number_of_children: int
    flight_class: str  # Assuming `FlightClass` is an enum
    cancelled: Optional[bool] = False
    flight_id: int


class BookingCreate(BookingBase):
    passengers: List[PassengerBase]


class BookingUpdate(SchemaModel):
    number_of_adults: int
    number_of_children: int
    flight_class: str  # Assuming `FlightClass` is an enum
    cancelled: Optional[bool] = False
    flight_id: int
    booking_date: datetime
