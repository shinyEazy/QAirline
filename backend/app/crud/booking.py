import schemas
from datetime import datetime
from fastapi import HTTPException
from sqlalchemy.orm import Session
from .crud_utils import *
from models import Booking


def get_booking_by_passenger_id(passenger_id: int, db: Session) -> Booking:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table booking where booking.passenger_id = passenger_id'
    """

    db_booking = db.query(Booking).filter(Booking.passenger_id == passenger_id).first()

    return db_booking


def get_booking_by_flight_id(flight_id: int, db: Session) -> Booking:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table booking where booking.flight_id == flight_id'
    """

    db_booking = db.query(Booking).filter(Booking.flight_id == flight_id).first()

    return db_booking


def get_booking(booking_id: int, db: Session) -> Booking:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table booking where booking.booking_id = booking_id'
    """

    db_booking = db.query(Booking).filter(Booking.booking_id == booking_id).first()

    return db_booking


def create_booking(booking: schemas.BookingCreate, db: Session) -> Booking:
    """
    Equivalent to a SQL query that is 'INSERT INTO booking values ()'
    When creating the booking, we need to ensure that the passenger_id and flight_id are valid
    The flight_class enums in the data has already been validated by pydantic, but the format needs to be like this:
    'Economy' or 'Business' or 'First'
    """
    current_dict = booking.dict()
    current_dict["booking_date"] = datetime.now()
    return create(Booking, db, current_dict)


def update_booking(
    db_booking: Booking, booking: schemas.BookingUpdate, db: Session
) -> Booking:
    """
    Equivalent to a SQL query that is 'UPDATE table booking where booking.booking_id = booking_id'
    """

    return update(db_booking, db, booking.dict())


def delete_booking(db_booking: Booking, db: Session) -> Booking:
    """
    Equivalent to a SQL query that is 'DELETE FROM table booking where booking.booking_id = booking_id'
    """

    return delete(db_booking, db)
