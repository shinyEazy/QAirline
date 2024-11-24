from sqlalchemy.orm import Session
import models, schemas
from datetime import datetime
from fastapi import HTTPException


def get_user(user_id: int, db: Session) -> models.User:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table users where users.id = user_id'
    Returns models.User
    """
    db_user = db.query(models.User).filter(models.User.id == user_id).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


def get_user_by_email(user_email: str, db: Session) -> models.User:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table users where users.email = user_email'
    Returns models.User
    """
    db_user = db.query(models.User).filter(models.User.email == user_email).first()

    return db_user


def delete_user(user_id: int, db: Session) -> models.User:
    """
    Equivalent to a SQL query that is 'DELETE FROM table users where users.id = user_id'
    Returns models.User
    """

    db_user = db.query(models.User).filter(models.User.id == user_id).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(db_user)
    db.commit()

    # return the deleted object, cascade is on for passengers and admin
    return db_user


def create_user(user: schemas.UserCreate, db: Session):
    # note: Cần phải xây dựng cơ sở trước rồi sẽ tạo authentication với hashing password sau.
    """
    Equivalent to a SQL query that is 'INSERT INTO users values (user.email, user.password, datetime.now)'
    """
    if get_user_by_email(user.email, db):
        raise HTTPException(
            status_code=409, detail="A user already exists with that email"
        )
    # except when the get_user_by_email returns null then it proves there is no user with that email as such we can proceed.
    db_user = models.User(
        email=user.email, password=user.password, created_at=datetime.now()
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def create_passenger(
    passenger: schemas.PassengerCreate, db: Session
) -> models.Passenger:
    """
    Equivalent to a SQL query that is 'INSERT INTO passengers values ()'
    """

    # guarantee that a user with this id exists
    if not get_user(passenger.passenger_id, db):
        raise HTTPException(status_code=404, detail="Referenced user not found")

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


def create_booking(passenger_id: int, booking: schemas.BookingCreate, db: Session):
    """
    Equivalent to a SQL query that is 'INSERT INTO booking values ()'
    """
    db_booking = models.Booking()
