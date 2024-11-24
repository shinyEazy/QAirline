from pydantic import BaseModel
from datetime import datetime
from pydantic import EmailStr
from datetime import datetime
from typing import Optional, List
from models import FlightClass


class SchemaModel(BaseModel):
    """
    Made to have easier time to apply configuration to other pydantic models
    """

    class Config:
        orm_mode = True


class PassengerBase(SchemaModel):
    passenger_id: int  # Must reference an existing User ID
    passport_number: str
    gender: bool
    phone_number: str
    first_name: str
    last_name: str
    nationality: str
    date_of_birth: datetime


class BookingBase(SchemaModel):
    passenger_id: int
    number_of_adults: int
    number_of_children: int
    flight_class: FlightClass
    cancelled: Optional[bool] = False
    flight_id: int
    booking_date: datetime


class AirplaneModel(SchemaModel):
    airplane_model_id: int
    name: str
    manufacturer: str
    total_seats: int


class Airplane(SchemaModel):
    airplane_id: int
    registration_number: str
    current_airport_code: str
    model: AirplaneModel


class Airport(SchemaModel):
    airport_code: str
    city: str
    name: str


class FlightSeats(SchemaModel):
    flight_seats_id: int
    flight_id: int
    travel_class: str
    available_seats: int


class Flight(SchemaModel):
    flight_id: int
    estimated_departure_time: datetime
    actual_departure_time: Optional[datetime]
    estimated_arrival_time: datetime
    actual_arrival_time: Optional[datetime]
    destination_airport_code: str
    status: str
    airplane: Airplane
    flight_seats: List[FlightSeats]


class Admin(SchemaModel):
    admin_id: int


class Payment(SchemaModel):
    payment_id: int
    transaction_date_time: datetime
    amount: int
    currency: str
    payment_method: str
    status: str
    booking_id: int


class PaymentCreate(SchemaModel):
    amount: int
    currency: str = "USD"
    payment_method: str
    booking_id: int


class UserCreate(SchemaModel):
    email: EmailStr
    password: str


class PassengerCreate(PassengerBase):
    pass


class BookingCreate(BookingBase):
    pass


class FlightCreate(SchemaModel):
    airplane_id: int
    estimated_departure_time: datetime
    estimated_arrival_time: datetime
    destination_airport_code: str
    status: str = "Scheduled"


class Booking(BookingBase):
    booking_id: int
    cancelled: bool
    booking_date: datetime
    payment: Optional[Payment] = None


# class Booking
