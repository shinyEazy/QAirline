from sqlalchemy.orm import Session
import models, schemas
from datetime import datetime
from fastapi import HTTPException

# Helper functions for create booking


def get_booking_by_passenger_id(passenger_id: int, db: Session) -> models.Booking:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table booking where booking.passenger_id = passenger_id'
    """

    db_booking = (
        db.query(models.Booking)
        .filter(models.Booking.passenger_id == passenger_id)
        .first()
    )

    return db_booking


def get_booking_by_flight_id(flight_id: int, db: Session) -> models.Booking:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table booking where booking.flight_id == flight_id'
    """

    db_booking = (
        db.query(models.Booking).filter(models.Booking.flight_id == flight_id).first()
    )

    return db_booking


def get_booking(booking_id: int, db: Session) -> models.Booking:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table booking where booking.booking_id = booking_id'
    """

    db_booking = (
        db.query(models.Booking).filter(models.Booking.booking_id == booking_id).first()
    )

    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return db_booking


def create_booking(booking: schemas.BookingCreate, db: Session) -> models.Booking:
    """
    Equivalent to a SQL query that is 'INSERT INTO booking values ()'
    When creating the booking, we need to ensure that the passenger_id and flight_id are valid
    The flight_class enums in the data has already been validated by pydantic, but the format needs to be like this:
    'Economy' or 'Business' or 'First'
    """

    if not get_booking_by_passenger_id(booking.passenger_id, db):
        raise HTTPException(status_code=404, detail="Referenced passenger not found")

    if not get_booking_by_flight_id(booking.flight_id, db):
        raise HTTPException(status_code=404, detail="Referenced flight not found")

    db_booking = models.Booking(**booking.dict())

    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)

    return db_booking
