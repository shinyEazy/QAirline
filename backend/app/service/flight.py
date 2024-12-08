from datetime import datetime
from sqlalchemy.orm import joinedload
from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import Date
from app.schemas import FlightCreate, FlightUpdate, FlightDelay, flight
from app.schemas.flight_seat import FlightSeatsCreate
from app.service.flight_seat import (
    create_flight_seat,
    get_flight_seat_by_flight_id_and_class,
)
from app.service.passenger import get_passenger_by_flight
from .crud_utils import *
from app.models import (
    Flight,
    Airplane,
    FlightClass,
    FlightStatus,
    Passenger,
    Booking,
    Airport,
    User,
)
from typing import List
from app.service.email import send_email
from app.service.service_utils import seat_col_to_int, conint


# CRUD for Flight
def create_flight(db: Session, flight: FlightCreate) -> Flight:
    # Lấy máy bay từ database
    airplane = (
        db.query(Airplane).filter(Airplane.airplane_id == flight.airplane_id).first()
    )

    flight_data = flight.model_dump(exclude={"flight_seats"})
    flight_data["departure_airport_id"] = airplane.current_airport_id
    db_flight = create(Flight, db, flight_data)

    create_flight_seats_for_flight(flight, db_flight, db)

    return db_flight


def get_flight(db: Session, flight_id: int) -> Flight:
    db_flight = db.query(Flight).filter(Flight.flight_id == flight_id).first()
    return db_flight


def get_flights_by_departure_time_and_cities(
    db: Session, departure_city: str, arrival_city: str, departure_time: datetime
) -> List[dict]:
    departure_airport = aliased(Airport)
    arrival_airport = aliased(Airport)
    flights = (
        db.query(Flight, departure_airport, arrival_airport)
        .join(
            departure_airport,
            Flight.departure_airport_id == departure_airport.airport_id,
        )
        .join(
            arrival_airport, Flight.destination_airport_id == arrival_airport.airport_id
        )
        .filter(
            Flight.estimated_departure_time.cast(Date) == departure_time.date(),
            departure_airport.city == departure_city,
            arrival_airport.city == arrival_city,
        )
        .all()
    )

    if not flights:
        raise HTTPException(status_code=404, detail="No flights found")
    result = []
    for flight, dep_airport, arr_airport in flights:
        result.append(
            {
                "id": flight.flight_id,
                "departureTime": flight.estimated_departure_time.strftime("%H:%M"),
                "arrivalTime": flight.estimated_arrival_time.strftime("%H:%M"),
                "from": dep_airport.city,
                "to": arr_airport.city,
                "seatsLeft": 666,  # Bạn cần thay đổi giá trị này theo dữ liệu thực tế
                "flightNumber": "VN 7239",  # Bạn cần thay đổi giá trị này theo dữ liệu thực tế
                "price": "$100 - $200",  # Bạn cần thay đổi giá trị này theo dữ liệu thực tế
                "flightDate": flight.estimated_departure_time.strftime("%A, %d %B"),
                "flightRoute": f"{dep_airport.city} - {arr_airport.city}",
                "departureDetailTime": flight.estimated_departure_time.strftime(
                    "%H:%M %p"
                ),
                "departureAirport": f"{dep_airport.name}, {dep_airport.city}",
                "arrivalDetailTime": flight.estimated_arrival_time.strftime("%H:%M %p"),
                "arrivalAirport": f"{arr_airport.name}, {arr_airport.city}",
                "duration": "2 hours 10 minutes",  # Bạn cần thay đổi giá trị này theo dữ liệu thực tế
            }
        )
    return result


def update_flight(db: Session, db_flight: Flight, flight: FlightUpdate) -> Flight:
    return update(db_flight, db, flight.model_dump())


def delete_flight(db: Session, db_flight: Flight) -> Flight:
    return delete(db_flight, db)


def get_all_passenger_in_flight(flight_id: int, db: Session) -> List[Passenger]:
    """
    Get all passengers in a given flight
    """
    passengers = (
        db.query(Passenger)
        .join(Booking, Booking.booking_id == Passenger.booking_id)
        .filter(Booking.flight_id == flight_id)
        .all()
    )

    return passengers


def get_flight_by_citizen_id(citizen_id: str, db: Session) -> Flight:
    db_flight = (
        db.query(Flight)
        .join(Passenger)  # Join the Passenger model to filter by citizen_id
        .filter(Passenger.citizen_id == citizen_id)  # Filter by the citizen_id
        .first()  # Get the first result
    )
    return db_flight


def get_all_flights(db: Session):
    return get_all(Flight, db)


async def delay_flight(flight: FlightDelay, db_flight: Flight, db: Session):
    """
    Delays the flight
    """
    users = get_users_in_flight(flight_id=flight.flight_id, db=db)

    recipents = [str(user.email) for user in users]

    await send_email(
        recipents,
        f"Flight {flight.flight_id} delay",
        f"Flight {flight.flight_id} has been delayed to {flight.actual_arrival_time}",
    )

    return update(db_flight, db, flight.model_dump())


def get_users_in_flight(flight_id: int, db: Session) -> List[User]:
    """
    Used to send email to all users who booked this flight
    """
    bookings: List[Booking] = get_bookings_by_flight(flight_id, db)

    users: List[User] = []

    for booking in bookings:
        user = get_booking_user(booking, db)

        users.append(user)

    return users


def get_booking_user(db_booking: Booking, db: Session) -> User:
    user: User = db.query(User).filter(User.user_id == db_booking.user_id).first()

    return user


def get_bookings_by_flight(flight_id: int, db: Session) -> List[Booking]:
    bookings: List[Booking] = (
        db.query(Booking)
        .filter(Booking.flight_id == flight_id, Booking.cancelled == False)
        .all()
    )

    return bookings


def get_flight_seats_matrix(flight_id: int, flight_class: FlightClass, db: Session):
    """
    Outputs a matrix of True, False representing seats in a flight class that are either taken or not taken
    """

    # get the passengers in flight_class
    passengers_in_flight_class = (
        db.query(Passenger)
        .join(Booking, Passenger.booking_id == Booking.booking_id)
        .filter(Booking.flight_id == flight_id)
        .filter(Booking.flight_class == flight_class.value)
        .options(
            joinedload(Passenger.booking)
        )  # Optional: Eager loading for related data
    ).all()

    flight_seat = get_flight_seat_by_flight_id_and_class(
        db, flight_id, flight_class.value
    )

    max_seat_row: int = conint(flight_seat.max_row_seat)
    max_seat_col: int = seat_col_to_int(str(flight_seat.max_col_seat))
    # seat_row and seat_col are 1-based
    passengers_seats_in_flight_class = [
        (conint(passenger.seat_row), seat_col_to_int(str(passenger.seat_col)))
        for passenger in passengers_in_flight_class
    ]

    # Initialize the seat matrix
    seat_matrix = [[False for _ in range(max_seat_col)] for _ in range(max_seat_row)]

    for passenger_seats in passengers_seats_in_flight_class:
        seat_row, seat_col = passenger_seats

        seat_matrix[seat_row][seat_col] = True

    return seat_matrix


def create_flight_seats_for_flight(
    flight: FlightCreate, db_flight: Flight, db: Session
):
    flight_seats: List[FlightSeatsCreate] = flight.flight_seats

    for flight_seat in flight_seats:
        flight_seat.flight_id = conint(db_flight.flight_id)
        create_flight_seat(db, flight_seat)

    return {"message": "flight successfully created"}
