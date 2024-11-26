from typing import Optional
from .base import SchemaModel
from datetime import datetime


class PassengerBase(SchemaModel):
    passenger_id: int
    passport_number: str
    gender: bool
    phone_number: str
    first_name: str
    last_name: str
    nationality: str
    date_of_birth: datetime


class PassengerCreate(PassengerBase):
    pass


class PassengerUpdate(PassengerBase):
    passport_number: str
    gender: bool
    phone_number: str
    first_name: str
    last_name: str
    nationality: str
    date_of_birth: datetime
