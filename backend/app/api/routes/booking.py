from fastapi import APIRouter, HTTPException, Depends
from pydantic import conint
from sqlalchemy import Column, Integer
from crud.flight import delete_flight, get_all_passenger_in_flight
from schemas.booking import BookingCreate, BookingBase
from schemas.passenger import PassengerBase
import schemas
from sqlalchemy.exc import IntegrityError
from crud.booking import *
from crud.passenger import *
from crud.flight_seat import get_flight_seat_by_flight_id_and_class
from sqlalchemy.orm import Session
from core.database import get_db
from models import FlightClass, FlightSeats
from typing import List
from sqlalchemy import func

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


@router.get("/passengers/{booking_id}")
def get_passenger_in_booking_end_point(booking_id: int, db: Session = Depends(get_db)):
    """
    Get all passengers in a booking
    """

    db_booking = get_booking(booking_id, db)

    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return get_passengers_in_booking(db_booking, db)


@router.post("/")
def create_booking_end_point(
    booking: schemas.BookingCreate, db: Session = Depends(get_db)
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

    booking_data = BookingBase(**booking.model_dump(exclude={"passengers"}))

    db_booking = create_booking(booking_data, db)

    flight = get_flight_compared_current_time(db_booking, db)

    if not flight:
        raise HTTPException(
            status_code=400,
            detail="Booking date cannot be after the flight's estimated departure time.",
        )

    if booking.number_of_adults + booking.number_of_children <= 0:
        raise HTTPException(
            status_code=400,  # Bad Request
            detail="The number of adults and children must be greater than zero.",
        )

    create_booking_passengers(booking, db_booking, db)

    total_price = calculate_price(booking, db_booking, db)

    return {"booking": db_booking, "total_price": total_price}


@router.get("/flight/{flight_id}")
def get_booking_by_flight_id_end_point(flight_id: int, db: Session = Depends(get_db)):
    """
    Get a specific booking by flight_id
    """

    db_bookings = get_bookings_by_flight_id(flight_id, db)

    if not db_bookings:
        raise HTTPException(status_code=404, detail="Booking not found")

    return db_bookings


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


@router.post("/cancel/{booking_id}")
def cancel_booking_end_point(booking_id: int, db: Session = Depends(get_db)):

    db_booking = get_booking(booking_id, db)

    flight = get_flight_compared_current_time(db_booking, db)

    if not flight:
        raise HTTPException(
            status_code=400,
            detail="Cancelation cannot be after the flight's estimated departure time.",
        )

    # update the cancelled status to true
    cancel_booking(db_booking, db)

    # get then delete passengers from flight
    passengers = get_passengers_in_booking(db_booking, db)

    delete_passengers(passengers, db)

    return {"message": "Successfully cancelled the flight"}


# helper functions


def calculate_price(booking: BookingCreate, db_booking: Booking, db: Session):
    # Get flight seat information to determine the price
    flight_seat = get_flight_seat_by_flight_id_and_class(
        db, booking.flight_id, booking.flight_class
    )

    price_per_adult = flight_seat.flight_price
    price_per_child = price_per_adult * flight_seat.child_multiplier
    total_price = (db_booking.number_of_adults * price_per_adult) + (
        db_booking.number_of_children * price_per_child
    )

    return total_price


def create_booking_passengers(booking: BookingCreate, db_booking: Booking, db: Session):
    passengers: List[PassengerBase] = booking.passengers
    print(passengers)
    for passenger in passengers:
        check_valid_passenger_seats(booking, passenger, db)
        passenger_model_dump = passenger.model_dump()
        passenger_model_dump["booking_id"] = db_booking.booking_id

        passenger_obj = PassengerCreate(**passenger_model_dump)
        create_passenger(passenger_obj, db)


def check_valid_passenger_seats(
    booking: BookingCreate, passenger: PassengerBase, db: Session
):
    seating_info = (
        db.query(FlightSeats.max_col_seat, FlightSeats.max_row_seat)
        .join(Booking, FlightSeats.flight_id == Booking.flight_id)
        .filter(Booking.flight_class == FlightSeats.flight_class)
        .first()  # Retrieve the first row of results
    )

    # Check if seating information was found
    if seating_info is None:
        raise HTTPException(status_code=404, detail="No seating information found.")

    # Unpack max_col_seat and max_row_seat from the tuple
    max_col_seat, max_row_seat = seating_info

    # Validate the passenger seat row
    if passenger.seat_row < 0 or passenger.seat_row > max_row_seat:
        raise HTTPException(status_code=400, detail="Invalid seat row.")

    # Validate the passenger seat column (if applicable)
    try:
        seat_col_int = seat_col_to_int(passenger.seat_col)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid seat column.")

    # Validate the passenger seat column
    if seat_col_int < 1 or seat_col_int > max_col_seat:
        raise HTTPException(status_code=400, detail="Invalid seat column.")

    passengers_in_flight = get_all_passenger_in_flight(booking.flight_id, db)

    for p in passengers_in_flight:
        if str(p.citizen_id) == passenger.citizen_id:
            raise HTTPException(
                status_code=400,  # Use 400 for bad request
                detail=f"Passenger with citizen_id {passenger.citizen_id} is already booked on this flight.",
            )

        # Check if another passenger already has the same seat
        if (
            conint(p.seat_row) == passenger.seat_row
            and str(p.seat_col) == passenger.seat_col
        ):
            raise HTTPException(
                status_code=400,  # Use 400 for bad request
                detail=f"Seat {passenger.seat_row}{passenger.seat_col} is already taken by another passenger.",
            )


def seat_col_to_int(seat_col: str) -> int:
    """Convert seat column letter (e.g., 'A', 'B') to a number."""
    if len(seat_col) > 1:
        raise HTTPException(status_code=400, detail="Invalid length of seat column")
    return ord(seat_col.upper()) - ord("A") + 1


def get_flight_compared_current_time(db_booking: Booking, db: Session) -> Flight:
    current_time = datetime.now()

    flight = (
        db.query(Flight)
        .filter(
            Flight.flight_id == db_booking.flight_id,
            Flight.estimated_departure_time > current_time,
        )
        .first()
    )

    return flight


def conint(x: Column[int]):
    return int(str(x))
