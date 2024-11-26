from schemas import PassengerCreate
from models import Passenger
from sqlalchemy.orm import Session
from .crud_utils import *


def create_passenger(passenger: PassengerCreate, db: Session) -> Passenger:
    """
    Equivalent to a SQL query that is 'INSERT INTO passengers values ()'
    """

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

    return create(Passenger, db, passenger.dict())


def get_passenger(passenger_id: int, db: Session) -> Passenger:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table passengers where passengers.passenger_id = passenger_id'
    """

    db_passenger = (
        db.query(Passenger).filter(Passenger.passenger_id == passenger_id).first()
    )

    # if not db_passenger:
    #     raise HTTPException(status_code=404, detail="Passenger not found")

    return db_passenger
