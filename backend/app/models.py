from sqlalchemy import (
    Boolean,
    Column,
    ForeignKey,
    Integer,
    String,
    Float,
    DECIMAL,
    Text,
    DateTime,
    Enum,
    CheckConstraint
)
from sqlalchemy.orm import relationship
from core.database import Base
from datetime import datetime
from enum import Enum as PyEnum


class FlightClass(PyEnum):
    Economy = "Economy"
    Business = "Business"
    FirstClass = "First Class"


class Admin(Base):
    __tablename__ = "admin"

    admin_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    password = Column(String)


class Passenger(Base):
    __tablename__ = "passengers"

    passenger_id = Column(
        Integer, primary_key=True, autoincrement=True
    )  # Auto-incrementing primary key
    booking_id = Column(
        Integer, ForeignKey("booking.booking_id", ondelete="CASCADE"), nullable=False
    )
    citizen_id = Column(String, nullable=True)
    passport_number = Column(String, nullable=True)  # Optional passport number
    gender = Column(Boolean, nullable=False)  # TRUE for male, FALSE for female
    phone_number = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    nationality = Column(String, nullable=False)
    date_of_birth = Column(DateTime, nullable=False)
    seat_row = Column(Integer, nullable=False)
    seat_col = Column(String, nullable=False)
    # Relationship to booking
    booking = relationship("Booking", back_populates="passengers")


class Booking(Base):
    __tablename__ = "booking"

    booking_id = Column(
        Integer, primary_key=True, index=True
    )  # Unique identifier for each booking
    booker_email = Column(String, nullable=False)
    number_of_adults = Column(Integer, nullable=False)
    number_of_children = Column(Integer, nullable=False)
    flight_class = Column(
        String, nullable=False
    )  # Booking class (e.g., economy, business)
    cancelled = Column(Boolean, default=False)  # Whether the booking was cancelled
    flight_id = Column(
        Integer, ForeignKey("flight.flight_id", ondelete="CASCADE"), nullable=False
    )
    booking_date = Column(DateTime, default="now()")  # Defaults to current timestamp

    __table_args__ = (
        CheckConstraint("number_of_adults >= 0", name="check_number_of_adults"),
        CheckConstraint("number_of_children >= 0", name="check_number_of_children"),
    )

    passengers = relationship(
        "Passenger", back_populates="booking", cascade="all, delete-orphan"
    )


class Payment(Base):
    __tablename__ = "payment"

    payment_id = Column(Integer, primary_key=True, index=True)
    transaction_date_time = Column(DateTime)
    amount = Column(Integer)
    currency = Column(String, default="USD")
    payment_method = Column(String)
    status = Column(String, default="pending")
    booking_id = Column(
        Integer, ForeignKey("booking.booking_id", ondelete="CASCADE"), unique=True
    )


class Flight(Base):
    __tablename__ = "flight"

    flight_id = Column(Integer, primary_key=True, index=True)
    airplane_id = Column(Integer, ForeignKey("airplane.airplane_id"))
    estimated_departure_time = Column(DateTime)
    actual_departure_time = Column(DateTime)
    estimated_arrival_time = Column(DateTime)
    actual_arrival_time = Column(DateTime)
    departure_airport_id = Column(
        Integer, ForeignKey("airport.airport_id", ondelete="CASCADE")
    )
    destination_airport_id = Column(
        Integer, ForeignKey("airport.airport_id", ondelete="CASCADE")
    )
    status = Column(String)


class AirplaneModel(Base):
    __tablename__ = "airplane_model"

    airplane_model_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    manufacturer = Column(String)
    total_seats = Column(Integer)

     # Thêm relationship
    airplanes = relationship("Airplane", back_populates="airplane_model")


class Airplane(Base):
    __tablename__ = "airplane"

    airplane_id = Column(Integer, primary_key=True, index=True)
    airplane_model_id = Column(
        Integer, ForeignKey("airplane_model.airplane_model_id", ondelete="CASCADE")
    )
    registration_number = Column(String, unique=True)
    current_airport_id = Column(
        Integer, ForeignKey("airport.airport_id", ondelete="CASCADE")
    )

    # Thêm relationship
    airplane_model = relationship("AirplaneModel", back_populates="airplanes")
    current_airport = relationship("Airport", back_populates="airplanes")


class Airport(Base):
    __tablename__ = "airport"

    airport_id = Column(Integer, primary_key=True, index=True)
    airport_code = Column(String, index=True)
    city = Column(String)
    name = Column(String)

    airplanes = relationship("Airplane", back_populates="current_airport")


class FlightSeats(Base):
    __tablename__ = "flight_seats"

    flight_seats_id = Column(Integer, primary_key=True, index=True)
    flight_id = Column(
        Integer, ForeignKey("flight.flight_id", ondelete="CASCADE"), nullable=False
    )
    flight_class = Column(String, nullable=False)
    flight_price = Column(Float, nullable=True)
    child_multiplier = Column(Float, nullable=True)
    available_seats = Column(Integer, nullable=True)
    max_row_seat = Column(Integer, nullable=False)
    max_col_seat = Column(Integer, nullable=False)

    __table_args__ = (
        CheckConstraint("max_row_seat > 0", name="check_max_row_seat"),
        CheckConstraint("max_col_seat > 0", name="check_max_col_seat"),
    )
