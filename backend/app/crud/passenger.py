from schemas.passenger import PassengerCreate, PassengerUpdate
from models import Passenger
from sqlalchemy.orm import Session
from .crud_utils import *


def create_passenger(passenger: PassengerCreate, db: Session) -> Passenger:
    """
    Equivalent to a SQL query that is 'INSERT INTO passengers values ()'
    """

    return create(Passenger, db, passenger.dict())


def get_passenger(passenger_id: int, db: Session) -> Passenger:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table passengers where passengers.passenger_id = passenger_id'
    """

    db_passenger = (
        db.query(Passenger).filter(Passenger.passenger_id == passenger_id).first()
    )

    return db_passenger


def update_passenger(
    db_passenger: Passenger, passenger: PassengerUpdate, db: Session
) -> Passenger:
    """
    Equivalent to a SQL query that is 'UPDATE table passengers where passengers.passenger_id = passenger_id'
    """

    return update(db_passenger, db, passenger.dict())


def delete_passenger(db_passenger: Passenger, db: Session) -> Passenger:
    """
    Equivalent to a SQL query that is 'DELETE FROM table passengers where passengers.passenger_id = passenger_id'
    """

    return delete(db_passenger, db)
