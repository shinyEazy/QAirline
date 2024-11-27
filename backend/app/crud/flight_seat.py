from sqlalchemy.orm import Session
from schemas import FlightSeatCreate, FlightSeatUpdate
from .crud_utils import *
from models import FlightSeats

def create_flight_seat(db: Session, flight_seat: FlightSeatCreate):
    return create(FlightSeats, db, flight_seat.model_dump())

def get_flight_seat_by_flight_id(db: Session, flight_id: int):
    return db.query(FlightSeats).filter(FlightSeats.flight_id == flight_id).all()

def update_flight_seat(db: Session, db_flight_seat:FlightSeats,flight_seat:FlightSeatUpdate):
    return update(db_flight_seat, db, flight_seat.model_dump())

def get_flight_seat_by_flight_id_and_class(db: Session, flight_id: int, flight_class: str):
    return db.query(FlightSeats).filter(
        FlightSeats.flight_id == flight_id,
        FlightSeats.flight_class == flight_class
    ).first()