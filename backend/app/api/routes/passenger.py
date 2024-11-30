from fastapi import APIRouter, HTTPException, Depends
import schemas, models
from crud.passenger import *
from sqlalchemy.orm import Session
from core.database import get_db

router = APIRouter(prefix="/passenger", tags=["Passenger"])


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
    passenger: schemas.PassengerCreate, db: Session = Depends(get_db)
):
    """
    Create a passenger
    """

    return create_passenger(passenger, db)


@router.put("/{citizen_id}")
def update_passenger_end_point(
    citizen_id: str, passenger: schemas.PassengerUpdate, db: Session = Depends(get_db)
):
    """
    Update a passenger
    """
    db_passenger = get_passenger(citizen_id, db)

    if not db_passenger:
        raise HTTPException(status_code=404, detail="Passenger not found")

    return update_passenger(db_passenger, passenger, db)


@router.delete("/{citizen_id}")
def delete_passenger_end_point(citizen_id: str, db: Session = Depends(get_db)):
    """
    Delete a passenger
    """
    db_passenger = get_passenger(citizen_id, db)

    if not db_passenger:
        raise HTTPException(status_code=404, detail="Passenger not found")

    return delete_passenger(db_passenger, db)


@router.get("/")
def get_all_passengers_end_point(db: Session = Depends(get_db)):
    return get_all(Passenger, db)
