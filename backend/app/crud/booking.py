from sqlalchemy.exc import NoResultFound
from app.schemas import BookingBase, BookingUpdate
from datetime import datetime
from fastapi import HTTPException
from sqlalchemy.orm import Session
from .crud_utils import *
from app.models import Booking, Passenger
from typing import List


def get_bookings_by_flight_id(flight_id: int, db: Session) -> List[Booking]:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table booking where booking.flight_id == flight_id'
    """

    db_booking = db.query(Booking).filter(Booking.flight_id == flight_id).all()

    return db_booking


def get_booking(booking_id: int, db: Session) -> Booking:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table booking where booking.booking_id = booking_id'
    """

    db_booking = db.query(Booking).filter(Booking.booking_id == booking_id).first()

    return db_booking


def create_booking(booking: BookingBase, db: Session) -> Booking:
    """
    Equivalent to a SQL query that is 'INSERT INTO booking values ()'
    When creating the booking, we need to ensure that the passenger_id and flight_id are valid
    The flight_class enums in the data has already been validated by pydantic, but the format needs to be like this:
    'Economy' or 'Business' or 'First'
    """
    current_dict = booking.dict()
    current_dict["booking_date"] = datetime.now()
    return create(Booking, db, current_dict)


def update_booking(db_booking: Booking, booking: BookingUpdate, db: Session) -> Booking:
    """
    Equivalent to a SQL query that is 'UPDATE table booking where booking.booking_id = booking_id'
    """

    return update(db_booking, db, booking.dict())


def delete_booking(db_booking: Booking, db: Session) -> Booking:
    """
    Equivalent to a SQL query that is 'DELETE FROM table booking where booking.booking_id = booking_id'
    """

    return delete(db_booking, db)


def cancel_booking(db_booking: Booking, db: Session):
    """
    Update the specified 'Booking' cancelled field by booking_id in the database to True.
    """

    db_booking.cancelled = True  # type: ignore
    db.commit()
    db.refresh(db_booking)  # Refresh to ensure the object is up-to-date

    return {
        "message": f"Booking id {db_booking.booking_id} has been successfully cancelled"
    }


def get_passengers_in_booking(db_booking: Booking, db: Session) -> List[Passenger]:
    """
    Get all passengers in a booking by booking_id.
    """
    try:
        passengers = (
            db.query(Passenger)
            .filter(Passenger.booking_id == db_booking.booking_id)
            .all()
        )

        if not passengers:
            return []  # Return empty list if no passengers are found

        return passengers

    except NoResultFound:
        # Optionally handle case where no passengers were found
        return []


def get_users_booking(user_id: int, db: Session) -> List[Booking]:
    bookings = db.query(Booking).filter(Booking.user_id == user_id).all()

    return bookings
