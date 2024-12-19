from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.security import role_checker
from app.models import Airport
from app.schemas import AirportCreate, AirportUpdate
from service.airport import *
from core.database import get_db

router = APIRouter(
    prefix="/airports",
    tags=["Airport"],
)

# Endpoints for Airport


@router.post(
    "/",
    dependencies=[Depends(role_checker(["admin"]))],
)
async def create_airport_end_point(
    airport: AirportCreate, db: Session = Depends(get_db)
):
    return create_airport(db, airport)


@router.get("/{airport_id}")
async def get_airport_end_point(airport_id: int, db: Session = Depends(get_db)):
    db_airport = get_airport(db, airport_id=airport_id)
    if not db_airport:
        raise HTTPException(status_code=404, detail="Airport not found")
    return db_airport


@router.put(
    "/{airport_id}",
    dependencies=[Depends(role_checker(["admin"]))],
)
async def update_airport_end_point(
    airport_id: int, airport: AirportUpdate, db: Session = Depends(get_db)
):
    """
    Update an airport
    """
    db_airport = get_airport(db, airport_id)
    if not db_airport:
        raise HTTPException(status_code=404, detail="Airport not found")
    return update_airport(db, db_airport, airport)


@router.delete(
    "/{airport_id}",
    dependencies=[Depends(role_checker(["admin"]))],
)
async def delete_airport_end_point(airport_id: int, db: Session = Depends(get_db)):
    """
    Delete an airport
    """
    db_airport = get_airport(db, airport_id)
    if not db_airport:
        raise HTTPException(status_code=404, detail="Airport not found")
    return delete_airport(db, db_airport)


@router.get("/")
async def get_all_airports_end_point(db: Session = Depends(get_db)):
    return get_all_airports(db)
