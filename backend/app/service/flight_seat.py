from sqlalchemy.orm import Session
from app.schemas import FlightSeatsCreate, FlightSeatsUpdate
from .crud_utils import *
from app.models import FlightSeats, Flight, Airplane


def create_flight_seat(db: Session, flight_seat: FlightSeatsCreate) -> FlightSeats:
    return create(FlightSeats, db, flight_seat.model_dump())


def get_flight_seat_by_flight_id_and_class(
    db: Session, flight_id: int, flight_class: str
) -> FlightSeats:
    airplane = db.query(Flight).filter(Flight.flight_id == flight_id).first()
    return (
        db.query(FlightSeats)
        .filter(
            FlightSeats.registration_number == airplane.registration_number,
            FlightSeats.flight_class == flight_class,
        )
        .first()
    )


def update_flight_seat(
    db: Session, db_flight_seat: FlightSeats, flight_seat: FlightSeatsUpdate
) -> FlightSeats:
    return update(db_flight_seat, db, flight_seat.model_dump())
