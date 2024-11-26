from fastapi import APIRouter, HTTPException, Depends
import schemas, models
from crud.passenger import *
from crud.user import get_user
from sqlalchemy.orm import Session
from database import get_db

router = APIRouter(prefix="/passenger", tags=["Passenger"])


@router.get("/{passenger_id}")
def get_passenger_end_point(passenger_id: int, db: Session = Depends(get_db)):
    """
    Get a specific passenger by passenger_id
    """
    db_passenger = get_passenger(passenger_id, db)

    if not db_passenger:
        raise HTTPException(status_code=404, detail="Passenger not found")

    return db_passenger


@router.post("/")
def create_passenger_end_point(
    passenger: schemas.PassengerCreate, db: Session = Depends(get_db)
):
    """
    Create a passenger
    """

    if not get_user(passenger.passenger_id, db):
        raise HTTPException(
            status_code=400, detail="A passenger with this email already registered"
        )

    return create_passenger(passenger, db)


@router.put("/{passenger_id}")
def update_passenger_end_point(
    passenger_id: int, passenger: schemas.PassengerUpdate, db: Session = Depends(get_db)
):
    """
    Update a passenger
    """
    db_passenger = get_passenger(passenger_id, db)

    if not db_passenger:
        raise HTTPException(status_code=404, detail="Passenger not found")

    return update_passenger(db_passenger, passenger, db)


@router.delete("/{passenger_id}")
def delete_passenger_end_point(passenger_id: int, db: Session = Depends(get_db)):
    """
    Delete a passenger
    """
    db_passenger = get_passenger(passenger_id, db)

    if not db_passenger:
        raise HTTPException(status_code=404, detail="Passenger not found")

    return delete_passenger(db_passenger, db)
