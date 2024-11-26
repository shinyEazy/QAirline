from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models import Airport
from schemas import AirportCreate, AirportUpdate
from crud.airport import *
from database import get_db

router = APIRouter(prefix="/airports", tags=["Airport"])

# Endpoints for Airport

@router.post("/")
async def create_airport_end_point(airport: AirportCreate, db: Session = Depends(get_db)):
    return create_airport(db, airport)

@router.get("/{airport_id}")
async def get_airport_end_point(airport_id: int, db: Session = Depends(get_db)):
    db_airport = get_airport(db, airport_id=airport_id)
    if not db_airport:
        raise HTTPException(status_code=404, detail="Airport not found")
    return db_airport

@router.put("/{airport_id}")
async def update_airport_end_point(airport_id: int, airport: AirportUpdate, db: Session = Depends(get_db)):
    """
    Update an airport
    """
    db_airport = get_airport(db, airport_id)
    if not db_airport:
        raise HTTPException(status_code=404, detail="Airport not found")
    return update_airport(db, db_airport, airport)

@router.delete("/{airport_id}")
async def delete_airport_end_point(airport_id: int, db: Session = Depends(get_db)):
    """
    Delete an airport
    """
    db_airport = get_airport(db, airport_id)
    if not db_airport:
        raise HTTPException(status_code=404, detail="Airport not found")
    return delete_airport(db, db_airport)
