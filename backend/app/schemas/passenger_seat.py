from pydantic import BaseModel, Field
from .base import SchemaModel


class PassengerSeatBase(SchemaModel):
    row_seat: int = Field(
        ..., description="Row number of the seat, must be greater than 0"
    )
    col_seat: int = Field(
        ..., description="Column number of the seat, must be greater than 0"
    )


class PassengerSeatCreate(PassengerSeatBase):
    passenger_id: int
