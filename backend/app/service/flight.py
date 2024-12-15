from datetime import datetime, timedelta
from service.airport import get_city_by_airport_id
from sqlalchemy.orm import joinedload
from fastapi import HTTPException
from sqlalchemy.orm import Session, aliased
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
from app.service.email import is_valid_email, send_email
from app.service.service_utils import seat_col_to_int, conint


# CRUD for Flight
def create_flight(db: Session, flight: FlightCreate) -> Flight:
    # Lấy máy bay từ database
    # airplane = (
    #     db.query(Airplane).filter(Airplane.registration_number == flight.registration_number).first()
    # )

    flight_data = flight.model_dump()
    # flight_data["departure_airport_id"] = airplane.current_airport_id
    db_flight = create(Flight, db, flight_data)

    # create_flight_seats_for_flight(flight, db_flight, db)

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
        if flight.actual_departure_time and flight.actual_arrival_time:
            duration: timedelta = (
                flight.actual_arrival_time - flight.actual_departure_time
            )
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

        # Calculate the available seats
        flight_seat_matrix = []
        total_available_seats = 0
        for flight_class in FlightClass:
            seat_matrix = get_flight_seats_matrix(
                flight_id=flight.flight_id, flight_class=flight_class, db=db
            )
            available_seats = count_available_seat(seat_matrix)
            total_available_seats += available_seats
            flight_seat_matrix.append([flight_class.value, available_seats])
        print(flight.flight_number, "BUIDUCANH")
        result.append(
            {
                "id": flight.flight_id,
                "departureTime": flight.estimated_departure_time.strftime("%H:%M"),
                "arrivalTime": flight.estimated_arrival_time.strftime("%H:%M"),
                "from": dep_airport.city,
                "to": arr_airport.city,
                "departure_airport_code": dep_airport.airport_code,
                "arrival_airport_code": arr_airport.airport_code,
                "seatsLeft": total_available_seats,
                "flightNumber": str(
                    flight.flight_number
                ),  # Bạn cần thay đổi giá trị này theo dữ liệu thực tế
                "price": flight.flight_price,  # Bạn cần thay đổi giá trị này theo dữ liệu thực tế
                "flightDate": flight.estimated_departure_time.strftime("%A, %d %B"),
                "flightRoute": f"{dep_airport.city} - {arr_airport.city}",
                "departureDetailTime": departure_time,
                "departureAirport": f"{dep_airport.name}, {dep_airport.city}",
                "arrivalDetailTime": arrival_time,
                "arrivalAirport": f"{arr_airport.name}, {arr_airport.city}",
                "duration": formatted_duration, 
                "flight_seat_matrix": flight_seat_matrix,
            }
        )
    return result


def update_flight(db: Session, db_flight: Flight, flight: FlightUpdate) -> Flight:
    return update(db_flight, db, flight.model_dump())


def delete_flight(db: Session, db_flight: Flight) -> Flight:
    return delete(db_flight, db)


def get_all_passenger_in_flight(flight_id: int, db: Session):
    """
    Get all passengers in a given flight
    """
    db_passengers = (
        db.query(Passenger, Booking.flight_class)
        .select_from(Passenger)
        .join(Booking, Booking.booking_id == Passenger.booking_id)
        .join(Flight, Booking.flight_id == Flight.flight_id)
        .filter(Flight.flight_id == flight_id)
        .all()
    )

    passengers = []
    for db_passenger, flight_class in db_passengers:
        passengers.append({"passenger": db_passenger, "flight_class": flight_class})

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
    # Truy vấn tất cả các flights
    flights = db.query(Flight).all()

    result = []
    for flight in flights:
        # Tìm thông tin departure airport
        departure_airport = get_city_by_airport_id(db, flight.departure_airport_id)

        # Tìm thông tin destination airport
        destination_airport = get_city_by_airport_id(db, flight.destination_airport_id)

        # Tạo dictionary flight với thông tin thành phố
        flight_dict = flight.__dict__.copy()
        flight_dict["departure_city"] = (
            departure_airport.city if departure_airport else None
        )
        flight_dict["destination_city"] = (
            destination_airport.city if destination_airport else None
        )

        # Loại bỏ các thuộc tính không cần thiết
        flight_dict.pop("departure_airport_id", None)
        flight_dict.pop("destination_airport_id", None)

        result.append(flight_dict)

    return result


async def delay_flight(flight: FlightDelay, db_flight: Flight, db: Session):
    """
    Delays the flight
    """
    user_emails = get_user_emails_in_flight(flight_id=flight.flight_id, db=db)

    recipents = [email for email in user_emails if is_valid_email(email)]

    if recipents:
        await send_email(
            recipents,
            f"Flight {db_flight.flight_number} delay",
            f"Flight {db_flight.flight_number} has been delayed to {flight.actual_arrival_time}",
        )

    return update(db_flight, db, flight.model_dump())


def get_user_emails_in_flight(flight_id: int, db: Session) -> List[str]:
    """
    Used to send email to all users who booked this flight
    """
    bookings: List[Booking] = get_bookings_by_flight(flight_id, db)

    bookers_email: List[str] = []

    for booking in bookings:
        bookers_email.append(str(booking.booker_email))
    return bookers_email


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
        (conint(passenger.seat_row) - 1, seat_col_to_int(str(passenger.seat_col)) - 1)
        for passenger in passengers_in_flight_class
    ]

    # Initialize the seat matrix
    seat_matrix = [[False for _ in range(max_seat_col)] for _ in range(max_seat_row)]

    for passenger_seats in passengers_seats_in_flight_class:
        seat_row, seat_col = passenger_seats

        seat_matrix[seat_row][seat_col] = True

    return seat_matrix


def get_flight_price(flight_id: int, flight_class: str, db: Session) -> float:
    """
    Get the price of a flight in a given class
    """
    flight = get_flight(db, flight_id)
    flight_seats = get_flight_seat_by_flight_id_and_class(db, flight_id, flight_class)

    return flight_seats.class_multiplier * flight.flight_price

def count_available_seat(seat_matrix: list[list[bool]]) -> int:
    """
    Count the number of available seats in a given seat matrix
    """
    available_seats = 0
    for row in seat_matrix:
        available_seats += row.count(False)
    return available_seats