from fastapi import APIRouter, HTTPException, Depends
import schemas, models
from crud.booking import *
from sqlalchemy.orm import Session
from database import get_db

router = APIRouter(prefix="/booking", tags=["Booking"])


@router.get("/{booking_id}")
def get_booking_end_point(booking_id: int, db: Session = Depends(get_db)):
    """
    Get a specific booking by booking_id
    """

    db_booking = get_booking(booking_id, db)

    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return db_booking


@router.post("/")
def create_booking_end_point(
    booking: schemas.BookingCreate, db: Session = Depends(get_db)
):
    """
    Create a booking
    """

    if not get_booking_by_passenger_id(booking.passenger_id, db):
        raise HTTPException(status_code=404, detail="Referenced passenger not found")
    if not get_booking_by_flight_id(booking.flight_id, db):
        raise HTTPException(status_code=404, detail="Referenced flight not found")

    return create_booking(booking, db)


@router.get("/passenger/{passenger_id}")
def get_booking_by_passenger_id_end_point(
    passenger_id: int, db: Session = Depends(get_db)
):
    """
    Get a specific booking by passenger_id
    """

    db_booking = get_booking_by_passenger_id(passenger_id, db)

    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return db_booking


@router.get("/flight/{flight_id}")
def get_booking_by_flight_id_end_point(flight_id: int, db: Session = Depends(get_db)):
    """
    Get a specific booking by flight_id
    """

    db_booking = get_booking_by_flight_id(flight_id, db)

    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return db_booking