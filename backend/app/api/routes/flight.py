from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from starlette.status import HTTP_404_NOT_FOUND
from app.core.security import role_checker
from app.models import FlightStatus
from service.airplane import get_airplane
from sqlalchemy.orm import Session
from service.flight import *
from schemas.flight import FlightCreate, FlightUpdate, FlightBase
from core.database import get_db

router = APIRouter(prefix="/flights", tags=["Flight"])

# Endpoints for Flight


@router.get("/{flight_id}", dependencies=[Depends(role_checker(["admin"]))])
async def get_flight_end_point(flight_id: int, db: Session = Depends(get_db)):
    db_flight = get_flight(db, flight_id=flight_id)
    if not db_flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    return db_flight


@router.post("/", dependencies=[Depends(role_checker(["admin"]))])
async def create_flight_end_point(flight: FlightCreate, db: Session = Depends(get_db)):
    if flight.status not in FlightStatus.__members__:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail=f"Invalid flight status. Please use one of the valid options: 'Delayed', 'On Time', 'Cancelled'",
        )

    if not get_airplane(db, flight.airplane_id):
        raise HTTPException(status_code=404, detail="Airplane not found")

    return create_flight(db, flight)


@router.put("/{flight_id}", dependencies=[Depends(role_checker(["admin"]))])
async def update_flight_end_point(
    flight_id: int, flight: FlightUpdate, db: Session = Depends(get_db)
):
    """
    API Router: Update Flight
    """
    db_flight = get_flight(db, flight_id)
    if not db_flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    # Kiểm tra tính hợp lệ của actual_departure_time
    if flight.actual_departure_time:
        if flight.actual_departure_time < flight.estimated_departure_time:
            raise HTTPException(
                status_code=400,
                detail="Actual departure time cannot be earlier than estimated departure time",
            )
    return update_flight(db, db_flight, flight)


@router.delete("/{flight_id}", dependencies=[Depends(role_checker(["admin"]))])
async def delete_flight_end_point(flight_id: int, db: Session = Depends(get_db)):
    db_flight = get_flight(db, flight_id)
    if not db_flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    return delete_flight(db, db_flight)


@router.get("/search/")
async def search_flights_end_point(
    departure_city: str,
    arrival_city: str,
    departure_time: datetime,
    db: Session = Depends(get_db),
):
    db_flights = get_flights_by_departure_time_and_cities(
        db, departure_city, arrival_city, departure_time
    )
    if not db_flights:
        raise HTTPException(status_code=404, detail="Flight not found")
    return db_flights


@router.get("/passengers/{flight_id}", dependencies=[Depends(role_checker(["admin"]))])
async def get_passengers_for_flight(flight_id: int, db: Session = Depends(get_db)):
    """
    Post API to get all passengers for a specific flight.
    """
    # Call the function to retrieve all passengers for the given flight_id
    passengers = get_all_passenger_in_flight(flight_id, db)

    if not passengers:
        raise HTTPException(
            status_code=404, detail="No passengers found for this flight"
        )

    return passengers


@router.get("/")
async def get_all_flights_end_point(db: Session = Depends(get_db)):
    """
    GET API to get all flights
    """

    flights = get_all_flights(db)

    return flights


@router.get("/passengers/citizen/{citizen_id}", response_model=FlightBase)
def get_flight_by_citizen_id(citizen_id: str, db: Session = Depends(get_db)):
    flight = get_flight_by_citizen_id(citizen_id, db)
    if not flight:
        raise HTTPException(
            status_code=404, detail="Flight not found for this citizen_id."
        )
    return flight


@router.post("/delay")
async def delay_flight_end_point(
    flight: FlightDelay,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    db_flight = get_flight(db, flight.flight_id)
    if not db_flight:
        raise HTTPException(status_code=404, detail="Flight not found")

    await delay_flight(flight, db_flight, db)

    return {"message": "Flight delayed"}


@router.get("/{flight_id}/{flight_class}")
def get_flight_seats_matrix_end_point(
    flight_id: int, flight_class: FlightClass, db: Session = Depends(get_db)
):
    """
    End point to get the flight's seat matrix based on the flight class
    """
    if flight_class not in FlightClass:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid flight class value: {flight_class}. Please use one of the valid options: 'Economy', 'Business', 'FirstClass'.",
        )

    return get_flight_seats_matrix(
        flight_id=flight_id, flight_class=flight_class, db=db
    )
