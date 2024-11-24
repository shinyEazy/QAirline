from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, DateTime
from app.database import Base
from datetime import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    created_at = Column(DateTime)


class Passenger(Base):
    __tablename__ = "passengers"

    passenger_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    passport_number = Column(String)
    gender = Column(Boolean)
    phone_number = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    nationality = Column(String)
    date_of_birth = Column(DateTime)


class Admin(Base):
    __tablename__ = "admin"

    admin_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )


class Booking(Base):
    __tablename__ = "booking"

    booking_id = Column(Integer, primary_key=True, index=True)
    passenger_id = Column(
        Integer, ForeignKey("passengers.passenger_id", ondelete="CASCADE")
    )
    number_of_adults = Column(Integer)
    number_of_children = Column(Integer)
    flight_class = Column("class", String)
    cancelled = Column(Boolean, default=False)

    flight_id = Column(Integer, ForeignKey("flight.flight_id"), ondelete="CASCADE")
    booking_date = Column(DateTime)


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
    destination_airport_code = Column(
        String, ForeignKey("airport.airport_code", ondelete="CASCADE")
    )
    status = Column(String)


class AirplaneModel(Base):
    __tablename__ = "airplane_model"

    airplane_model_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    manufacturer = Column(String)
    total_seats = Column(Integer)


class Airplane(Base):
    __tablename__ = "airplane"

    airplane_id = Column(Integer, primary_key=True, index=True)
    airplane_model_id = Column(
        Integer, ForeignKey("airplane_model.airplane_model_id", ondelete="CASCADE")
    )
    registration_number = Column(String, unique=True)
    current_airport_code = Column(
        String, ForeignKey("airport.airport_code", ondelete="CASCADE")
    )


class Airport(Base):
    __tablename__ = "airport"

    airport_code = Column(String, primary_key=True, index=True)
    city = Column(String)
    name = Column(String)


class FlightSeats(Base):
    __tablename__ = "flight_seats"

    flight_seats_id = Column(Integer, primary_key=True, index=True)
    flight_id = Column(Integer, ForeignKey("flight.flight_id", ondelete="CASCADE"))
    travel_class = Column(String)
    available_seats = Column(Integer)
