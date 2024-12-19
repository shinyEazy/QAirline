from schemas.flight import FlightCreate
from schemas.flight_seat import FlightSeatsCreate
from service.flight_seat import create_flight_seat
from service.service_utils import conint
from sqlalchemy.orm import Session, joinedload
from app.schemas import (
    AirplaneModelCreate,
    AirplaneModelUpdate,
    AirplaneCreate,
    AirplaneUpdate,
    AirplaneInfo,
)
from .crud_utils import *
from app.models import AirplaneModel, Airplane, Airport, Flight
from typing import Dict, List


# CRUD for AirplaneModel
def create_airplane_model(
    db: Session, airplane_model: AirplaneModelCreate
) -> AirplaneModel:
    return create(AirplaneModel, db, airplane_model.model_dump())


def get_airplane_model(db: Session, airplane_model_id: int) -> AirplaneModel:
    db_airplane_model = (
        db.query(AirplaneModel)
        .filter(AirplaneModel.airplane_model_id == airplane_model_id)
        .first()
    )
    return db_airplane_model


def update_airplane_model(
    db: Session, db_airplane_model: Airplane, airplane_model: AirplaneModelUpdate
) -> AirplaneModel:
    return update(db_airplane_model, db, airplane_model.model_dump())


def delete_airplane_model(
    db: Session, db_airplane_model: AirplaneModel
) -> AirplaneModel:
    return delete(db_airplane_model, db)


# CRUD for Airplane
def create_airplane(db: Session, airplane: AirplaneCreate) -> Airplane:
    airplane_model_dump = airplane.model_dump(exclude={"flight_seats"})
    db_airplane = create(Airplane, db, airplane_model_dump)
    create_flight_seats_for_airplane(airplane, db_airplane, db)
    return db_airplane


def get_airplane_by_registration_number(
    db: Session, registration_number: str
) -> Airplane:
    db_airplane = (
        db.query(Airplane)
        .filter(Airplane.registration_number == registration_number)
        .first()
    )
    return db_airplane


def get_airplane_by_id(db: Session, airplane_id: int) -> Airplane:
    db_airplane = db.query(Airplane).filter(Airplane.airplane_id == airplane_id).first()
    return db_airplane


def get_all_airplanes(db: Session) -> List[Dict[str, any]]:
    db_airplanes = db.query(Airplane).join(AirplaneModel).all()
    result = []
    for airplane in db_airplanes:
        result.append(
            {
                "airplane_id": airplane.airplane_id,
                "airplane_model": airplane.airplane_model.name,
                "registration_number": airplane.registration_number,
                "manufacturer": airplane.airplane_model.manufacturer,
                "total_seats": airplane.airplane_model.total_seats,
                "active": airplane.active,
            }
        )
    return result


def update_airplane(
    db: Session, db_airplane: Airplane, airplane: AirplaneUpdate
) -> Airplane:
    return update(db_airplane, db, airplane.model_dump())


# def update_airplane_location(
#     db: Session, db_airplane: Airplane, airport_id: int
# ) -> Airplane:
#     db_airplane.current_airport_id = airport_id
#     return update(db_airplane, db, db_airplane.model_dump())


def delete_airplane(db: Session, db_airplane: Airplane) -> Airplane:
    return delete(db_airplane, db)


# def get_airplane_by_city(db: Session, city: str) -> List[AirplaneInfo]:
#     # Find airport by city
#     print(f"Searching for airport in city: '{city}'")
#     airport = db.query(Airport).filter(Airport.city == city).first()
#     print(f"airport co ket qua: {Airport.city}")
#     if not airport:
#         return []

#     # Find airplanes by airport id
#     airplanes = (
#         db.query(Airplane)
#         .options(joinedload(Airplane.airplane_model))
#         .filter(Airplane.current_airport_id == airport.airport_id)
#         .all()
#     )

#     # Convert to AirplaneInfo
#     result = [
#         AirplaneInfo(
#             registration_number=airplane.registration_number,
#             airplane_model_name=airplane.airplane_model.name,
#         )
#         for airplane in airplanes
#     ]
#     return result


def create_flight_seats_for_airplane(
    airplane: AirplaneCreate, db_airplane: Airplane, db: Session
):
    flight_seats: List[FlightSeatsCreate] = airplane.flight_seats

    for flight_seat in flight_seats:
        flight_seat.registration_number = db_airplane.registration_number
        create_flight_seat(db, flight_seat)

    return {"message": "flight successfully created"}
