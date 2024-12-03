from app.core.security import role_checker
from crud.flight_seat import get_flight_seat_by_flight_id_and_class
from crud.booking import get_booking
from app.schemas import PaymentCreate
from app.models import Booking
from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException, Depends
from core.database import get_db
from crud.payment import create_payment

router = APIRouter(prefix="/payment", tags=["Payment"])


@router.post("/", dependencies=[Depends(role_checker(["user"]))])
def create_payment_end_point(payment: PaymentCreate, db: Session = Depends(get_db)):
    print(f"Received payment request hello: {payment}")
    print(f"Database session: {db}")

    db_booking = get_booking(payment.booking_id, db)
    print(f"Booking found: {db_booking}")
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    # calculate the price
    total_price = calculate_price(db_booking, db)
    print(f"Total price calculated: {total_price}")
    # Create the payment
    payment_data = payment.model_dump()
    payment_data["amount"] = total_price
    db_payment = create_payment(PaymentCreate(**payment_data), db)
    print(f"Payment created: {db_payment}")
    return db_payment


def calculate_price(db_booking: Booking, db: Session) -> float:
    # Get flight seat information to determine the price
    flight_seat = get_flight_seat_by_flight_id_and_class(
        db, db_booking.flight_id, db_booking.flight_class
    )

    price_per_adult = flight_seat.flight_price
    price_per_child = price_per_adult * flight_seat.child_multiplier
    total_price = (db_booking.number_of_adults * price_per_adult) + (
        db_booking.number_of_children * price_per_child
    )

    return total_price
