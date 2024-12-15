from sqlalchemy.exc import NoResultFound
from app.schemas import BookingBase, BookingUpdate, BookingCreate
from datetime import datetime, timedelta
from fastapi import HTTPException
from sqlalchemy.orm import Session, aliased
from app.service.email import send_email
from .crud_utils import *
from app.models import Booking, Passenger
from typing import List
from schemas.passenger import PassengerBase, PassengerCreate
from service.flight import delete_flight, get_all_passenger_in_flight
from service.passenger import create_passenger, delete_passengers
from service.flight_seat import get_flight_seat_by_flight_id_and_class
from typing import List
from app.models import FlightSeats, Flight, User, Airport
from app.service.service_utils import conint, seat_col_to_int
from app.core.security import generate_booking_id_hash


def get_bookings_by_flight_id(flight_id: int, db: Session) -> List[Booking]:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table booking where booking.flight_id == flight_id'
    """

    db_booking = db.query(Booking).filter(Booking.flight_id == flight_id).all()

    return db_booking


def get_booking(booking_id: str, db: Session) -> Booking:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table booking where booking.booking_id = booking_id'
    """

    db_booking = db.query(Booking).filter(Booking.booking_id == booking_id).first()

    return db_booking


async def create_booking(booking: BookingCreate, db: Session) -> Booking:
    """
    Equivalent to a SQL query that is 'INSERT INTO booking values ()'
    When creating the booking, we need to ensure that the passenger_id and flight_id are valid
    The flight_class enums in the data has already been validated by pydantic, but the format needs to be like this:
    'Economy' or 'Business' or 'First'
    """

    booking_data = BookingBase(**booking.model_dump(exclude={"passengers"}))
    # booking_data.user_id = user.user_id

    current_dict = booking_data.model_dump()
    current_dict["booking_date"] = datetime.now()
    current_dict["booking_id"] = generate_booking_id_hash(
        booker_email=booking_data.booker_email,
        number_of_adults=booking_data.number_of_adults,
        number_of_children=booking_data.number_of_children,
        flight_class=booking_data.flight_class,
        flight_id=booking_data.flight_id,
    )
    db_booking = create(Booking, db, current_dict)

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

    await send_email(
        [booking.booker_email],
        f"Your booking ID",
        f"Booking ID: {db_booking.booking_id}",
    )
    return db_booking


def update_booking(db_booking: Booking, booking: BookingUpdate, db: Session) -> Booking:
    """
    Equivalent to a SQL query that is 'UPDATE table booking where booking.booking_id = booking_id'
    """

    return update(db_booking, db, booking.dict())


def delete_booking(db_booking: Booking, db: Session) -> Booking:
    """
    Equivalent to a SQL query that is 'DELETE FROM table booking where booking.booking_id = booking_id'
    """

    return delete(db_booking, db)


def cancel_booking(db_booking: Booking, db: Session):
    """
    Update the specified 'Booking' cancelled field by booking_id in the database to True.
    """

    flight = get_flight_compared_current_time(db_booking, db)

    if not flight:
        raise HTTPException(
            status_code=400,
            detail="Cancelation cannot be after the flight's estimated departure time.",
        )

    # get then delete passengers from flight
    passengers = get_passengers_in_booking(db_booking, db)

    delete_passengers(passengers, db)

    db_booking.cancelled = True  # type: ignore
    db.commit()
    db.refresh(db_booking)  # Refresh to ensure the object is up-to-date

    return {
        "message": f"Booking id {db_booking.booking_id} has been successfully cancelled"
    }


def get_all_bookings(db: Session) -> List[Booking]:
    return get_all(Booking, db)


def get_booking_info(db_booking: Booking, db: Session) -> dict:
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    # Alias for departure and arrival airports
    departure_airport = aliased(Airport)
    arrival_airport = aliased(Airport)

    # Query to fetch flight details with airport information
    result = (
        db.query(
            Flight,
            departure_airport.city.label("departure_city"),
            departure_airport.name.label("departure_airport_name"),
            arrival_airport.city.label("arrival_city"),
            arrival_airport.name.label("arrival_airport_name"),
        )
        .join(Booking, Booking.flight_id == Flight.flight_id)  # Join with Booking
        .join(
            departure_airport,
            Flight.departure_airport_id == departure_airport.airport_id,
        )  # Join with departure airport
        .join(
            arrival_airport, Flight.destination_airport_id == arrival_airport.airport_id
        )  # Join with arrival airport
        .filter(Booking.booking_id == db_booking.booking_id)
        .first()
    )

    if not result:
        raise HTTPException(
            status_code=404, detail="Flight not found for this booking ID"
        )

    # Destructure the result
    (
        flight,
        departure_city,
        departure_airport_name,
        arrival_city,
        arrival_airport_name,
    ) = result

    # Calculate flight duration, checking for delays
    if flight.actual_departure_time and flight.actual_arrival_time:
        duration: timedelta = flight.actual_arrival_time - flight.actual_departure_time
        departure_time = flight.actual_departure_time.strftime("%H:%M")
        arrival_time = flight.actual_arrival_time.strftime("%H:%M")
    else:
        duration: timedelta = (
            flight.estimated_arrival_time - flight.estimated_departure_time
        )
        departure_time = flight.estimated_departure_time.strftime("%H:%M")
        arrival_time = flight.estimated_arrival_time.strftime("%H:%M")

    # Format the duration
    hours, remainder = divmod(duration.total_seconds(), 3600)
    minutes = remainder // 60
    formatted_duration = f"{int(hours)} hours {int(minutes)} minutes"

    passengers = get_passengers_in_booking(db_booking, db)

    # Construct the response dictionary
    return {
        "id": flight.flight_id,
        "class": db_booking.flight_class,
        "cancelled": db_booking.cancelled,
        "flightNumber": flight.flight_number,  # Replace with actual data if available
        "departureTime": departure_time,
        "arrivalTime": arrival_time,
        "departure_city": departure_city,
        "departure_airport": departure_airport_name,
        "arrival_city": arrival_city,
        "arrival_airport": arrival_airport_name,
        "flightDate": flight.estimated_departure_time.strftime("%A, %d %B"),
        "duration": formatted_duration,  # Replace with actual calculation
        "status": flight.status,
        "passengers": passengers,
    }


def get_passengers_in_booking(db_booking: Booking, db: Session) -> List[Passenger]:
    """
    Get all passengers in a booking by booking_id.
    """
    try:
        passengers = (
            db.query(Passenger)
            .filter(Passenger.booking_id == db_booking.booking_id)
            .all()
        )

        if not passengers:
            return []  # Return empty list if no passengers are found

        return passengers

    except NoResultFound:
        # Optionally handle case where no passengers were found
        return []


def get_users_booking(user_id: int, db: Session) -> List[Booking]:
    bookings = db.query(Booking).filter(Booking.user_id == user_id).all()

    return bookings


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
    # First, get the registration number of the flight
    flight = db.query(Flight).filter(Flight.flight_id == booking.flight_id).first()
    if not flight:
        raise HTTPException(status_code=404, detail="Flight not found.")

    # Query FlightSeats using the registration_number and flight class
    seating_info = (
        db.query(FlightSeats.max_col_seat, FlightSeats.max_row_seat)
        .filter(
            FlightSeats.registration_number == flight.registration_number,
            FlightSeats.flight_class == booking.flight_class,
        )
        .first()
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
    if seat_col_int < 1 or seat_col_int > seat_col_to_int(max_col_seat):
        raise HTTPException(status_code=400, detail="Invalid seat column.")

    passengers_in_flight = get_all_passenger_in_flight(booking.flight_id, db)

    for p in passengers_in_flight:
        p = p["passenger"]
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
