
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
    flight_price FLOAT,
    child_multiplier FLOAT,
    available_seats INTEGER
);


-- Insert sample users (Mix of passengers and admins)

INSERT INTO "users" (email, password, created_at) VALUES
('john.doe@email.com', 'hashed_password_1', '2024-01-01 10:00:00'),
('jane.smith@email.com', 'hashed_password_2', '2024-01-02 11:00:00'),
('admin1@airline.com', 'admin_password_1', '2024-01-01 09:00:00'),
('mike.wilson@email.com', 'hashed_password_3', '2024-01-03 12:00:00'),
('sarah.brown@email.com', 'hashed_password_4', '2024-01-04 13:00:00'),
('admin2@airline.com', 'admin_password_2', '2024-01-02 09:00:00'),
('emma.davis@email.com', 'hashed_password_5', '2024-01-05 14:00:00'),
('james.wilson@email.com', 'hashed_password_6', '2024-01-06 15:00:00'),
('admin3@airline.com', 'admin_password_3', '2024-01-03 09:00:00'),
('olivia.miller@email.com', 'hashed_password_7', '2024-01-07 16:00:00'),
('lucas.johnson@email.com', 'hashed_password_8', '2024-01-08 17:00:00'),
('isabella.moore@email.com', 'hashed_password_9', '2024-01-09 18:00:00'),
('admin4@airline.com', 'admin_password_4', '2024-01-04 09:00:00'),
('mason.lee@email.com', 'hashed_password_10', '2024-01-10 19:00:00'),
('mia.anderson@email.com', 'hashed_password_11', '2024-01-11 20:00:00'),
('admin5@airline.com', 'admin_password_5', '2024-01-05 09:00:00'),
('benjamin.white@email.com', 'hashed_password_12', '2024-01-12 21:00:00'),
('sophia.harris@email.com', 'hashed_password_13', '2024-01-13 22:00:00'),
('admin6@airline.com', 'admin_password_6', '2024-01-06 09:00:00'),
('liam.roberts@email.com', 'hashed_password_14', '2024-01-14 23:00:00');

-- Insert passengers (passenger_id will auto-increment)
INSERT INTO "passengers" (passenger_id, passport_number, gender, phone_number, first_name, last_name, nationality, date_of_birth) VALUES
(1, 'AB123456', TRUE, '+1234567890', 'John', 'Doe', 'American', '1990-05-15 00:00:00'),
(2, 'CD789012', FALSE, '+2345678901', 'Jane', 'Smith', 'British', '1985-08-22 00:00:00'),
(3, 'EF345678', TRUE, '+3456789012', 'Mike', 'Wilson', 'Canadian', '1988-03-30 00:00:00'),
(4, 'GH901234', FALSE, '+4567890123', 'Sarah', 'Brown', 'Australian', '1992-11-18 00:00:00'),
(5, 'IJ567890', FALSE, '+5678901234', 'Emma', 'Davis', 'French', '1991-07-25 00:00:00'),
(6, 'KL123789', TRUE, '+6789012345', 'James', 'Wilson', 'German', '1987-09-12 00:00:00'),
(7, 'MN456012', FALSE, '+7890123456', 'Olivia', 'Miller', 'Spanish', '1993-04-08 00:00:00');

-- Insert admins (admin_id will auto-increment from user ids)
INSERT INTO "admin" (admin_id) VALUES
(3),
(6),
(9);

-- Insert airplane models (airplane_model_id will auto-increment)
INSERT INTO "airplane_model" (name, manufacturer, total_seats) VALUES
('Boeing 737 MAX 9', 'Boeing', 178),
('Airbus A321neo', 'Airbus', 244),
('Boeing 777X', 'Boeing', 426),
('Airbus A220-300', 'Airbus', 149),
('Boeing 767-300ER', 'Boeing', 269),
('Airbus A310', 'Airbus', 280),
('Boeing 757-300', 'Boeing', 243),
('Concorde', 'Aérospatiale/BAC', 100),
('McDonnell Douglas MD-80', 'McDonnell Douglas', 172),
('Lockheed L-1011 TriStar', 'Lockheed', 400),
('Bombardier CRJ900', 'Bombardier', 90),
('Embraer E195-E2', 'Embraer', 146),
('Tupolev Tu-154', 'Tupolev', 180),
('Ilyushin Il-96-300', 'Ilyushin', 262),
('COMAC C919', 'COMAC', 168);
-- Insert airports (airport_id will auto-increment)

INSERT INTO "airport" (airport_code, city, name) VALUES
('SFO', 'San Francisco', 'San Francisco International Airport'),
('MIA', 'Miami', 'Miami International Airport'),
('SEA', 'Seattle', 'Seattle-Tacoma International Airport'),
('DFW', 'Dallas', 'Dallas/Fort Worth International Airport'),
('PHX', 'Phoenix', 'Phoenix Sky Harbor International Airport'),
('BOS', 'Boston', 'Logan International Airport'),
('MSP', 'Minneapolis', 'Minneapolis–Saint Paul International Airport'),
('LAS', 'Las Vegas', 'Harry Reid International Airport'),
('PHL', 'Philadelphia', 'Philadelphia International Airport'),
('DCA', 'Washington, D.C.', 'Ronald Reagan Washington National Airport'),
('IAD', 'Washington, D.C.', 'Washington Dulles International Airport'),
('EWR', 'Newark', 'Newark Liberty International Airport'),
('MUC', 'Munich', 'Munich Airport'),
('FCO', 'Rome', 'Leonardo da Vinci–Fiumicino Airport'),
('ZRH', 'Zurich', 'Zurich Airport'),
('VIE', 'Vienna', 'Vienna International Airport'),
('ARN', 'Stockholm', 'Stockholm Arlanda Airport'),
('HEL', 'Helsinki', 'Helsinki-Vantaa Airport'),
('OSL', 'Oslo', 'Oslo Gardermoen Airport'),
('CPH', 'Copenhagen', 'Copenhagen Airport'),
('KUL', 'Kuala Lumpur', 'Kuala Lumpur International Airport'),
('BOM', 'Mumbai', 'Chhatrapati Shivaji Maharaj International Airport'),
('PVG', 'Shanghai', 'Shanghai Pudong International Airport'),
('KIX', 'Osaka', 'Kansai International Airport'),
('NRT', 'Tokyo', 'Narita International Airport'),
('GIG', 'Rio de Janeiro', 'Rio de Janeiro–Galeão International Airport'),
('LIM', 'Lima', 'Jorge Chávez International Airport'),
('SCL', 'Santiago', 'Arturo Merino Benítez International Airport'),
('AKL', 'Auckland', 'Auckland Airport'),
('PER', 'Perth', 'Perth Airport'),
('DOH', 'Doha', 'Hamad International Airport'),
('JED', 'Jeddah', 'King Abdulaziz International Airport');
-- Insert airplanes (airplane_id will auto-increment)
INSERT INTO "airplane" (airplane_model_id, registration_number, current_airport_id) VALUES
(1, 'N12345', 1),
(2, 'N67890', 2),
(3, 'G-ABCD', 3),
(4, 'F-HIJK', 4),
(3, 'A6-EFG', 5),
(5, '9V-ABC', 6),
(3, 'JA-123', 7),
(4, 'VH-ABC', 8),
(3, 'PH-XYZ', 9),
(1, 'D-EFGH', 10),
(1, 'HL-AAA', 11),
(1, 'B-HKGX', 12),
(3, 'HS-THA', 13),
(4, 'TC-IST', 14),
(2, 'EC-BCN', 15),
(2, 'N12346', 16),
(1, 'N67891', 17),
(1, 'C-FABC', 18),
(1, 'EP-IRI', 19),
(2, 'VT-IND', 20),
(2, 'B-PEK1', 21),
(2, 'PT-SP1', 22),
(2, 'ZS-OR1', 23),
(2, 'XA-MEX', 24),
(2, 'ZS-CPT', 25),
(2, 'PK-GAR', 5),
(2, 'VN-AIR', 6),
(2, 'HL-DMK', 7),
(2, 'JA-HEL', 8),
(3, 'VH-MEL', 9);

-- Insert flights (flight_id will auto-increment)

INSERT INTO "flight" (airplane_id, estimated_departure_time, actual_departure_time, 
                     estimated_arrival_time, actual_arrival_time, departure_airport_id, 
                     destination_airport_id, status) VALUES
(11, '2024-11-25 20:00:00', NULL, '2024-11-26 04:00:00', NULL, 11, 12, 'Scheduled'),
(12, '2024-11-25 21:00:00', NULL, '2024-11-26 05:00:00', NULL, 12, 13, 'Scheduled'),
(13, '2024-11-25 22:00:00', NULL, '2024-11-26 06:00:00', NULL, 13, 14, 'Scheduled'),
(14, '2024-11-25 23:00:00', NULL, '2024-11-26 07:00:00', NULL, 14, 15, 'Scheduled'),
(15, '2024-11-26 00:00:00', NULL, '2024-11-26 08:00:00', NULL, 15, 16, 'Scheduled'),
(16, '2024-11-26 01:00:00', NULL, '2024-11-26 09:00:00', NULL, 16, 17, 'Scheduled'),
(17, '2024-11-26 02:00:00', NULL, '2024-11-26 10:00:00', NULL, 17, 18, 'Scheduled'),
(18, '2024-11-26 03:00:00', NULL, '2024-11-26 11:00:00', NULL, 18, 19, 'Scheduled'),
(19, '2024-11-26 04:00:00', NULL, '2024-11-26 12:00:00', NULL, 19, 20, 'Scheduled'),
(20, '2024-11-26 05:00:00', NULL, '2024-11-26 13:00:00', NULL, 20, 21, 'Scheduled'),
(21, '2024-11-26 06:00:00', NULL, '2024-11-26 14:00:00', NULL, 21, 22, 'Scheduled'),
(22, '2024-11-26 07:00:00', NULL, '2024-11-26 15:00:00', NULL, 22, 23, 'Scheduled'),
(23, '2024-11-26 08:00:00', NULL, '2024-11-26 16:00:00', NULL, 23, 24, 'Scheduled'),
(24, '2024-11-26 09:00:00', NULL, '2024-11-26 17:00:00', NULL, 24, 25, 'Scheduled'),
(25, '2024-11-26 10:00:00', NULL, '2024-11-26 18:00:00', NULL, 25, 26, 'Scheduled'),
(26, '2024-11-26 11:00:00', NULL, '2024-11-26 19:00:00', NULL, 26, 27, 'Scheduled'),
(27, '2024-11-26 12:00:00', NULL, '2024-11-26 20:00:00', NULL, 27, 28, 'Scheduled'),
(28, '2024-11-26 13:00:00', NULL, '2024-11-26 21:00:00', NULL, 28, 29, 'Scheduled'),
(29, '2024-11-26 14:00:00', NULL, '2024-11-26 22:00:00', NULL, 29, 30, 'Scheduled'),
(30, '2024-11-26 15:00:00', NULL, '2024-11-26 23:00:00', NULL, 30, 31, 'Scheduled');
-- Insert flight seats for each flight
-- Insert sample data into flight_seats
INSERT INTO "flight_seats" (flight_id, flight_class, flight_price, child_multiplier, available_seats) VALUES
-- Flight 1 (Boeing 737-800)
(1, 'Economy', 100.0, 0.8, 150),
(1, 'Business', 200.0, 0.7, 30),
(1, 'First Class', 500.0, 0.6, 9),
-- Flight 2 (Airbus A320)
(2, 'Economy', 100.0, 0.8, 144),
(2, 'Business', 200.0, 0.7, 28),
(2, 'First Class', 500.0, 0.6, 8),
-- Flight 3 (Boeing 787-9)
(3, 'Economy', 100.0, 0.8, 220),
(3, 'Business', 200.0, 0.7, 48),
(3, 'First Class', 500.0, 0.6, 22),
-- Flight 15 (Unknown)
(15, 'Economy', 100.0, 0.8, 320),
(15, 'Business', 200.0, 0.7, 65),
(15, 'First Class', 500.0, 0.6, 25);

-- Insert bookings (booking_id will auto-increment)
INSERT INTO "booking" (passenger_id, number_of_adults, number_of_children,
                       flight_class, cancelled, flight_id, booking_date) VALUES
(1, 2, 1, 'Economy', FALSE, 1, '2024-11-01 10:00:00'),
(2, 1, 0, 'Business', FALSE, 2, '2024-11-02 11:00:00'),
(4, 2, 2, 'Economy', FALSE, 3, '2024-11-03 12:00:00'),
(5, 1, 0, 'First Class', FALSE, 4, '2024-11-04 13:00:00'),
(4, 2, 1, 'Economy', FALSE, 5, '2024-11-05 14:00:00'),
(5, 1, 0, 'Business', FALSE, 6, '2024-11-06 15:00:00'),
(6, 2, 0, 'First Class', FALSE, 7, '2024-11-07 16:00:00'),
(1, 1, 1,'Economy', FALSE, 8, '2024-11-08 17:00:00'),
(2, 2, 0,'Business', FALSE, 9, '2024-11-09 18:00:00'),
(4, 1, 0,'First Class', FALSE, 10, '2024-11-10 19:00:00');

-- Insert payments (payment_id will auto-increment)
INSERT INTO "payment" (transaction_date_time, amount, currency, 
                       payment_method, status, booking_id) VALUES
('2024-11-01 10:05:00', 1500, 'USD', 'Credit Card', 'completed', 1),
('2024-11-02 11:05:00', 2500, 'USD', 'Credit Card', 'completed', 2),
('2024-11-03 12:05:00', 2000, 'USD', 'PayPal', 'completed', 3),
('2024-11-04 13:05:00', 3500, 'USD', 'Credit Card', 'completed', 4),
('2024-11-05 14:05:00', 1800, 'USD', 'Debit Card', 'completed', 5),
('2024-11-06 15:05:00', 2700, 'USD', 'Credit Card', 'completed', 6),
('2024-11-07 16:05:00', 4000, 'USD', 'PayPal', 'completed', 7),
('2024-11-08 17:05:00', 1200, 'USD', 'Credit Card', 'completed', 8),
('2024-11-09 18:05:00', 2800, 'USD', 'Debit Card', 'completed', 9),
('2024-11-10 19:05:00', 3800, 'USD', 'Credit Card', 'completed', 10);

