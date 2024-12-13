from typing import Optional

from app.schemas.flight_seat import FlightSeatsBase
from .base import SchemaModel
from datetime import datetime
from pydantic import Field


class PassengerBase(SchemaModel):
    citizen_id: str = Field(..., description="Unique citizen identifier")
    passport_number: Optional[str] = Field(None, description="Optional passport number")
    gender: bool = Field(..., description="TRUE for male, FALSE for female")
    phone_number: str = Field(..., description="Passenger's phone number")
    first_name: str = Field(..., description="Passenger's first name")
    last_name: str = Field(..., description="Passenger's last name")
    nationality: str = Field(..., description="Passenger's nationality")
    date_of_birth: datetime = Field(..., description="Passenger's date of birth")
    seat_row: int = Field(..., description="Seat row number")
    seat_col: str = Field(..., description="Seat column identifier (e.g., A, B, C)")


class PassengerCreate(PassengerBase):
    booking_id: str = Field(..., description="Associated booking ID")


class PassengerRead(PassengerBase):
    passenger_id: int


class PassengerUpdate(SchemaModel):
    passport_number: Optional[str] = Field(None, description="Optional passport number")
    gender: bool = Field(..., description="TRUE for male, FALSE for female")
    phone_number: str = Field(..., description="Passenger's phone number")
    first_name: str = Field(..., description="Passenger's first name")
    last_name: str = Field(..., description="Passenger's last name")
    nationality: str = Field(..., description="Passenger's nationality")
    date_of_birth: datetime = Field(..., description="Passenger's date of birth")
    seat_row: int = Field(..., description="Seat row number")
    seat_col: str = Field(..., description="Seat column identifier (e.g., A, B, C)")
