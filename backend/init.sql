-- Create Airport Table
CREATE TABLE airport (
    airport_id SERIAL PRIMARY KEY,
    airport_code TEXT,
    city TEXT,
    name TEXT
);

-- Create Airplane Model Table
CREATE TABLE airplane_model (
    airplane_model_id SERIAL PRIMARY KEY,
    name TEXT,
    manufacturer TEXT,
    total_seats INTEGER
);

-- Create Airplane Table
CREATE TABLE airplane (
    airplane_id SERIAL PRIMARY KEY,
    airplane_model_id INTEGER,
    registration_number TEXT UNIQUE,
    current_airport_id INTEGER,
    FOREIGN KEY (airplane_model_id) REFERENCES airplane_model(airplane_model_id) ON DELETE CASCADE,
    FOREIGN KEY (current_airport_id) REFERENCES airport(airport_id) ON DELETE CASCADE
);

-- Create Flight Table
CREATE TABLE flight (
    flight_id SERIAL PRIMARY KEY,
    airplane_id INTEGER,
    estimated_departure_time TIMESTAMP,
    actual_departure_time TIMESTAMP,
    estimated_arrival_time TIMESTAMP,
    actual_arrival_time TIMESTAMP,
    departure_airport_id INTEGER,
    destination_airport_id INTEGER,
    status TEXT,
    FOREIGN KEY (airplane_id) REFERENCES airplane(airplane_id),
    FOREIGN KEY (departure_airport_id) REFERENCES airport(airport_id) ON DELETE CASCADE,
    FOREIGN KEY (destination_airport_id) REFERENCES airport(airport_id) ON DELETE CASCADE
);

-- Create Flight Seats Table
CREATE TABLE flight_seats (
    flight_seats_id SERIAL PRIMARY KEY,
    flight_id INTEGER NOT NULL,
    flight_class TEXT NOT NULL,
    flight_price REAL,
    child_multiplier REAL,
    available_seats INTEGER,
    max_row_seat INTEGER NOT NULL CHECK (max_row_seat > 0),
    max_col_seat INTEGER NOT NULL CHECK (max_col_seat > 0),
    FOREIGN KEY (flight_id) REFERENCES flight(flight_id) ON DELETE CASCADE
);

-- Create Booking Table
CREATE TABLE booking (
    booking_id SERIAL PRIMARY KEY,
    booker_email TEXT NOT NULL,
    number_of_adults INTEGER NOT NULL CHECK (number_of_adults >= 0),
    number_of_children INTEGER NOT NULL CHECK (number_of_children >= 0),
    flight_class TEXT NOT NULL,
    cancelled BOOLEAN DEFAULT FALSE,
    flight_id INTEGER NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (flight_id) REFERENCES flight(flight_id) ON DELETE CASCADE
);

-- Create Passenger Table
CREATE TABLE passengers (
    booking_id INTEGER NOT NULL,
    citizen_id TEXT PRIMARY KEY,
    passport_number TEXT,
    gender BOOLEAN NOT NULL,
    phone_number TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    nationality TEXT NOT NULL,
    date_of_birth TIMESTAMP NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE
);

-- Create Passenger Seat Table
CREATE TABLE passenger_seat (
    row_seat INTEGER NOT NULL CHECK (row_seat > 0),
    col_seat INTEGER NOT NULL CHECK (col_seat > 0),
    passenger_id INTEGER PRIMARY KEY
);

-- Create Payment Table
CREATE TABLE payment (
    payment_id SERIAL PRIMARY KEY,
    transaction_date_time TIMESTAMP,
    amount INTEGER,
    currency TEXT DEFAULT 'USD',
    payment_method TEXT,
    status TEXT DEFAULT 'pending',
    booking_id INTEGER UNIQUE,
    FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE
);

-- Create Admin Table
CREATE TABLE admin (
    admin_id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT
);

-- Insert Airport Data
INSERT INTO airport (airport_code, city, name) VALUES 
('JFK', 'New York', 'John F. Kennedy International Airport'),
('LAX', 'Los Angeles', 'Los Angeles International Airport'),
('LHR', 'London', 'Heathrow Airport');

-- Insert Airplane Model Data
INSERT INTO airplane_model (name, manufacturer, total_seats) VALUES 
('Boeing 787 Dreamliner', 'Boeing', 330),
('Airbus A350', 'Airbus', 300);

-- Insert Airplane Data
INSERT INTO airplane (airplane_model_id, registration_number, current_airport_id) VALUES 
(1, 'N789BA', 1),
(2, 'G-XWBA', 2);

-- Insert Flight Data
INSERT INTO flight (
    airplane_id, 
    estimated_departure_time, 
    actual_departure_time, 
    estimated_arrival_time, 
    actual_arrival_time, 
    departure_airport_id, 
    destination_airport_id, 
    status
) VALUES 
(1, '2024-06-15 10:00:00', '2024-06-15 10:15:00', '2024-06-15 13:00:00', '2024-06-15 13:10:00', 1, 2, 'Completed'),
(2, '2024-06-16 14:00:00', '2024-06-16 14:00:00', '2024-06-16 22:00:00', NULL, 2, 3, 'In Progress');

-- Insert Flight Seats Data
INSERT INTO flight_seats (
    flight_id, 
    flight_class, 
    flight_price, 
    child_multiplier, 
    available_seats, 
    max_row_seat, 
    max_col_seat
) VALUES 
(1, 'Economy', 250.50, 0.8, 200, 20, 10),
(1, 'Business', 750.75, 0.9, 50, 10, 4);

-- Insert Booking Data
INSERT INTO booking (
    booker_email, 
    number_of_adults, 
    number_of_children, 
    flight_class, 
    cancelled, 
    flight_id, 
    booking_date
) VALUES 
('john.doe@example.com', 2, 1, 'Economy', FALSE, 1, '2024-05-20 09:30:00'),
('jane.smith@example.com', 1, 0, 'Business', FALSE, 2, '2024-05-22 14:45:00');

-- Insert Passenger Data
INSERT INTO passengers (
    booking_id, 
    citizen_id, 
    passport_number, 
    gender, 
    phone_number, 
    first_name, 
    last_name, 
    nationality, 
    date_of_birth
) VALUES 
(1, 'US12345678', 'P987654', TRUE, '+1-555-123-4567', 'John', 'Doe', 'United States', '1985-03-15'),
(1, 'US87654321', 'P123456', FALSE, '+1-555-987-6543', 'Jane', 'Doe', 'United States', '1987-07-22'),
(1, 'US11223344', NULL, FALSE, '+1-555-111-2222', 'Emily', 'Doe', 'United States', '2018-09-10'),
(2, 'UK87654321', 'B456789', TRUE, '+44-7700-900123', 'James', 'Smith', 'United Kingdom', '1990-11-05');

-- Insert Passenger Seat Data
INSERT INTO passenger_seat (row_seat, col_seat, passenger_id) VALUES 
(5, 3, 1),
(5, 4, 2),
(10, 2, 3),
(2, 1, 4);

-- Insert Payment Data
INSERT INTO payment (
    transaction_date_time, 
    amount, 
    currency, 
    payment_method, 
    status, 
    booking_id
) VALUES 
('2024-05-20 10:00:00', 800, 'USD', 'Credit Card', 'completed', 1),
('2024-05-22 15:00:00', 1200, 'USD', 'PayPal', 'completed', 2);

-- Insert Admin Data
INSERT INTO admin (username, password) VALUES 
('admin1', 'hashed_password_1'),
('admin2', 'hashed_password_2');
-- Insert Airport Data
INSERT INTO airport (airport_id, airport_code, city, name) VALUES 
(1, 'JFK', 'New York', 'John F. Kennedy International Airport'),
(2, 'LAX', 'Los Angeles', 'Los Angeles International Airport'),
(3, 'LHR', 'London', 'Heathrow Airport');

-- Insert Airplane Model Data
INSERT INTO airplane_model (airplane_model_id, name, manufacturer, total_seats) VALUES 
(1, 'Boeing 787 Dreamliner', 'Boeing', 330),
(2, 'Airbus A350', 'Airbus', 300);

-- Insert Airplane Data
INSERT INTO airplane (airplane_id, airplane_model_id, registration_number, current_airport_id) VALUES 
(1, 1, 'N789BA', 1),
(2, 2, 'G-XWBA', 2);

-- Insert Flight Data
INSERT INTO flight (
    airplane_id, 
    estimated_departure_time, 
    actual_departure_time, 
    estimated_arrival_time, 
    actual_arrival_time, 
    departure_airport_id, 
    destination_airport_id, 
    status
) VALUES 
(1, '2024-06-15 10:00:00', '2024-06-15 10:15:00', '2024-06-15 13:00:00', '2024-06-15 13:10:00', 1, 2, 'Completed'),
(2, '2024-06-16 14:00:00', '2024-06-16 14:00:00', '2024-06-16 22:00:00', NULL, 2, 3, 'In Progress');

-- Insert Flight Seats Data
INSERT INTO flight_seats (
    flight_id, 
    flight_class, 
    flight_price, 
    child_multiplier, 
    available_seats, 
    max_row_seat, 
    max_col_seat
) VALUES 
(1, 'Economy', 250.50, 0.8, 200, 20, 10),
(1, 'Business', 750.75, 0.9, 50, 10, 4);

-- Insert Booking Data
INSERT INTO booking (
    booking_id, 
    booker_email, 
    number_of_adults, 
    number_of_children, 
    flight_class, 
    cancelled, 
    flight_id, 
    booking_date
) VALUES 
(1, 'john.doe@example.com', 2, 1, 'Economy', 0, 1, '2024-05-20 09:30:00'),
(2, 'jane.smith@example.com', 1, 0, 'Business', 0, 2, '2024-05-22 14:45:00');

-- Insert Passenger Data
INSERT INTO passengers (
    booking_id, 
    citizen_id, 
    passport_number, 
    gender, 
    phone_number, 
    first_name, 
    last_name, 
    nationality, 
    date_of_birth
) VALUES 
(1, 'US12345678', 'P987654', 1, '+1-555-123-4567', 'John', 'Doe', 'United States', '1985-03-15'),
(1, 'US87654321', 'P123456', 0, '+1-555-987-6543', 'Jane', 'Doe', 'United States', '1987-07-22'),
(1, 'US11223344', NULL, 0, '+1-555-111-2222', 'Emily', 'Doe', 'United States', '2018-09-10'),
(2, 'UK87654321', 'B456789', 1, '+44-7700-900123', 'James', 'Smith', 'United Kingdom', '1990-11-05');

-- Insert Passenger Seat Data
INSERT INTO passenger_seat (row_seat, col_seat, passenger_id) VALUES 
(5, 3, 1),
(5, 4, 2),
(10, 2, 3),
(2, 1, 4);

-- Insert Payment Data
INSERT INTO payment (
    payment_id, 
    transaction_date_time, 
    amount, 
    currency, 
    payment_method, 
    status, 
    booking_id
) VALUES 
(1, '2024-05-20 10:00:00', 800, 'USD', 'Credit Card', 'completed', 1),
(2, '2024-05-22 15:00:00', 1200, 'USD', 'PayPal', 'completed', 2);

-- Insert Admin Data
INSERT INTO admin (admin_id, username, password) VALUES 
(1, 'admin1', 'hashed_password_1'),
(2, 'admin2', 'hashed_password_2');

-- Re-enable foreign key checks
PRAGMA foreign_keys = ON;
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
-- Insert flights (flight_id will auto-increment)


