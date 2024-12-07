from typing import List
from app.schemas.passenger import PassengerCreate, PassengerUpdate, PassengerBase

from app.models import Passenger, Flight
from sqlalchemy.orm import Session
from .crud_utils import *


def create_passenger(passenger: PassengerCreate, db: Session) -> Passenger:
    """
    Equivalent to a SQL query that is 'INSERT INTO passengers values ()'
    """

    return create(Passenger, db, passenger.dict())


def get_passenger(citizen_id: str, db: Session) -> Passenger:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table passengers where passengers.citizen_id = citizen_id'
    """

    db_passenger = (
        db.query(Passenger).filter(Passenger.citizen_id == citizen_id).first()
    )

    return db_passenger


def get_passenger_by_flight(citizen_id: str, flight_id: int, db: Session) -> Passenger:
    db_passenger = (
        db.query(Passenger)
        .join(Flight)  # Join the Flight model to filter by flight_id
        .filter(
            Passenger.citizen_id == citizen_id, Flight.flight_id == flight_id
        )  # Both filters
        .first()
    )
    return db_passenger


def update_passenger(
    db_passenger: Passenger, passenger: PassengerUpdate, db: Session
) -> Passenger:
    """
    Equivalent to a SQL query that is 'UPDATE table passengers where passengers.citizen_id = citizen_id'
    """

    return update(db_passenger, db, passenger.dict())


def delete_passenger(db_passenger: Passenger, db: Session) -> Passenger:
    """
    Equivalent to a SQL query that is 'DELETE FROM table passengers where passengers.citizen_id = citizen_id'
    """

    return delete(db_passenger, db)


def delete_passengers(db_passengers: List[Passenger], db: Session) -> List[Passenger]:
    """
    Equiv .. , delete all passengers
    """

    for passenger in db_passengers:
        delete_passenger(passenger, db)

    return db_passengers


def get_all_passengers(db: Session):
    return get_all_passengers(db)