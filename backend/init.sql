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
    passenger_id SERIAL PRIMARY KEY, 
    booking_id INTEGER NOT NULL,
    citizen_id TEXT NOT NULL,
    passport_number TEXT,
    gender BOOLEAN NOT NULL,
    phone_number TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    nationality TEXT NOT NULL,
    date_of_birth TIMESTAMP NOT NULL,
    seat_row INTEGER NOT NULL,
    seat_col VARCHAR NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE
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

-- Insert Admin Data
INSERT INTO admin (username, password) VALUES 
('admin1', 'hashed_password_1'),
('admin2', 'hashed_password_2');


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
('COMAC C919', 'COMAC', 168),
('Boeing 737-800', 'Boeing', 189),
('Airbus A330-300', 'Airbus', 277),
('Boeing 747-8', 'Boeing', 467),
('Airbus A350-900', 'Airbus', 350),
('Boeing 787-9', 'Boeing', 296),
('Airbus A318', 'Airbus', 107),
('Antonov An-225', 'Antonov', 640),
('Sukhoi Superjet 100', 'Sukhoi', 108),
('McDonnell Douglas DC-10', 'McDonnell Douglas', 380),
('Lockheed C-130 Hercules', 'Lockheed', 92),
('Bombardier Q400', 'Bombardier', 86),
('Embraer E175', 'Embraer', 88),
('Tupolev Tu-204', 'Tupolev', 210),
('Ilyushin Il-76', 'Ilyushin', 190),
('COMAC ARJ21', 'COMAC', 90),
('Boeing 707', 'Boeing', 189),
('Airbus A220-100', 'Airbus', 120),
('Boeing 727-200', 'Boeing', 189),
('Airbus A340-600', 'Airbus', 380),
('Boeing 737-700', 'Boeing', 148),
('Airbus A380-800', 'Airbus', 853),
('Bombardier Global 7500', 'Bombardier', 19),
('Embraer Phenom 300E', 'Embraer', 9),
('Cessna Citation X', 'Cessna', 12),
('Dassault Falcon 8X', 'Dassault', 19),
('Beechcraft King Air 350', 'Beechcraft', 11),
('Piaggio P.180 Avanti', 'Piaggio Aerospace', 9),
('Antonov An-148', 'Antonov', 80),
('Sukhoi Su-57 (Transport Variant)', 'Sukhoi', 72),
('Boeing KC-135 Stratotanker', 'Boeing', 128),
('Airbus Beluga XL', 'Airbus', 50),
('Lockheed P-3 Orion', 'Lockheed', 21),
('De Havilland Canada Dash 8-100', 'De Havilland Canada', 37),
('ATR 72-600', 'ATR', 78),
('Saab 2000', 'Saab', 50);
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


-- Insert Airplane Data
INSERT INTO airplane (airplane_model_id, registration_number, current_airport_id) 
VALUES 
(1, 'N789BA', 1),
(2, 'G-XWBA', 2),
(3, 'F-HZBA', 3),
(4, 'D-ABYC', 4),
(5, 'C-FZBA', 5),
(6, 'JA123A', 6),
(7, 'VH-ZNA', 7),
(8, '9V-SKA', 8),
(9, 'HS-TKA', 9),
(10, 'B-2088', 10),
(11, 'CC-BGA', 11),
(12, 'XA-ZAA', 12),
(13, 'EI-DYC', 13),
(14, 'CS-TKA', 14),
(15, 'EC-MUA', 15),
(16, 'OO-SBA', 16),
(17, 'PH-BHA', 17),
(18, 'LN-NOR', 18),
(19, 'SE-RKA', 19),
(20, 'OY-KBA', 20),
(21, 'SP-LRA', 21),
(22, 'TC-LKA', 22),
(23, 'SU-GEA', 23),
(24, 'ET-ASK', 24),
(25, 'ZK-NZE', 25),
(26, 'JA803A', 26),
(27, 'HL8003', 27),
(28, 'PR-OPA', 28),
(29, 'LV-FQA', 29),
(30, 'CC-BGC', 30),
(31, 'VT-ALJ', 31),
(32, 'PK-GIC', 32);

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

INSERT INTO passengers (booking_id, citizen_id, passport_number, gender, phone_number, first_name, last_name, nationality, date_of_birth, seat_row, seat_col)
VALUES
    (1, 'CIT123456', 'P1234567', TRUE, '+1234567890', 'John', 'Doe', 'USA', '1985-01-15 00:00:00', 12, 'A'),
    (1, 'CIT789012', 'P7890123', FALSE, '+9876543210', 'Jane', 'Smith', 'CAN', '1990-06-25 00:00:00', 14, 'C');
