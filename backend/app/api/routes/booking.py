from fastapi import APIRouter, HTTPException, Depends
from starlette.status import HTTP_404_NOT_FOUND
from app.core.security import get_current_user, role_checker
from schemas.booking import BookingCreate, BookingBase
from service.booking import *
from service.passenger import *
from sqlalchemy.orm import Session
from core.database import get_db
from app.models import Admin, FlightClass, FlightSeats, User
from typing import Optional

router = APIRouter(
    prefix="/booking",
    tags=["Booking"],
    # dependencies=[Depends(role_checker(["admin"]))],
)


@router.get("/{booking_id}")
def get_booking_end_point(booking_id, db: Session = Depends(get_db)):
    """
    Get a specific booking by booking_id
    """

    db_booking = get_booking(booking_id, db)

    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return db_booking


@router.get("/passengers/{booking_id}")
def get_passenger_in_booking_end_point(booking_id, db: Session = Depends(get_db)):
    """
    Get all passengers in a booking
    """

    db_booking = get_booking(booking_id, db)

    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return get_passengers_in_booking(db_booking, db)


# @router.get("/")
# def get_current_user_booking_end_point(
#     user: User = Depends(get_current_user), db: Session = Depends(get_db)
# ):
#     """
#     Get booking of current user
#     """
#
#     return get_users_booking(conint(user.user_id), db)


@router.post("/")
async def create_booking_end_point(
    booking: BookingCreate,
    # user: Optional[User] = Depends(lambda: role_checker(["user", "admin"])),
    db: Session = Depends(get_db),
):
    """
    Create a booking
    """
    # Manually validate the flight_class value against the Enum
    if booking.flight_class not in FlightClass.__members__:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid flight class value: {booking.flight_class}. Please use one of the valid options: 'Economy', 'Business', 'FirstClass'.",
        )

    db_booking = await create_booking(booking, db)

    print("Type of db_booking:", type(db_booking))
    print("db_booking:", db_booking)
    return {
        "booking": db_booking,
    }


@router.get("/flight/{flight_id}")
def get_booking_by_flight_id_end_point(
    flight_id,
    db: Session = Depends(get_db),
    admin: Admin = Depends(role_checker(["admin"])),
):
    """
    Get a specific booking by flight_id
    """

    db_bookings = get_bookings_by_flight_id(flight_id, db)

    if not db_bookings:
        raise HTTPException(status_code=404, detail="Booking not found")

    return db_bookings


@router.put("/{booking_id}")
def update_booking_end_point(
    booking_id, booking: BookingUpdate, db: Session = Depends(get_db)
):
    """
    Update a booking
    """
    db_booking = get_booking(booking_id, db)

    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return update_booking(db_booking, booking, db)


@router.delete("/{booking_id}")
def delete_booking_end_point(booking_id, db: Session = Depends(get_db)):
    """
    Delete a booking
    """
    db_booking = get_booking(booking_id, db)

    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return delete_booking(db_booking, db)


@router.post("/cancel/{booking_id}")
def cancel_booking_end_point(booking_id, db: Session = Depends(get_db)):

    db_booking = get_booking(booking_id, db)

    if not db_booking:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Booking not found")

    cancel_booking(db_booking, db)
    return {"message": "Successfully cancelled the flight"}


# helper functions
