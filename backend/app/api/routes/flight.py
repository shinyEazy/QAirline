from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks, status
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from app.core.security import role_checker
from app.models import FlightStatus
from service.airplane import get_airplane_by_registration_number
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
            detail=f"Invalid flight status. Please use one of the valid options: 'Delayed', 'On Time', 'Cancelled','Scheduled'",
        )
    airplane = get_airplane_by_registration_number(db, flight.registration_number)
    if not airplane:
        raise HTTPException(status_code=404, detail="Airplane not found")

    if not bool(airplane.active):
        raise HTTPException(
            status_code=400, detail="Retired airplane cannot be used on flight"
        )

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
    return await update_flight(db, db_flight, flight)


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
    if flight.status not in FlightStatus.__members__:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail=f"Flight status is invalid, please choose a correct flight status: Scheduled, On Time, Delayed, Cancelled, Landed",
        )
    if not db_flight:
        raise HTTPException(status_code=404, detail="Flight not found")

    await delay_flight(flight, db_flight, db)

    return {"message": "Flight delayed"}


@router.get("/flight-seats/{flight_id}/")
def get_flight_seats_matrix_end_point(flight_id: int, db: Session = Depends(get_db)):
    """
    End point to get the flight's seat matrix based on the flight class
    """
    # if flight_class not in FlightClass:
    #     raise HTTPException(
    #         status_code=400,
    #         detail=f"Invalid flight class value: {flight_class}. Please use one of the valid options: 'Economy', 'Business', 'FirstClass'.",
    #     )

    flight_seats_matrix = []
    for flight_class in FlightClass:
        flight_seats_matrix.append(
            [
                flight_class.value,
                get_flight_seats_matrix(
                    flight_id=flight_id, flight_class=flight_class, db=db
                ),
            ]
        )
    return flight_seats_matrix


@router.get("/flight-seats-available/{flight_id}/")
def get_available_flight_seats(flight_id: int, db: Session = Depends(get_db)):
    """
    End point to get the available seats for a given flight
    """
    flight_seat_matrix = []
    for flight_class in FlightClass:
        seat_matrix = get_flight_seats_matrix(
            flight_id=flight_id, flight_class=flight_class, db=db
        )
        available_seats = count_available_seat(seat_matrix)
        flight_seat_matrix.append([flight_class.value, available_seats])
    return flight_seat_matrix

@router.get("/flight-seats/{flight_id}/prices/")
def get_flight_seat_prices_end_point(
    flight_id: int,
    db: Session = Depends(get_db),
):
    """
    Endpoint để lấy giá vé cho từng hạng ghế của một chuyến bay.
    """
    prices = get_flight_class_prices(db, flight_id)
    if prices is None:
        raise HTTPException(
            status_code=404, detail="Flight not found or no seat information available"
        )
    return {"prices": prices}
