from datetime import datetime
from sqlalchemy.orm import Session
from schemas import FlightCreate, FlightUpdate
from .crud_utils import *
from models import Flight, Airplane, Airport


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

def get_flights_by_departure_time_and_cities(db: Session, departure_city: str, arrival_city: str, departure_time: datetime) -> Flight:
     return db.query(Flight).join(Airport, Flight.departure_airport_id == Airport.airport_id).filter(
        Flight.estimated_departure_time == departure_time,
        Airport.city == departure_city,
        Flight.destination_airport_id == Airport.airport_id,
        Airport.city == arrival_city
    ).all()

def update_flight(db: Session, db_flight: Flight, flight: FlightUpdate) -> Flight:
    return update(db_flight, db, flight.model_dump())


def delete_flight(db: Session, db_flight: Flight) -> Flight:
    return delete(db_flight, db)
