from datetime import datetime
from app.core.security import role_checker
from service.flight import get_flight_price
from service.flight_seat import get_flight_seat_by_flight_id_and_class
from service.booking import get_booking
from app.schemas import PaymentCreate
from app.models import Booking, FlightClass
from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException, Depends, status
from core.database import get_db
from service.payment import create_payment, get_payment_by_booking

router = APIRouter(prefix="/payment", tags=["Payment"])


@router.post("/{booking_id}")
def create_payment_end_point(booking_id: str, db: Session = Depends(get_db)):
    # Get booking information

    if get_payment_by_booking(booking_id, db):
        raise HTTPException(status_code=400, detail="Already paid")
    db_booking = get_booking(booking_id, db)
    print(f"Booking found: {db_booking}")
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    # calculate the price
    total_price = calculate_price(db_booking, db)
    print(f"Total price calculated: {total_price}")
    # Create the payment
    payment_data = {
        "transaction_date_time": datetime.now(),
        "amount": total_price,
        "currency": "USD",
        "payment_method": "Online",
        "booking_id": booking_id,
        "status": "Paid",
    }

    db_payment = create_payment(PaymentCreate(**payment_data), db)
    print(f"Payment created: {db_payment}")
    return db_payment


def calculate_price(db_booking: Booking, db: Session) -> float:
    # Get flight seat information to determine the price
    flight_seat = get_flight_seat_by_flight_id_and_class(
        db, db_booking.flight_id, db_booking.flight_class
    )
    flight_price = get_flight_price(db_booking.flight_id, db_booking.flight_class, db)
    price_per_adult = flight_price
    price_per_child = price_per_adult * flight_seat.child_multiplier
    total_price = (db_booking.number_of_adults * price_per_adult) + (
        db_booking.number_of_children * price_per_child
    )

    return total_price
