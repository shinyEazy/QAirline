from sqlalchemy.orm import Session
from app.schemas import FlightSeatsCreate, FlightSeatsUpdate
from .crud_utils import *
from app.models import FlightSeats


def create_flight_seat(db: Session, flight_seat: FlightSeatsCreate) -> FlightSeats:
    return create(FlightSeats, db, flight_seat.model_dump())


def get_flight_seat_by_flight_id(db: Session, flight_id: int) -> FlightSeats:
    return db.query(FlightSeats).filter(FlightSeats.flight_id == flight_id).first()


def get_flight_seat_by_flight_id_and_class(
    db: Session, flight_id: int, flight_class: str
) -> FlightSeats:
    return (
        db.query(FlightSeats)
        .filter(
            FlightSeats.flight_id == flight_id, FlightSeats.flight_class == flight_class
        )
        .first()
    )


def update_flight_seat(
    db: Session, db_flight_seat: FlightSeats, flight_seat: FlightSeatsUpdate
) -> FlightSeats:
    return update(db_flight_seat, db, flight_seat.model_dump())
