-- Create User Table
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
    FOREIGN KEY (airplane_model_id) REFERENCES airplane_model(airplane_model_id) ON DELETE CASCADE
);

-- Create Flight Table
CREATE TABLE flight (
    flight_id SERIAL PRIMARY KEY,
    flight_number TEXT UNIQUE,
    registration_number TEXT,
    estimated_departure_time TIMESTAMP,
    actual_departure_time TIMESTAMP,
    estimated_arrival_time TIMESTAMP,
    actual_arrival_time TIMESTAMP,
    departure_airport_id INTEGER,
    destination_airport_id INTEGER,
    flight_price FLOAT,
    status TEXT,
    FOREIGN KEY (registration_number) REFERENCES airplane(registration_number) ON DELETE CASCADE,
    FOREIGN KEY (departure_airport_id) REFERENCES airport(airport_id) ON DELETE CASCADE,
    FOREIGN KEY (destination_airport_id) REFERENCES airport(airport_id) ON DELETE CASCADE
);


-- Create Flight Seats Table
CREATE TABLE flight_seats (
    flight_seats_id SERIAL PRIMARY KEY,
    registration_number TEXT NOT NULL,
    flight_class TEXT NOT NULL,
    class_multiplier REAL,
    child_multiplier REAL,
    max_row_seat INTEGER NOT NULL CHECK (max_row_seat > 0),
    max_col_seat TEXT NOT NULL,
    FOREIGN KEY (registration_number) REFERENCES airplane(registration_number) ON DELETE CASCADE
);

-- Create Booking Table
CREATE TABLE booking (
    booking_id TEXT PRIMARY KEY,
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
    booking_id TEXT NOT NULL,
    citizen_id TEXT NOT NULL,
    passport_number TEXT,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female')) NOT NULL,
    phone_number TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    nationality TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    seat_row INTEGER NOT NULL,
    seat_col VARCHAR(2) NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE
);


-- Create Payment Table
CREATE TABLE payment (
    payment_id SERIAL PRIMARY KEY,
    transaction_date_time TIMESTAMP,
    amount FLOAT,
    currency TEXT DEFAULT 'USD',
    payment_method TEXT,
    status TEXT DEFAULT 'pending',
    booking_id TEXT UNIQUE,
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
('JED', 'Jeddah', 'King Abdulaziz International Airport'),
('HAN', 'Hanoi', 'Noi Bai International Airport'),
('SGN', 'Ho Chi Minh City', 'Tan Son Nhat International Airport'),
('DAD', 'Da Nang', 'Da Nang International Airport'),
('CXR', 'Nha Trang', 'Cam Ranh International Airport'),
('HUI', 'Hue', 'Phu Bai International Airport'),
('VCA', 'Can Tho', 'Can Tho International Airport'),
('PXU', 'Pleiku', 'Pleiku Airport'),
('VCS', 'Con Dao', 'Con Dao Airport'),
('VII', 'Vinh', 'Vinh Airport'),
('THD', 'Thanh Hoa', 'Tho Xuan Airport');



-- Insert Airplane Data
INSERT INTO airplane (airplane_model_id, registration_number) VALUES 
(1, 'N789BA'),
(2, 'G-XWBA'),
(3, 'F-HZBA'),
(4, 'D-ABYC'),
(5, 'C-FZBA'),
(6, 'JA123A'),
(7, 'VH-ZNA'),
(8, '9V-SKA'),
(9, 'HS-TKA'),
(10, 'B-2088'),
(11, 'CC-BGA'),
(12, 'XA-ZAA'),
(13, 'EI-DYC'),
(14, 'CS-TKA'),
(15, 'EC-MUA'),
(16, 'OO-SBA'),
(17, 'PH-BHA'),
(18, 'LN-NOR'),
(19, 'SE-RKA'),
(20, 'OY-KBA'),
(21, 'SP-LRA'),
(22, 'TC-LKA'),
(23, 'SU-GEA'),
(24, 'ET-ASK'),
(25, 'ZK-NZE'),
(26, 'JA803A'),
(27, 'HL8003'),
(28, 'PR-OPA'),
(29, 'LV-FQA'),
(30, 'CC-BGC'),
(31, 'VT-ALJ'),
(32, 'PK-GIC');


-- Insert Flight Data

INSERT INTO flight (
    flight_number,
    registration_number, 
    estimated_departure_time, 
    actual_departure_time, 
    estimated_arrival_time, 
    actual_arrival_time, 
    departure_airport_id, 
    destination_airport_id, 
    flight_price,
    status
) VALUES 
('QA001', 'N789BA', '2024-12-15 10:00:00', '2024-12-15 10:15:00', '2024-12-15 13:00:00', '2024-12-15 13:10:00', 1, 2, 350.00, 'Landed'),
('QA002', 'G-XWBA', '2024-06-16 14:00:00', '2024-06-16 14:00:00', '2024-06-16 22:00:00', NULL, 2, 3, 400.00, 'Delayed'),
('QA003', 'F-HZBA', '2024-12-10 08:00:00', '2024-12-10 08:10:00', '2024-12-10 09:30:00', NULL, 1, 2, 250.50, 'On Time'),
('QA004', 'D-ABYC', '2024-12-11 12:00:00', '2024-12-11 12:05:00', '2024-12-11 13:20:00', NULL, 2, 3, 260.00, 'On Time'),
('QA005', 'C-FZBA', '2024-12-28 15:00:00', NULL, '2024-12-28 16:30:00', NULL, 3, 4, 280.75, 'Scheduled'),
('QA006', 'JA123A', '2024-12-29 07:00:00', NULL, '2024-12-29 08:40:00', NULL, 4, 5, 300.00, 'Scheduled'),
('QA007', 'VH-ZNA', '2024-12-14 10:00:00', '2024-12-14 10:10:00', '2024-12-14 11:50:00', NULL, 5, 6, 275.25, 'On Time'),
('QA008', '9V-SKA', '2024-12-15 09:00:00', '2024-12-15 09:10:00', '2024-12-15 10:30:00', NULL, 6, 7, 290.50, 'On Time'),
('QA009', 'HS-TKA', '2024-12-30 16:00:00', NULL, '2024-12-30 17:50:00', NULL, 7, 8, 305.75, 'Scheduled'),
('QA010', 'B-2088', '2024-12-31 19:00:00', NULL, '2024-12-31 20:40:00', NULL, 8, 9, 320.00, 'Scheduled'),
('QA011', 'CC-BGA', '2024-12-18 05:30:00', '2024-12-18 05:35:00', '2024-12-18 07:10:00', NULL, 9, 10, 275.00, 'Landed'),
('QA012', 'XA-ZAA', '2024-12-19 14:00:00', '2024-12-19 14:10:00', '2024-12-19 15:50:00', NULL, 10, 1, 350.50, 'On Time'),
('QA013', 'G-XWBA', '2024-12-28 08:00:00', NULL, '2024-12-28 11:00:00', NULL, 1, 2, 340.00, 'Scheduled'),
('QA014', 'F-HZBA', '2025-01-09 12:00:00', NULL, '2025-01-09 15:00:00', NULL, 1, 2, 360.00, 'Scheduled'),
('QA015', 'D-ABYC', '2025-01-03 18:00:00', NULL, '2025-01-03 21:00:00', NULL, 1, 2, 370.00, 'Scheduled');



-- Insert Flight Seats Data
INSERT INTO flight_seats (
    registration_number,
    flight_class,
    class_multiplier,
    child_multiplier,
    max_row_seat,
    max_col_seat
) VALUES 
('N789BA', 'Economy', 1.0, 0.8, 10, 'F'), -- 20 (chẵn)
('N789BA', 'Business', 1.5, 0.9, 10, 'F'), -- 10 (chia hết cho 5)
('N789BA', 'First Class', 2.0, 1.0, 10, 'F'), -- 6 (chia hết cho 3)

('G-XWBA', 'Economy', 1.0, 0.8, 30, 'G'), -- 18 (chia hết cho 3)
('G-XWBA', 'Business', 1.5, 0.9, 20, 'F'), -- 8 (chẵn)
('G-XWBA', 'First Class', 2.0, 1.0, 18, 'D'), -- 6 (chia hết cho 3)

('F-HZBA', 'Economy', 1.0, 0.8, 21, 'H'), -- 30 (chia hết cho 5)
('F-HZBA', 'Business', 1.5, 0.9, 36, 'F'), -- 12 (chia hết cho 3)
('F-HZBA', 'First Class', 2.0, 1.0, 10, 'F'), -- 6 (chia hết cho 3)

('D-ABYC', 'Economy', 1.0, 0.8, 70, 'H'), -- 18 (chia hết cho 3)
('D-ABYC', 'Business', 1.5, 0.9, 40, 'F'), -- 10 (chia hết cho 5)
('D-ABYC', 'First Class', 2.0, 1.0, 8, 'F'), -- 6 (chia hết cho 3)

('C-FZBA', 'Economy', 1.0, 0.8, 70, 'H'), -- 22 (chẵn)
('C-FZBA', 'Business', 1.5, 0.9, 32, 'G'), -- 8 (chẵn)
('C-FZBA', 'First Class', 2.0, 1.0, 10, 'F'), -- 6 (chia hết cho 3)

('JA123A', 'Economy', 1.0, 0.8, 50, 'F'), -- 18 (chia hết cho 3)
('JA123A', 'Business', 1.5, 0.9, 36, 'F'), -- 12 (chia hết cho 3)
('JA123A', 'First Class', 2.0, 1.0, 8, 'F'), -- 6 (chia hết cho 3)

('VH-ZNA', 'Economy', 1.0, 0.8, 60, 'F'), -- 30 (chia hết cho 5)
('VH-ZNA', 'Business', 1.5, 0.9, 32, 'F'), -- 8 (chẵn)
('VH-ZNA', 'First Class', 2.0, 1.0, 10, 'F'), -- 6 (chia hết cho 3)

('9V-SKA', 'Economy', 1.0, 0.8, 60, 'F'), -- 18 (chia hết cho 3)
('9V-SKA', 'Business', 1.5, 0.9, 36, 'F'), -- 12 (chia hết cho 3)
('9V-SKA', 'First Class', 2.0, 1.0, 8, 'D'), -- 6 (chia hết cho 3)

('HS-TKA', 'Economy', 1.0, 0.8, 50, 'F'), -- 20 (chẵn)
('HS-TKA', 'Business', 1.5, 0.9, 40, 'F'), -- 10 (chia hết cho 5)
('HS-TKA', 'First Class', 2.0, 1.0, 10, 'D'), -- 6 (chia hết cho 3)

('B-2088', 'Economy', 1.0, 0.8, 62, 'G'), -- 18 (chia hết cho 3)
('B-2088', 'Business', 1.5, 0.9, 32, 'H'), -- 8 (chẵn)
('B-2088', 'First Class', 2.0, 1.0, 8, 'D'), -- 6 (chia hết cho 3)

('CC-BGA', 'Economy', 1.0, 0.8, 60, 'G'), -- 22 (chẵn)
('CC-BGA', 'Business', 1.5, 0.9, 36, 'G'), -- 12 (chia hết cho 3)
('CC-BGA', 'First Class', 2.0, 1.0, 10, 'F'), -- 6 (chia hết cho 3)

('XA-ZAA', 'Economy', 1.0, 0.8, 60, 'G'), -- 18 (chia hết cho 3)
('XA-ZAA', 'Business', 1.5, 0.9, 36, 'H'), -- 12 (chia hết cho 3)
('XA-ZAA', 'First Class', 2.0, 1.0, 8, 'F'); -- 6 (chia hết cho 3)

-- INSERT INTO users (firstname, lastname, email, username, password, role) VALUES
-- ('John', 'Doe', 'john.doe@example.com', 'johndoe', 'hashed_password_1', 'customer'),
-- ('Jane', 'Smith', 'jane.smith@example.com', 'janesmith', 'hashed_password_2', 'customer');

INSERT INTO booking (booking_id, booker_email, number_of_adults, number_of_children, flight_class, cancelled, flight_id, booking_date) 
VALUES
('A1B2C3', 'user1@example.com', 2, 0, 'First Class', FALSE, 1, '2024-12-10 03:11:05'),
('D4E5F6', 'user2@example.com', 1, 0, 'Business', TRUE, 5, '2024-12-20 04:11:05'),
('G7H8I9', 'user3@example.com', 3, 0, 'First Class', FALSE, 1, '2024-12-10 04:11:05'),
('J1K2L3', 'user4@example.com', 3, 0, 'Business', TRUE, 3, '2024-12-05 04:11:05'),
('M4N5O6', 'user5@example.com', 3, 0, 'Economy', FALSE, 4, '2024-12-08 04:11:05'),
('P7Q8R9', 'user6@example.com', 1, 0, 'Business', FALSE, 5, '2024-12-20 04:11:05'),
('S1T2U3', 'user7@example.com', 4, 0, 'First Class', FALSE, 6, '2024-12-25 04:11:05'),
('V4W5X6', 'user8@example.com', 1, 0, 'Business', FALSE, 7, '2024-12-10 04:11:05'),
('Y7Z8A1', 'user9@example.com', 1, 0, 'First Class', FALSE, 8, '2024-12-25 04:11:05'),
('B2C3D4', 'user10@example.com', 1, 0, 'Economy', FALSE, 9, '2024-12-25 04:11:05');


INSERT INTO passengers (
    booking_id, citizen_id, passport_number, 
    gender, phone_number, first_name, last_name, 
    nationality, date_of_birth, seat_row, seat_col
) VALUES 
('A1B2C3', '001234567890', 'VN123456', 'Male', '0912345678', 'Nguyễn', 'Văn An', 'Vietnam', '1990-05-15', 1, 'A'),
('A1B2C3', '009876543210', 'VN654321', 'Female', '0987654321', 'Trần', 'Thị Bích', 'Vietnam', '1992-08-20', 1, 'B'),
('D4E5F6', '002345678901', 'VN234567', 'Male', '0923456789', 'Phạm', 'Văn Cường', 'Vietnam', '1985-11-30', 2, 'C'),
('G7H8I9', '008765432109', 'VN765432', 'Female', '0976543210', 'Lê', 'Thị Diệu', 'Vietnam', '1988-03-25', 2, 'D'),
('G7H8I9', 'FR123456789', 'FR987654', 'Male', '+33612345678', 'Jean', 'Dupont', 'France', '1985-04-12', 5, 'A'),
('G7H8I9', 'FR987654321', 'FR123456', 'Female', '+33698765432', 'Marie', 'Laurent', 'France', '1990-09-23', 5, 'B'),
('J1K2L3', 'DE234567890', 'DE876543', 'Male', '+49160123456', 'Hans', 'Mueller', 'Germany', '1978-11-05', 6, 'C'),
('J1K2L3', 'DE876543210', 'DE345678', 'Female', '+491601234567', 'Anna', 'Schmidt', 'Germany', '1982-07-15', 6, 'D'),
('J1K2L3', 'IT345678901', 'IT765432', 'Male', '+393912345678', 'Giovanni', 'Rossi', 'Italy', '1975-02-28', 7, 'E'),
('M4N5O6', 'IT765432109', 'IT456789', 'Female', '+393387654321', 'Sofia', 'Bianchi', 'Italy', '1988-06-10', 7, 'F'),
('M4N5O6', 'US123456789', 'US987654', 'Male', '+1-212-555-1234', 'John', 'Smith', 'United States', '1980-06-15', 8, 'A'),
('M4N5O6', 'US987654321', 'US654321', 'Female', '+1-310-555-5678', 'Emily', 'Johnson', 'United States', '1985-09-20', 8, 'B'),
('P7Q8R9', 'CA234567890', 'CA876543', 'Male', '+1-416-555-9876', 'Michael', 'Brown', 'Canada', '1975-11-10', 9, 'C'),
('S1T2U3', 'AU345678901', 'AU765432', 'Female', '+61-2-5555-1234', 'Sarah', 'Williams', 'Australia', '1988-03-25', 10, 'A'),
('S1T2U3', 'AU987654321', 'AU456789', 'Male', '+61-3-5555-5678', 'James', 'Taylor', 'Australia', '1982-07-15', 10, 'B'),
('S1T2U3', 'JP123456789', 'JP987654', 'Female', '+81-3-5555-9012', 'Yuki', 'Tanaka', 'Japan', '1990-09-30', 10, 'C'),
('S1T2U3', 'JP987654321', 'JP654321', 'Male', '+81-6-5555-3456', 'Kenji', 'Sato', 'Japan', '1985-05-20', 10, 'D'),
('V4W5X6', 'UK234567890', 'UK876543', 'Female', '+44-20-5555-7890', 'Emma', 'Wilson', 'United Kingdom', '1992-08-05', 11, 'A'),
('Y7Z8A1', 'NZ345678901', 'NZ765432', 'Male', '+64-9-5555-2345', 'David', 'Lee', 'New Zealand', '1980-12-15', 12, 'A'),
('B2C3D4', 'SG987654321', 'SG654321', 'Female', '+65-6-5555-6789', 'Lisa', 'Chen', 'Singapore', '1985-04-25', 13, 'A');

