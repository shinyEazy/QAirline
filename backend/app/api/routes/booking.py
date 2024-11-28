from fastapi import APIRouter, HTTPException, Depends
import schemas
from sqlalchemy.exc import IntegrityError
from crud.booking import *
from crud.passenger import *
from crud.flight_seat import get_flight_seat_by_flight_id_and_class
from sqlalchemy.orm import Session
from core.database import get_db
from models import FlightClass


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
    # Manually validate the flight_class value against the Enum
    if not get_passenger(booking.passenger_id, db):
        raise HTTPException(status_code=404, detail="Referenced passenger not found")
    # if not get_booking_by_flight_id(booking.flight_id, db):
    #     raise HTTPException(status_code=404, detail="Referenced flight not found")
    if booking.flight_class not in FlightClass.__members__:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid flight class value: {booking.flight_class}. Please use one of the valid options: 'Economy', 'Business', 'FirstClass'.",
        )
    # Create the booking
    db_booking = create_booking(booking, db)

    
    # Get flight seat information to determine the price
    flight_seat = get_flight_seat_by_flight_id_and_class(db, booking.flight_id, booking.flight_class) 
    
    price_per_adult = flight_seat.flight_price
    price_per_child = price_per_adult * flight_seat.child_multiplier
    total_price = (db_booking.number_of_adults * price_per_adult) + (db_booking.number_of_children * price_per_child)


    return {
        "booking": db_booking,
        "total_price": total_price
    }


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


@router.put("/{booking_id}")
def update_booking_end_point(
    booking_id: int, booking: schemas.BookingUpdate, db: Session = Depends(get_db)
):
    """
    Update a booking
    """
    db_booking = get_booking(booking_id, db)

    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return update_booking(db_booking, booking, db)


@router.delete("/{booking_id}")
def delete_booking_end_point(booking_id: int, db: Session = Depends(get_db)):
    """
    Delete a booking
    """
    db_booking = get_booking(booking_id, db)

    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return delete_booking(db_booking, db)
