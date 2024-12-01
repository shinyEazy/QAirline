from fastapi import APIRouter, HTTPException, Depends
from crud.airplane import get_airplane
from sqlalchemy.orm import Session
from crud.flight import *
from schemas import FlightCreate, FlightUpdate
from core.database import get_db

router = APIRouter(prefix="/flights", tags=["Flight"])

# Endpoints for Flight


@router.get("/{flight_id}")
async def get_flight_end_point(flight_id: int, db: Session = Depends(get_db)):
    db_flight = get_flight(db, flight_id=flight_id)
    if not db_flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    return db_flight


@router.post("/")
async def create_flight_end_point(flight: FlightCreate, db: Session = Depends(get_db)):
    if not get_airplane(db, flight.airplane_id):
        raise HTTPException(status_code=404, detail="Airplane not found")
    return create_flight(db, flight)


@router.put("/{flight_id}")
async def update_flight_end_point(
    flight_id: int, flight: FlightUpdate, db: Session = Depends(get_db)
):
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


@router.delete("/{flight_id}")
async def delete_flight_end_point(flight_id: int, db: Session = Depends(get_db)):
    db_flight = get_flight(db, flight_id)
    if not db_flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    return delete_flight(db, db_flight)

@router.get("/search/")
async def search_flights_end_point(departure_city: str, arrival_city: str, departure_time: datetime, db: Session = Depends(get_db)):
    db_flights = get_flights_by_departure_time_and_cities(db, departure_city, arrival_city, departure_time)
    if not db_flights:
        raise HTTPException(status_code=404, detail="Flight not found")
    return db_flights

@router.get("/flight/passengers/{flight_id}")
async def create_passengers_for_flight(flight_id: int, db: Session = Depends(get_db)):
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
