from schemas.payment import PaymentCreate
from app.models import Payment
from sqlalchemy.orm import Session
from .crud_utils import *


def create_payment(payment: PaymentCreate, db: Session) -> Payment:
    """
    Equivalent to a SQL query that is 'INSERT INTO payment values ()'
    """
    return create(Payment, db, payment.dict())


def get_payment(payment_id: int, db: Session) -> Payment:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table payment where payment.payment_id = payment_id'
    """
    db_payment = db.query(Payment).filter(Payment.payment_id == payment_id).first()
    return db_payment


def get_payment_by_booking(booking_id: int, db: Session) -> Payment:
    db_payment = db.query(Payment).filter(Payment.booking_id == booking_id).first()
    return db_payment

