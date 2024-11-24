
-- Create the "users" table
CREATE TABLE IF NOT EXISTS "users" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- Create the "passengers" table
CREATE TABLE IF NOT EXISTS "passengers" (
    passenger_id INTEGER PRIMARY KEY,
    passport_number VARCHAR(255),
    gender BOOLEAN,
    phone_number VARCHAR(20),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    nationality VARCHAR(255),
    date_of_birth TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (passenger_id) REFERENCES "users"(id) ON DELETE CASCADE
);

-- Create the "admin" table
CREATE TABLE IF NOT EXISTS "admin" (
    admin_id INTEGER PRIMARY KEY,
    CONSTRAINT fk_admin FOREIGN KEY (admin_id) REFERENCES "users"(id) ON DELETE CASCADE
);

-- Create the "airplane_model" table
CREATE TABLE IF NOT EXISTS "airplane_model" (
    airplane_model_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    manufacturer VARCHAR(255),
    total_seats INTEGER
);
-- Create the "airport" table
CREATE TABLE IF NOT EXISTS "airport" (
    airport_code VARCHAR(10) PRIMARY KEY,
    city VARCHAR(255),
    name VARCHAR(255)
);

-- Create the "airplane" table
CREATE TABLE IF NOT EXISTS "airplane" (
    airplane_id SERIAL PRIMARY KEY,
    airplane_model_id INTEGER,
    registration_number VARCHAR(255) UNIQUE NOT NULL,
    current_airport_code VARCHAR(10),
    CONSTRAINT fk_airplane_model FOREIGN KEY (airplane_model_id) REFERENCES "airplane_model"(airplane_model_id),
    CONSTRAINT fk_airport FOREIGN KEY (current_airport_code) REFERENCES "airport"(airport_code)
);

-- Create the "flight" table
CREATE TABLE IF NOT EXISTS "flight" (
    flight_id SERIAL PRIMARY KEY,
    airplane_id INTEGER,
    estimated_departure_time TIMESTAMP,
    actual_departure_time TIMESTAMP,
    estimated_arrival_time TIMESTAMP,
    actual_arrival_time TIMESTAMP,
    destination_airport_code VARCHAR(10),
    status VARCHAR(50),
    CONSTRAINT fk_airplane FOREIGN KEY (airplane_id) REFERENCES "airplane"(airplane_id),
    CONSTRAINT fk_airport FOREIGN KEY (destination_airport_code) REFERENCES "airport"(airport_code) ON DELETE CASCADE
);

-- Create the "flight_seats" table
CREATE TABLE IF NOT EXISTS "flight_seats" (
    flight_seats_id SERIAL PRIMARY KEY,
    flight_id INTEGER,
    travel_class VARCHAR(50),
    available_seats INTEGER,
    CONSTRAINT fk_flight FOREIGN KEY (flight_id) REFERENCES "flight"(flight_id) ON DELETE CASCADE
);

-- Create the "booking" table
CREATE TABLE IF NOT EXISTS "booking" (
    booking_id SERIAL PRIMARY KEY,
    passenger_id INTEGER,
    number_of_adults INTEGER,
    number_of_children INTEGER,
    flight_class VARCHAR(50) CHECK (flight_class IN ('Economy', 'Business', 'First Class')),
    cancelled BOOLEAN DEFAULT FALSE,
    flight_id INTEGER,
    booking_date TIMESTAMP,
    CONSTRAINT fk_passenger FOREIGN KEY (passenger_id) REFERENCES "passengers"(passenger_id) ON DELETE CASCADE,
    CONSTRAINT fk_flight FOREIGN KEY (flight_id) REFERENCES "flight"(flight_id) ON DELETE CASCADE
);

-- Create the "payment" table
CREATE TABLE IF NOT EXISTS "payment" (
    payment_id SERIAL PRIMARY KEY,
    transaction_date_time TIMESTAMP,
    amount INTEGER,
    currency VARCHAR(3) DEFAULT 'USD',
    payment_method VARCHAR(50),
    status VARCHAR(50) DEFAULT 'pending',
    booking_id INTEGER UNIQUE,
    CONSTRAINT fk_booking FOREIGN KEY (booking_id) REFERENCES "booking"(booking_id) ON DELETE CASCADE
);
-- Insert sample users
INSERT INTO "users" (email, password, created_at) VALUES
('john.doe@email.com', 'hashed_password_1', '2024-01-01 10:00:00'),
('jane.smith@email.com', 'hashed_password_2', '2024-01-02 11:00:00'),
('admin@airline.com', 'admin_password_1', '2024-01-01 09:00:00'),
('mike.wilson@email.com', 'hashed_password_3', '2024-01-03 12:00:00'),
('sarah.brown@email.com', 'hashed_password_4', '2024-01-04 13:00:00');

-- Insert sample passengers
INSERT INTO "passengers" (passenger_id, passport_number, gender, phone_number, first_name, last_name, nationality, date_of_birth) VALUES
(1, 'AB123456', TRUE, '+1234567890', 'John', 'Doe', 'American', '1990-05-15 00:00:00'),
(2, 'CD789012', FALSE, '+2345678901', 'Jane', 'Smith', 'British', '1985-08-22 00:00:00'),
(4, 'EF345678', TRUE, '+3456789012', 'Mike', 'Wilson', 'Canadian', '1988-03-30 00:00:00'),
(5, 'GH901234', FALSE, '+4567890123', 'Sarah', 'Brown', 'Australian', '1992-11-18 00:00:00');

-- Insert sample admin
INSERT INTO "admin" (admin_id) VALUES
(3);

-- Insert sample airplane models
INSERT INTO "airplane_model" (name, manufacturer, total_seats) VALUES
('Boeing 737-800', 'Boeing', 189),
('Airbus A320', 'Airbus', 180),
('Boeing 787-9', 'Boeing', 290),
('Airbus A350-900', 'Airbus', 325);

-- Insert sample airports
INSERT INTO "airport" (airport_code, city, name) VALUES
('JFK', 'New York', 'John F. Kennedy International Airport'),
('LAX', 'Los Angeles', 'Los Angeles International Airport'),
('LHR', 'London', 'Heathrow Airport'),
('SYD', 'Sydney', 'Sydney Airport'),
('YVR', 'Vancouver', 'Vancouver International Airport');

-- Insert sample airplanes
INSERT INTO "airplane" (airplane_model_id, registration_number, current_airport_code) VALUES
(1, 'N12345', 'JFK'),
(2, 'N67890', 'LAX'),
(3, 'G-ABCD', 'LHR'),
(4, 'VH-ABC', 'SYD');

-- Insert sample flights
INSERT INTO "flight" (airplane_id, estimated_departure_time, actual_departure_time, estimated_arrival_time, actual_arrival_time, destination_airport_code, status) VALUES
(1, '2024-11-25 10:00:00', NULL, '2024-11-25 13:00:00', NULL, 'LAX', 'Scheduled'),
(2, '2024-11-25 14:00:00', NULL, '2024-11-26 08:00:00', NULL, 'LHR', 'Scheduled'),
(3, '2024-11-25 16:00:00', NULL, '2024-11-26 02:00:00', NULL, 'SYD', 'Scheduled'),
(4, '2024-11-25 18:00:00', NULL, '2024-11-26 00:00:00', NULL, 'YVR', 'Scheduled');

-- Insert sample flight seats
INSERT INTO "flight_seats" (flight_id, travel_class, available_seats) VALUES
(1, 'Economy', 150),
(1, 'Business', 30),
(1, 'First Class', 9),
(2, 'Economy', 140),
(2, 'Business', 32),
(2, 'First Class', 8),
(3, 'Economy', 220),
(3, 'Business', 48),
(3, 'First Class', 22),
(4, 'Economy', 250),
(4, 'Business', 52),
(4, 'First Class', 23);

-- Insert sample bookings
INSERT INTO "booking" (passenger_id, number_of_adults, number_of_children, flight_class, cancelled, flight_id, booking_date) VALUES
(1, 2, 1, 'Economy', FALSE, 1, '2024-11-01 10:00:00'),
(2, 1, 0, 'Business', FALSE, 2, '2024-11-02 11:00:00'),
(4, 2, 2, 'Economy', FALSE, 3, '2024-11-03 12:00:00'),
(5, 1, 0, 'First Class', FALSE, 4, '2024-11-04 13:00:00');

-- Insert sample payments
INSERT INTO "payment" (transaction_date_time, amount, currency, payment_method, status, booking_id) VALUES
('2024-11-01 10:05:00', 1500, 'USD', 'Credit Card', 'completed', 1),
('2024-11-02 11:05:00', 2500, 'USD', 'Credit Card', 'completed', 2),
('2024-11-03 12:05:00', 2000, 'USD', 'PayPal', 'completed', 3),
('2024-11-04 13:05:00', 3500, 'USD', 'Credit Card', 'completed', 4);
