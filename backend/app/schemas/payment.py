from datetime import datetime
from typing import Optional
from .base import SchemaModel


class Payment(SchemaModel):
    payment_id: int
    transaction_date_time: datetime
    amount: float
    currency: str
    payment_method: str
    status: str
    booking_id: int


class PaymentCreate(SchemaModel):
    transaction_date_time: Optional[datetime]
    amount: Optional[float]
    currency: str = "USD"
    payment_method: str
    booking_id: int
