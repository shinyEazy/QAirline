from datetime import datetime
from .base import SchemaModel


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
