from sqlalchemy.orm import Session
from schemas import FlightCreate, FlightUpdate
from .crud_utils import *
from models import Flight, Airplane, Passenger, Booking
from typing import List


# CRUD for Flight
def create_flight(db: Session, flight: FlightCreate) -> Flight:
    # Lấy máy bay từ database
    airplane = (
        db.query(Airplane).filter(Airplane.airplane_id == flight.airplane_id).first()
    )

    flight_data = flight.model_dump()
    flight_data["departure_airport_id"] = airplane.current_airport_id
    return create(Flight, db, flight_data)


def get_flight(db: Session, flight_id: int) -> Flight:
    db_flight = db.query(Flight).filter(Flight.flight_id == flight_id).first()
    return db_flight


def update_flight(db: Session, db_flight: Flight, flight: FlightUpdate) -> Flight:
    return update(db_flight, db, flight.model_dump())


def delete_flight(db: Session, db_flight: Flight) -> Flight:
    return delete(db_flight, db)


def get_all_passenger_in_flight(flight_id: int, db: Session) -> List[Passenger]:
    """
    Get all passengers in a given flight
    """
    passengers = (
        db.query(Passenger)
        .join(Booking, Booking.booking_id == Passenger.booking_id)
        .filter(Booking.flight_id == flight_id)
        .all()
    )

    return passengers


def get_flight_by_citizen_id(citizen_id: str, db: Session) -> Flight:
    db_flight = (
        db.query(Flight)
        .join(Passenger)  # Join the Passenger model to filter by citizen_id
        .filter(Passenger.citizen_id == citizen_id)  # Filter by the citizen_id
        .first()  # Get the first result
    )
    return db_flight
