from fastapi import APIRouter, HTTPException, Depends
from app.core.security import role_checker
from service.passenger import *
from sqlalchemy.orm import Session
from core.database import get_db
from schemas import PassengerCreate, PassengerUpdate

router = APIRouter(
    prefix="/passenger",
    tags=["Passenger"],
    dependencies=[Depends(role_checker(["admin"]))],
)


@router.get("/{citizen_id}")
def get_passenger_end_point(citizen_id: str, db: Session = Depends(get_db)):
    """
    Get a specific passenger by citizen_id
    """
    db_passenger = get_passenger(citizen_id, db)

    if not db_passenger:
        raise HTTPException(status_code=404, detail="Passenger not found")

    return db_passenger


@router.post("/")
def create_passenger_end_point(
    passenger: PassengerCreate, db: Session = Depends(get_db)
):
    """
    Create a passenger
    """

    return create_passenger(passenger, db)


@router.put("/{citizen_id}")
def update_passenger_end_point(
    citizen_id: str, passenger: PassengerUpdate, db: Session = Depends(get_db)
):
    """
    Update a passenger
    """
    db_passenger = get_passenger(citizen_id, db)

    if not db_passenger:
        raise HTTPException(status_code=404, detail="Passenger not found")

    return update_passenger(db_passenger, passenger, db)


@router.get("/{passenger_id}/{flight_id}")
def get_passenger_by_flight_end_point(
    citizen_id: str, flight_id: int, db: Session = Depends(get_db)
):
    """
    Get a passenger by citizen_id and flight_id
    """

    db_passenger = get_passenger_by_flight(
        citizen_id=citizen_id, flight_id=flight_id, db=db
    )

    if not db_passenger:
        raise HTTPException(
            status_code=404, detail="Passenger not found for the given flight"
        )

    return db_passenger


@router.delete("/{citizen_id}/{flight_id}")
def delete_passenger_end_point(
    citizen_id: str, flight_id: int, db: Session = Depends(get_db)
):
    """
    Delete a passenger by citizen_id and flight_id
    """
    # Get the passenger based on both passenger_id and flight_id
    db_passenger = get_passenger_by_flight(
        citizen_id=citizen_id, flight_id=flight_id, db=db
    )

    # If the passenger doesn't exist, raise a 404 error
    if not db_passenger:
        raise HTTPException(
            status_code=404, detail="Passenger not found for the given flight"
        )

    # Call the delete_passenger function to delete the passenger
    return delete_passenger(db_passenger, db)


@router.get("/")
def get_all_passengers_end_point(db: Session = Depends(get_db)):
    return get_all(Passenger, db)
