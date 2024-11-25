
CREATE TABLE IF NOT EXISTS "users" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "passengers" (
    passenger_id INTEGER PRIMARY KEY REFERENCES "users"(id) ON DELETE CASCADE,
    passport_number VARCHAR(255),
    gender BOOLEAN,
    phone_number VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    nationality VARCHAR(255),
    date_of_birth TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "admin" (
    admin_id INTEGER PRIMARY KEY REFERENCES "users"(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "airport" (
    airport_id SERIAL PRIMARY KEY,
    airport_code VARCHAR(255) UNIQUE NOT NULL,
    city VARCHAR(255),
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS "airplane_model" (
    airplane_model_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    manufacturer VARCHAR(255),
    total_seats INTEGER
);

CREATE TABLE IF NOT EXISTS "airplane" (
    airplane_id SERIAL PRIMARY KEY,
    airplane_model_id INTEGER REFERENCES "airplane_model"(airplane_model_id) ON DELETE CASCADE,
    registration_number VARCHAR(255) UNIQUE,
    current_airport_id INTEGER REFERENCES "airport"(airport_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "flight" (
    flight_id SERIAL PRIMARY KEY,
    airplane_id INTEGER REFERENCES "airplane"(airplane_id),
    estimated_departure_time TIMESTAMP,
    actual_departure_time TIMESTAMP,
    estimated_arrival_time TIMESTAMP,
    actual_arrival_time TIMESTAMP,
    departure_airport_id INTEGER REFERENCES "airport"(airport_id) ON DELETE CASCADE,
    destination_airport_id INTEGER REFERENCES "airport"(airport_id) ON DELETE CASCADE,
    status VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS "booking" (
    booking_id SERIAL PRIMARY KEY,
    passenger_id INTEGER REFERENCES "passengers"(passenger_id) ON DELETE CASCADE,
    number_of_adults INTEGER,
    number_of_children INTEGER,
    flight_class VARCHAR(255) NOT NULL,
    cancelled BOOLEAN DEFAULT FALSE,
    flight_id INTEGER REFERENCES "flight"(flight_id) ON DELETE CASCADE,
    booking_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "payment" (
    payment_id SERIAL PRIMARY KEY,
    transaction_date_time TIMESTAMP,
    amount INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    payment_method VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    booking_id INTEGER UNIQUE REFERENCES "booking"(booking_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS "flight_seats" (
    flight_seats_id SERIAL PRIMARY KEY,
    flight_id INTEGER REFERENCES "flight"(flight_id) ON DELETE CASCADE,
    flight_class VARCHAR(255) NOT NULL,
    available_seats INTEGER
);
-- Insert sample users (Mix of passengers and admins)
INSERT INTO "users" (id, email, password, created_at) VALUES
(1, 'john.doe@email.com', 'hashed_password_1', '2024-01-01 10:00:00'),
(2, 'jane.smith@email.com', 'hashed_password_2', '2024-01-02 11:00:00'),
(3, 'admin1@airline.com', 'admin_password_1', '2024-01-01 09:00:00'),
(4, 'mike.wilson@email.com', 'hashed_password_3', '2024-01-03 12:00:00'),
(5, 'sarah.brown@email.com', 'hashed_password_4', '2024-01-04 13:00:00'),
(6, 'admin2@airline.com', 'admin_password_2', '2024-01-02 09:00:00'),
(7, 'emma.davis@email.com', 'hashed_password_5', '2024-01-05 14:00:00'),
(8, 'james.wilson@email.com', 'hashed_password_6', '2024-01-06 15:00:00'),
(9, 'admin3@airline.com', 'admin_password_3', '2024-01-03 09:00:00'),
(10, 'olivia.miller@email.com', 'hashed_password_7', '2024-01-07 16:00:00');

-- Insert passengers
INSERT INTO "passengers" (passenger_id, passport_number, gender, phone_number, first_name, last_name, nationality, date_of_birth) VALUES
(1, 'AB123456', TRUE, '+1234567890', 'John', 'Doe', 'American', '1990-05-15 00:00:00'),
(2, 'CD789012', FALSE, '+2345678901', 'Jane', 'Smith', 'British', '1985-08-22 00:00:00'),
(4, 'EF345678', TRUE, '+3456789012', 'Mike', 'Wilson', 'Canadian', '1988-03-30 00:00:00'),
(5, 'GH901234', FALSE, '+4567890123', 'Sarah', 'Brown', 'Australian', '1992-11-18 00:00:00'),
(7, 'IJ567890', FALSE, '+5678901234', 'Emma', 'Davis', 'French', '1991-07-25 00:00:00'),
(8, 'KL123789', TRUE, '+6789012345', 'James', 'Wilson', 'German', '1987-09-12 00:00:00'),
(10, 'MN456012', FALSE, '+7890123456', 'Olivia', 'Miller', 'Spanish', '1993-04-08 00:00:00');

-- Insert admins
INSERT INTO "admin" (admin_id) VALUES
(3),
(6),
(9);

-- Insert airplane models
INSERT INTO "airplane_model" (airplane_model_id, name, manufacturer, total_seats) VALUES
(1, 'Boeing 737-800', 'Boeing', 189),
(2, 'Airbus A320', 'Airbus', 180),
(3, 'Boeing 787-9', 'Boeing', 290),
(4, 'Airbus A350-900', 'Airbus', 325),
(5, 'Boeing 777-300ER', 'Boeing', 396),
(6, 'Airbus A330-300', 'Airbus', 290),
(7, 'Boeing 747-8', 'Boeing', 410),
(8, 'Airbus A380-800', 'Airbus', 525);

-- Insert airports
INSERT INTO "airport" (airport_id, airport_code, city, name) VALUES
(1, 'JFK', 'New York', 'John F. Kennedy International Airport'),
(2, 'LAX', 'Los Angeles', 'Los Angeles International Airport'),
(3, 'LHR', 'London', 'Heathrow Airport'),
(4, 'CDG', 'Paris', 'Charles de Gaulle Airport'),
(5, 'DXB', 'Dubai', 'Dubai International Airport'),
(6, 'SIN', 'Singapore', 'Singapore Changi Airport'),
(7, 'HND', 'Tokyo', 'Haneda Airport'),
(8, 'SYD', 'Sydney', 'Sydney Airport'),
(9, 'AMS', 'Amsterdam', 'Amsterdam Airport Schiphol'),
(10, 'FRA', 'Frankfurt', 'Frankfurt Airport'),
(11, 'ICN', 'Seoul', 'Incheon International Airport'),
(12, 'HKG', 'Hong Kong', 'Hong Kong International Airport'),
(13, 'BKK', 'Bangkok', 'Suvarnabhumi Airport'),
(14, 'IST', 'Istanbul', 'Istanbul Airport'),
(15, 'BCN', 'Barcelona', 'Barcelona–El Prat Airport'),
(16, 'ORD', 'Chicago', 'O’Hare International Airport'),
(17, 'ATL', 'Atlanta', 'Hartsfield-Jackson Atlanta International Airport'),
(18, 'YYZ', 'Toronto', 'Toronto Pearson International Airport'),
(19, 'SYZ', 'Shiraz', 'Shiraz International Airport'),
(20, 'DEL', 'Delhi', 'Indira Gandhi International Airport'),
(21, 'PEK', 'Beijing', 'Beijing Capital International Airport'),
(22, 'GRU', 'São Paulo', 'São Paulo–Guarulhos International Airport'),
(23, 'JNB', 'Johannesburg', 'O.R. Tambo International Airport'),
(24, 'MEX', 'Mexico City', 'Mexico City International Airport'),
(25, 'CPT', 'Cape Town', 'Cape Town International Airport');
-- Insert airplanes with registration numbers and current locations
INSERT INTO "airplane" (airplane_id, airplane_model_id, registration_number, current_airport_id) VALUES
(1, 1, 'N12345', 1),
(2, 2, 'N67890', 2),
(3, 3, 'G-ABCD', 3),
(4, 4, 'F-HIJK', 4),
(5, 5, 'A6-EFG', 5),
(6, 6, '9V-ABC', 6),
(7, 7, 'JA-123', 7),
(8, 8, 'VH-ABC', 8),
(9, 1, 'PH-XYZ', 9),
(10, 2, 'D-EFGH', 10),
(11, 3, 'HL-AAA', 11),
(12, 4, 'B-HKGX', 12),
(13, 5, 'HS-THA', 13),
(14, 6, 'TC-IST', 14),
(15, 7, 'EC-BCN', 15),
(16, 1, 'N12346', 16),
(17, 2, 'N67891', 17),
(18, 3, 'C-FABC', 18),
(19, 4, 'EP-IRI', 19),
(20, 5, 'VT-IND', 20),
(21, 6, 'B-PEK1', 21),
(22, 7, 'PT-SP1', 22),
(23, 8, 'ZS-OR1', 23),
(24, 1, 'XA-MEX', 24),
(25, 2, 'ZS-CPT', 25),
(26, 3, 'PK-GAR', 5),
(27, 4, 'VN-AIR', 6),
(28, 5, 'HL-DMK', 7),
(29, 6, 'JA-HEL', 8),
(30, 7, 'VH-MEL', 9);

-- Insert flights
INSERT INTO "flight" (flight_id, airplane_id, estimated_departure_time, actual_departure_time, 
                     estimated_arrival_time, actual_arrival_time, departure_airport_id, 
                     destination_airport_id, status) VALUES
(1, 1, '2024-11-25 10:00:00', NULL, '2024-11-25 18:00:00', NULL, 1, 2, 'Scheduled'),
(2, 2, '2024-11-25 11:00:00', NULL, '2024-11-26 07:00:00', NULL, 2, 3, 'Scheduled'),
(3, 3, '2024-11-25 12:00:00', NULL, '2024-11-25 20:00:00', NULL, 3, 4, 'Scheduled'),
(4, 4, '2024-11-25 13:00:00', NULL, '2024-11-26 01:00:00', NULL, 4, 5, 'Scheduled'),
(5, 5, '2024-11-25 14:00:00', NULL, '2024-11-26 02:00:00', NULL, 5, 6, 'Scheduled'),
(6, 6, '2024-11-25 15:00:00', NULL, '2024-11-26 03:00:00', NULL, 6, 7, 'Scheduled'),
(7, 7, '2024-11-25 16:00:00', NULL, '2024-11-26 00:00:00', NULL, 7, 8, 'Scheduled'),
(8, 8, '2024-11-25 17:00:00', NULL, '2024-11-26 01:00:00', NULL, 8, 9, 'Scheduled'),
(9, 9, '2024-11-25 18:00:00', NULL, '2024-11-26 02:00:00', NULL, 9, 10, 'Scheduled'),
(10, 10, '2024-11-25 19:00:00', NULL, '2024-11-26 03:00:00', NULL, 10, 11, 'Scheduled'),
(11, 11, '2024-11-25 20:00:00', NULL, '2024-11-26 04:00:00', NULL, 11, 12, 'Scheduled'),
(12, 12, '2024-11-25 21:00:00', NULL, '2024-11-26 05:00:00', NULL, 12, 13, 'Scheduled'),
(13, 13, '2024-11-25 22:00:00', NULL, '2024-11-26 06:00:00', NULL, 13, 14, 'Scheduled'),
(14, 14, '2024-11-25 23:00:00', NULL, '2024-11-26 07:00:00', NULL, 14, 15, 'Scheduled'),
(15, 15, '2024-11-26 00:00:00', NULL, '2024-11-26 08:00:00', NULL, 15, 1, 'Scheduled');

-- Insert flight seats for each flight
INSERT INTO "flight_seats" (flight_seats_id, flight_id, flight_class, available_seats) VALUES
-- Flight 1 (Boeing 737-800)
(1, 1, 'Economy', 150),
(2, 1, 'Business', 30),
(3, 1, 'First Class', 9),
-- Flight 2 (Airbus A320)
(4, 2, 'Economy', 144),
(5, 2, 'Business', 28),
(6, 2, 'First Class', 8),
-- Flight 3 (Boeing 787-9)
(7, 3, 'Economy', 220),
(8, 3, 'Business', 48),
(9, 3, 'First Class', 22),
-- Continue for all 15 flights...
(43, 15, 'Economy', 320),
(44, 15, 'Business', 65),
(45, 15, 'First Class', 25);

-- Insert bookings
INSERT INTO "booking" (booking_id, passenger_id, number_of_adults, number_of_children, 
                      flight_class, cancelled, flight_id, booking_date) VALUES
(1, 1, 2, 1, 'Economy', FALSE, 1, '2024-11-01 10:00:00'),
(2, 2, 1, 0, 'Business', FALSE, 2, '2024-11-02 11:00:00'),
(3, 4, 2, 2, 'Economy', FALSE, 3, '2024-11-03 12:00:00'),
(4, 5, 1, 0, 'First Class', FALSE, 4, '2024-11-04 13:00:00'),
(5, 7, 2, 1, 'Economy', FALSE, 5, '2024-11-05 14:00:00'),
(6, 8, 1, 0, 'Business', FALSE, 6, '2024-11-06 15:00:00'),
(7, 10, 2, 0, 'First Class', FALSE, 7, '2024-11-07 16:00:00'),
(8, 1, 1, 1, 'Economy', FALSE, 8, '2024-11-08 17:00:00'),
(9, 2, 2, 0, 'Business', FALSE, 9, '2024-11-09 18:00:00'),
(10, 4, 1, 0, 'First Class', FALSE, 10, '2024-11-10 19:00:00');

-- Insert payments
INSERT INTO "payment" (payment_id, transaction_date_time, amount, currency, 
                      payment_method, status, booking_id) VALUES
(1, '2024-11-01 10:05:00', 1500, 'USD', 'Credit Card', 'completed', 1),
(2, '2024-11-02 11:05:00', 2500, 'USD', 'Credit Card', 'completed', 2),
(3, '2024-11-03 12:05:00', 2000, 'USD', 'PayPal', 'completed', 3),
(4, '2024-11-04 13:05:00', 3500, 'USD', 'Credit Card', 'completed', 4),
(5, '2024-11-05 14:05:00', 1800, 'USD', 'Debit Card', 'completed', 5),
(6, '2024-11-06 15:05:00', 2700, 'USD', 'Credit Card', 'completed', 6),
(7, '2024-11-07 16:05:00', 4000, 'USD', 'PayPal', 'completed', 7),
(8, '2024-11-08 17:05:00', 1200, 'USD', 'Credit Card', 'completed', 8),
(9, '2024-11-09 18:05:00', 2800, 'USD', 'Debit Card', 'completed', 9),
(10, '2024-11-10 19:05:00', 3800, 'USD', 'Credit Card', 'completed', 10);
