from sqlalchemy.orm import Session
import models, schemas
from datetime import datetime
from fastapi import HTTPException


def create_passenger(
    passenger: schemas.PassengerCreate, db: Session
) -> models.Passenger:
    """
    Equivalent to a SQL query that is 'INSERT INTO passengers values ()'
    """

    # guarantee that a user with this id exists
    # if not get_user(passenger.passenger_id, db):
    #     raise HTTPException(status_code=404, detail="Referenced user not found")

    # equivalent to 'db_passenger = models.Passenger(
    #     passenger_id = (passenger.passenger_id,)
    #     passport_number = (passenger.passport_number,)
    #     gender = (passenger.gender,)
    #     phone_number = (passenger.phone_number,)
    #     first_name = (passenger.first_name,)
    #     last_name = (passenger.last_name,)
    #     nationality = (passenger.nationality,)
    #     date_of_birth = (passenger.date_of_birth,)
    # )'

    db_passenger = models.Passenger(**passenger.dict())

    db.add(db_passenger)
    db.commit()
    db.refresh(db_passenger)

    return db_passenger


def get_passenger(passenger_id: int, db: Session) -> models.Passenger:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table passengers where passengers.passenger_id = passenger_id'
    """

    db_passenger = (
        db.query(models.Passenger)
        .filter(models.Passenger.passenger_id == passenger_id)
        .first()
    )

    if not db_passenger:
        raise HTTPException(status_code=404, detail="Passenger not found")

    return db_passenger


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

    # if not db_booking:
    #     raise HTTPException(status_code=404, detail="Booking not found")

    return db_booking


def create_booking(booking: schemas.BookingCreate, db: Session) -> models.Booking:
    """
    Equivalent to a SQL query that is 'INSERT INTO booking values ()'
    When creating the booking, we need to ensure that the passenger_id and flight_id are valid
    The flight_class enums in the data has already been validated by pydantic, but the format needs to be like this:
    'Economy' or 'Business' or 'First'
    """

    # if not get_booking_by_passenger_id(booking.passenger_id, db):
    #     raise HTTPException(status_code=404, detail="Referenced passenger not found")
    #
    # if not get_booking_by_flight_id(booking.flight_id, db):
    #     raise HTTPException(status_code=404, detail="Referenced flight not found")

    db_booking = models.Booking(**booking.dict())

    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)

    return db_booking
