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
('QA015', 'D-ABYC', '2025-02-03 18:00:00', NULL, '2025-02-03 21:00:00', NULL, 1, 2, 370.00, 'Scheduled'),
('QA016', 'OO-SBA', '2024-02-16 21:00:00', NULL, '2024-02-16 23:00:00', NULL, 6, 7, 320.00, 'Scheduled'),
('QA017', 'PH-BHA', '2024-03-17 22:00:00', NULL, '2024-03-17 00:00:00', NULL, 7, 8, 330.00, 'Scheduled'),
('QA018', 'LN-NOR', '2024-03-18 23:00:00', NULL, '2024-03-19 01:00:00', NULL, 8, 9, 340.00, 'Scheduled'),
('QA019', 'SE-RKA', '2024-04-19 00:30:00', NULL, '2024-04-19 02:30:00', NULL, 9, 10, 350.00, 'Scheduled'),
('QA020', 'OY-KBA', '2024-04-20 01:30:00', NULL, '2024-04-20 03:30:00', NULL, 10, 1, 360.00, 'Scheduled'),
('QA021', 'SP-LRA', '2024-04-21 02:30:00', NULL, '2024-04-21 04:30:00', NULL, 1, 2, 370.00, 'Scheduled'),
('QA022', 'TC-LKA', '2024-05-22 03:30:00', NULL, '2024-05-22 05:30:00', NULL, 2, 3, 380.00, 'Scheduled'),
('QA023', 'SU-GEA', '2024-05-23 04:30:00', NULL, '2024-05-23 06:30:00', NULL, 3, 4, 390.00, 'Scheduled'),
('QA024', 'ET-ASK', '2024-06-24 05:30:00', NULL, '2024-06-24 07:30:00', NULL, 4, 5, 400.00, 'Scheduled'),
('QA025', 'ZK-NZE', '2024-06-25 06:30:00', NULL, '2024-06-25 08:30:00', NULL, 5, 6, 410.00, 'Scheduled'),
('QA026', 'JA803A', '2024-07-26 07:30:00', NULL, '2024-07-26 09:30:00', NULL, 6, 7, 420.00, 'Scheduled'),
('QA027', 'HL8003', '2024-07-27 08:30:00', NULL, '2024-07-27 10:30:00', NULL, 7, 8, 430.00, 'Scheduled'),
('QA028', 'PR-OPA', '2024-08-28 09:30:00', NULL, '2024-08-28 11:30:00', NULL, 8, 9, 440.00, 'Scheduled'),
('QA029', 'LV-FQA', '2024-09-29 10:30:00', NULL, '2024-09-29 12:30:00', NULL, 9, 10, 450.00, 'Scheduled'),
('QA030', 'CC-BGC', '2024-09-30 11:30:00', NULL, '2024-09-30 13:30:00', NULL, 1, 2, 460.00, 'Scheduled'),
('QA031', 'VT-ALJ', '2024-10-31 12:30:00', NULL, '2024-10-31 14:30:00', NULL, 2, 3, 470.00, 'Scheduled'),
('QA032', 'EI-DYC', '2024-02-01 12:30:00', NULL, '2024-02-01 14:30:00', NULL, 1, 2, 280.00, 'Scheduled'),
('QA033', 'CS-TKA', '2024-02-02 13:30:00', '2024-02-02 13:45:00', '2024-02-02 15:30:00', '2024-02-02 15:45:00', 2, 3, 290.00, 'Landed'),
('QA034', 'EC-MUA', '2024-02-03 14:30:00', NULL, '2024-02-03 16:30:00', NULL, 3, 4, 300.00, 'Scheduled'),
('QA035', 'OO-SBA', '2024-02-04 15:00:00', '2024-02-04 15:15:00', '2024-02-04 17:00:00', '2024-02-04 17:15:00', 4, 5, 310.00, 'Landed'),
('QA036', 'PH-BHA', '2024-02-05 16:00:00', NULL, '2024-02-05 18:00:00', NULL, 5, 6, 320.00, 'Scheduled'),
('QA037', 'LN-NOR', '2024-02-06 17:00:00', '2024-02-06 17:05:00', '2024-02-06 19:00:00', '2024-02-06 19:05:00', 6, 7, 330.00, 'On Time'),
('QA038', 'SE-RKA', '2024-02-07 18:00:00', '2024-02-07 18:10:00', '2024-02-07 20:00:00', '2024-02-07 20:10:00', 7, 8, 340.00, 'On Time'),
('QA039', 'OY-KBA', '2024-03-08 19:00:00', NULL, '2024-03-08 21:00:00', NULL, 8, 9, 350.00, 'Scheduled'),
('QA040', 'SP-LRA', '2024-04-09 20:00:00', NULL, '2024-04-09 22:00:00', NULL, 9, 10, 360.00, 'Scheduled'),
('QA041', 'TC-LKA', '2024-12-10 21:00:00', NULL, '2024-12-10 23:00:00', NULL, 10, 1, 370.00, 'Scheduled'),
('QA042', 'SU-GEA', '2024-12-11 22:00:00', '2024-12-11 22:05:00', '2024-12-11 00:00:00', '2024-12-11 00:05:00', 1, 2, 380.00, 'On Time'),
('QA043', 'ET-ASK', '2024-12-12 23:00:00', NULL, '2024-12-13 01:00:00', NULL, 2, 3, 390.00, 'Scheduled'),
('QA044', 'ZK-NZE', '2024-12-13 00:30:00', NULL, '2024-12-13 02:30:00', NULL, 3, 4, 400.00, 'Scheduled'),
('QA045', 'JA803A', '2024-12-14 01:30:00', '2024-12-14 01:35:00', '2024-12-14 03:30:00', '2024-12-14 03:35:00', 4, 5, 410.00, 'On Time'),
('QA046', 'HL8003', '2024-12-15 02:30:00', '2024-12-15 02:45:00', '2024-12-15 04:30:00', '2024-12-15 04:45:00', 5, 6, 420.00, 'Landed'),
('QA047', 'PR-OPA', '2024-12-16 03:30:00', '2024-12-16 03:40:00', '2024-12-16 05:30:00', '2024-12-16 05:40:00', 6, 7, 430.00, 'On Time'),
('QA048', 'LV-FQA', '2024-12-17 04:30:00', NULL, '2024-12-17 06:30:00', NULL, 7, 8, 440.00, 'Scheduled'),
('QA049', 'CC-BGC', '2024-11-18 05:30:00', NULL, '2024-11-18 07:30:00', NULL, 8, 9, 450.00, 'Scheduled'),
('QA050', 'VT-ALJ', '2024-10-19 06:30:00', '2024-10-19 06:35:00', '2024-02-19 08:30:00', '2024-02-19 08:35:00', 9, 10, 460.00, 'Landed'),
('QA051', 'PK-GIC', '2024-11-20 07:30:00', NULL, '2024-11-20 09:30:00', NULL, 10, 1, 470.00, 'Scheduled'),
('QA052', 'N789BA', '2024-11-21 08:30:00', NULL, '2024-11-21 10:30:00', NULL, 1, 2, 480.00, 'Scheduled'),
('QA053', 'G-XWBA', '2024-11-22 09:30:00', '2024-11-22 09:40:00', '2024-02-22 11:30:00', '2024-02-22 11:40:00', 2, 3, 490.00, 'On Time'),
('QA054', 'F-HZBA', '2024-11-23 10:30:00', NULL, '2024-11-23 12:30:00', NULL, 3, 4, 500.00, 'Scheduled'),
('QA055', 'D-ABYC', '2024-11-24 11:30:00', '2024-11-24 11:45:00', '2024-02-24 13:30:00', '2024-02-24 13:45:00', 4, 5, 510.00, 'Landed'),
('QA056', 'C-FZBA', '2024-11-25 12:30:00', NULL, '2024-11-25 14:30:00', NULL, 5, 6, 520.00, 'Scheduled'),
('QA057', 'JA123A', '2024-11-26 13:30:00', '2024-11-26 13:35:00', '2024-02-26 15:30:00', '2024-02-26 15:35:00', 6, 7, 530.00, 'On Time'),
('QA058', 'VH-ZNA', '2024-03-27 14:30:00', '2024-02-27 14:40:00', '2024-02-27 16:30:00', '2024-02-27 16:40:00', 7, 8, 540.00, 'On Time'),
('QA059', '9V-SKA', '2024-04-28 15:30:00', NULL, '2024-04-28 17:30:00', NULL, 8, 9, 550.00, 'Scheduled'),
('QA060', 'HS-TKA', '2024-05-01 16:30:00', '2024-05-01 16:35:00', '2024-05-01 18:30:00', '2024-05-01 18:35:00', 9, 10, 560.00, 'Delayed'),
('QA061', 'B-2088', '2024-07-02 17:30:00', NULL, '2024-07-02 19:30:00', NULL, 10, 1, 570.00, 'Scheduled'),
('QA062', 'CC-BGA', '2024-08-03 18:30:00', '2024-08-03 18:40:00', '2024-08-03 20:30:00', '2024-08-03 20:40:00', 1, 2, 580.00, 'Landed'),
('QA100', 'PK-GIC', '2024-09-24 05:00:00', NULL, '2024-09-24 07:00:00', NULL, 10, 1, 450.00, 'Scheduled');


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
('XA-ZAA', 'First Class', 2.0, 1.0, 8, 'F'), -- 6 (chia hết cho 3)

('EI-DYC', 'Economy', 1.0, 0.8, 70, 'H'), -- 18 (chia hết cho 3)
('EI-DYC', 'Business', 1.5, 0.9, 40, 'F'), -- 10 (chia hết cho 5)
('EI-DYC', 'First Class', 2.0, 1.0, 8, 'F'), -- 6 (chia hết cho 3)

('CS-TKA', 'Economy', 1.0, 0.8, 70, 'H'), -- 22 (chẵn)
('CS-TKA', 'Business', 1.5, 0.9, 32, 'G'), -- 8 (chẵn)
('CS-TKA', 'First Class', 2.0, 1.0, 10, 'F'), -- 6 (chia hết cho 3)

('EC-MUA', 'Economy', 1.0, 0.8, 50, 'F'), -- 18 (chia hết cho 3)
('EC-MUA', 'Business', 1.5, 0.9, 36, 'F'), -- 12 (chia hết cho 3)
('EC-MUA', 'First Class', 2.0, 1.0, 8, 'F'), -- 6 (chia hết cho 3)

('OO-SBA', 'Economy', 1.0, 0.8, 60, 'F'), -- 30 (chia hết cho 5)
('OO-SBA', 'Business', 1.5, 0.9, 32, 'F'), -- 8 (chẵn)
('OO-SBA', 'First Class', 2.0, 1.0, 10, 'F'), -- 6 (chia hết cho 3)

('PH-BHA', 'Economy', 1.0, 0.8, 60, 'F'), -- 18 (chia hết cho 3)
('PH-BHA', 'Business', 1.5, 0.9, 36, 'F'), -- 12 (chia hết cho 3)
('PH-BHA', 'First Class', 2.0, 1.0, 10, 'F'), -- 6 (chia hết cho 3)

('LN-NOR', 'Economy', 1.0, 0.8, 70, 'H'), -- 22 (chẵn)
('LN-NOR', 'Business', 1.5, 0.9, 32, 'G'), -- 8 (chẵn)
('LN-NOR', 'First Class', 2.0, 1.0, 10, 'F'), -- 6 (chia hết cho 3)

('SE-RKA', 'Economy', 1.0, 0.8, 70, 'H'), -- 18 (chia hết cho 3)
('SE-RKA', 'Business', 1.5, 0.9, 40, 'F'), -- 10 (chia hết cho 5)
('SE-RKA', 'First Class', 2.0, 1.0, 8, 'F'), -- 6 (chia hết cho 3)

('OY-KBA', 'Economy', 1.0, 0.8, 70, 'H'), -- 22 (chẵn)
('OY-KBA', 'Business', 1.5, 0.9, 32, 'G'), -- 8 (chẵn)
('OY-KBA', 'First Class',2.0,1.0,10,'F'),

('SP-LRA', 'Economy', 1.0, 0.8, 70, 'H'), -- 18 (chia hết cho 3)
('SP-LRA', 'Business', 1.5, 0.9, 40, 'F'), -- 10 (chia hết cho 5)
('SP-LRA', 'First Class', 2.0, 1.0, 8, 'F'), -- 6 (chia hết cho 3)

('TC-LKA', 'Economy', 1.0, 0.8, 70, 'H'), -- 22 (chẵn)
('TC-LKA', 'Business', 1.5, 0.9, 32, 'G'), -- 8 (chẵn)
('TC-LKA', 'First Class', 2.0, 1.0, 10, 'F'), -- 6 (chia hết cho 3)

('SU-GEA', 'Economy', 1.0, 0.8, 70, 'H'), -- 18 (chia hết cho 3)
('SU-GEA', 'Business', 1.5, 0.9, 40, 'F'), -- 10 (chia hết cho 5)
('SU-GEA', 'First Class', 2.0, 1.0, 8, 'F'), -- 6 (chia hết cho 3)

('ET-ASK', 'Economy', 1.0, 0.8, 70, 'H'), -- 22 (chẵn)
('ET-ASK', 'Business', 1.5, 0.9, 32, 'G'), -- 8 (chẵn)
('ET-ASK', 'First Class', 2.0, 1.0, 10, 'F'), -- 6 (chia hết cho 3)

('ZK-NZE', 'Economy', 1.0, 0.8, 70, 'H'), -- 18 (chia hết cho 3)
('ZK-NZE', 'Business', 1.5, 0.9, 40, 'F'), -- 10 (chia hết cho 5)
('ZK-NZE', 'First Class',2.0,1.0,10,'F'),

('JA803A', 'Economy', 1.0, 0.8, 70, 'H'), -- 22 (chẵn)
('JA803A', 'Business', 1.5, 0.9, 32, 'G'), -- 8 (chẵn)
('JA803A', 'First Class', 2.0, 1.0, 10, 'F'), -- 6 (chia hết cho 3)

('HL8003', 'Economy', 1.0, 0.8, 70, 'H'), -- 18 (chia hết cho 3)
('HL8003', 'Business', 1.5, 0.9, 40, 'F'), -- 10 (chia hết cho 5)
('HL8003', 'First Class', 2.0, 1.0, 8, 'F'), -- 6 (chia hết cho 3)

('PR-OPA', 'Economy', 1.0, 0.8, 70, 'H'), -- 22 (chẵn)
('PR-OPA', 'Business', 1.5, 0.9, 32, 'G'), -- 8 (chẵn)
('PR-OPA', 'First Class', 2.0, 1.0, 10, 'F'), -- 6 (chia hết cho 3)

('LV-FQA', 'Economy', 1.0, 0.8, 70, 'H'), -- 18 (chia hết cho 3)
('LV-FQA', 'Business', 1.5, 0.9, 40, 'F'), -- 10 (chia hết cho 5)
('LV-FQA', 'First Class', 2.0, 1.0, 8, 'F'), -- 6 (chia hết cho 3)

('CC-BGC', 'Economy', 1.0, 0.8, 70, 'H'), -- 22 (chẵn)
('CC-BGC', 'Business', 1.5, 0.9, 32, 'G'), -- 8 (chẵn)
('CC-BGC', 'First Class', 2.0, 1.0, 10, 'F'), -- 6 (chia hết cho 3)

('VT-ALJ', 'Economy', 1.0, 0.8, 70, 'H'), -- 18 (chia hết cho 3)
('VT-ALJ', 'Business', 1.5, 0.9, 40, 'F'), -- 10 (chia hết cho 5)
('VT-ALJ', 'First Class', 2.0, 1.0, 8, 'F'), -- 6 (chia hết cho 3)

('PK-GIC', 'Economy', 1.0, 0.8, 70, 'H'), -- 22 (chẵn)
('PK-GIC', 'Business', 1.5, 0.9, 32, 'G'), -- 8 (chẵn)
('PK-GIC', 'First Class', 2.0, 1.0, 10, 'F');

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
('B2C3D4', 'user10@example.com', 1, 0, 'Economy', FALSE, 9, '2024-12-25 04:11:05'),
('A2B3C4', 'user11@example.com', 1, 0, 'Economy', FALSE, 1, '2024-12-15 09:15:00'),
('D5E6F7', 'user12@example.com', 2, 1, 'Business', FALSE, 2, '2024-12-16 13:15:00'),
('G8H9I0', 'user13@example.com', 1, 0, 'First Class', FALSE, 3, '2024-12-10 07:30:00'),
('J3K4L5', 'user14@example.com', 1, 0, 'Economy', FALSE, 4, '2024-12-11 11:00:00'),
('M7N8O9', 'user15@example.com', 3, 0, 'First Class', TRUE, 5, '2024-12-28 16:00:00'),
('P0Q1R2', 'user16@example.com', 2, 0, 'Business', FALSE, 6, '2024-12-25 05:45:00'),
('S5T6U7', 'user17@example.com', 2, 2, 'Economy', FALSE, 7, '2024-12-14 09:00:00'),
('V8W9X0', 'user18@example.com', 1, 0, 'Business', FALSE, 8, '2024-12-30 16:05:00'),
('Y1Z2A3', 'user19@example.com', 2, 0, 'Economy', FALSE, 9, '2024-12-25 14:30:00'),
('B3C4D5', 'user20@example.com', 1, 1, 'First Class', FALSE, 10, '2024-12-18 07:30:00'),
('C1D2E3', 'user21@example.com', 3, 0, 'Economy', FALSE, 11, '2024-12-16 07:45:00'),
('D2E3F4', 'user22@example.com', 2, 0, 'First Class', FALSE, 12, '2024-12-19 13:30:00'),
('E5F6G7', 'user23@example.com', 1, 0, 'Business', TRUE, 13, '2024-12-28 09:00:00'),
('F3G4H5', 'user24@example.com', 2, 0, 'Economy', FALSE, 14, '2024-12-14 16:00:00'),
('H4I5J6', 'user26@example.com', 2, 0, 'Economy', FALSE, 16, '2024-12-15 11:15:00'),
('I7J8K9', 'user27@example.com', 1, 0, 'Business', FALSE, 17, '2024-12-13 09:45:00'),
('K2L3M4', 'user29@example.com', 2, 1, 'Economy', FALSE, 19, '2024-12-12 08:00:00'),
('L6M7N8', 'user30@example.com', 1, 0, 'Business', FALSE, 20, '2024-12-17 18:30:00'),
('M3N4O5', 'user31@example.com', 2, 0, 'Economy', FALSE, 21, '2024-12-19 06:45:00'),
('O5P6Q7', 'user33@example.com', 1, 0, 'Business', FALSE, 23, '2024-12-25 12:00:00'),
('P8Q9R0', 'user34@example.com', 3, 1, 'Economy', FALSE, 24, '2024-12-28 17:00:00'),
('R4S5T6', 'user36@example.com', 1, 0, 'Business', FALSE, 26, '2024-12-18 15:00:00'),
('S6T7U8', 'user37@example.com', 2, 0, 'Economy', FALSE, 27, '2024-12-11 07:30:00'),
('U1V2W3', 'user39@example.com', 1, 0, 'Business', FALSE, 29, '2024-12-15 06:45:00'),
('V6W7X8', 'user40@example.com', 2, 0, 'Economy', FALSE, 30, '2024-12-13 13:30:00');


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
('B2C3D4', 'SG987654321', 'SG654321', 'Female', '+65-6-5555-6789', 'Lisa', 'Chen', 'Singapore', '1985-04-25', 13, 'A'),
('B2C3D4', '001234567890', 'VN123456', 'Male', '0912345678', 'Nguyễn', 'Văn A', 'Vietnam', '1990-05-15', 9, 'A'),
('A2B3C4', '009876543210', 'VN654321', 'Female', '0987654321', 'Trần', 'Thị B', 'Vietnam', '1992-08-20', 1, 'B'),
('D5E6F7', '002345678901', 'VN234567', 'Male', '0923456789', 'Phạm', 'Văn C', 'Vietnam', '1985-11-30', 2, 'C'),
('D5E6F7', '003456789012', 'VN345678', 'Female', '0934567890', 'Lê', 'Thị D', 'Vietnam', '1990-07-10', 2, 'D'),
('G8H9I0', '004567890123', 'VN456789', 'Male', '0945678901', 'Ngô', 'Văn E', 'Vietnam', '1982-06-15', 3, 'A'),
('J3K4L5', '005678901234', 'VN567890', 'Female', '0956789012', 'Phan', 'Thị F', 'Vietnam', '1988-02-22', 4, 'B'),
('M7N8O9', '006789012345', 'VN678901', 'Male', '0967890123', 'Võ', 'Văn G', 'Vietnam', '1980-05-10', 5, 'A'),
('M7N8O9', '007890123456', 'VN789012', 'Female', '0978901234', 'Nguyễn', 'Thị H', 'Vietnam', '1983-09-15', 5, 'B'),
('P0Q1R2', '008901234567', 'VN890123', 'Male', '0989012345', 'Hoàng', 'Văn I', 'Vietnam', '1987-04-20', 6, 'C'),
('S5T6U7', '009012345678', 'VN901234', 'Female', '0990123456', 'Lê', 'Thị J', 'Vietnam', '1991-03-30', 7, 'D'),
('V8W9X0', '010123456789', 'VN012345', 'Male', '1001234567', 'Trương', 'Văn K', 'Vietnam', '1986-12-05', 8, 'A'),
('Y1Z2A3', '011234567890', 'VN123457', 'Female', '1012345678', 'Nguyễn', 'Thị L', 'Vietnam', '1994-01-25', 9, 'B'),
('B3C4D5', '012345678901', 'VN234568', 'Male', '1023456789', 'Vũ', 'Văn M', 'Vietnam', '1990-06-15', 10, 'A'),
('B3C4D5', '013456789012', 'VN345679', 'Female', '1034567890', 'Phan', 'Thị N', 'Vietnam', '1992-11-20', 10, 'B'),
('C1D2E3', '014567890123', 'VN456780', 'Male', '1045678901', 'Lê', 'Văn O', 'Vietnam', '1983-02-10', 11, 'C'),
('C1D2E3', '015678901234', 'VN567891', 'Female', '1056789012', 'Ngô', 'Thị P', 'Vietnam', '1990-07-30', 11, 'D'),
('D2E3F4', '016789012345', 'VN678902', 'Male', '1067890123', 'Võ', 'Văn Q', 'Vietnam', '1982-01-12', 12, 'A'),
('D2E3F4', '017890123456', 'VN789013', 'Female', '1078901234', 'Trương', 'Thị R', 'Vietnam', '1991-04-20', 12, 'B'),
('E5F6G7', '018901234567', 'VN890124', 'Male', '1089012345', 'Hoàng', 'Văn S', 'Vietnam', '1990-10-12', 13, 'A'),
('F3G4H5', '019012345678', 'VN901235', 'Female', '1090123456', 'Lê', 'Thị T', 'Vietnam', '1986-08-25', 14, 'B'),
('H4I5J6', '021234567890', 'VN123458', 'Female', '1112345678', 'Vũ', 'Thị V', 'Vietnam', '1992-02-15', 16, 'B'),
('I7J8K9', '022345678901', 'VN234569', 'Male', '1123456789', 'Phan', 'Văn W', 'Vietnam', '1985-11-20', 17, 'C'),
('K2L3M4', '024567890123', 'VN456781', 'Male', '1145678901', 'Lê', 'Văn Y', 'Vietnam', '1982-03-13', 19, 'C'),
('L6M7N8', '025678901234', 'VN567892', 'Female', '1156789012', 'Võ', 'Thị Z', 'Vietnam', '1990-10-05', 20, 'B'),
('M3N4O5', '026789012345', 'VN678903', 'Male', '1167890123', 'Trương', 'Văn A1', 'Vietnam', '1985-04-25', 21, 'A'),
('M3N4O5', '027890123456', 'VN789014', 'Female', '1178901234', 'Nguyễn', 'Thị B1', 'Vietnam', '1992-11-17', 21, 'B'),
('O5P6Q7', '029012345678', 'VN901236', 'Female', '1190123456', 'Hoàng', 'Thị D1', 'Vietnam', '1991-07-19', 23, 'B'),
('P8Q9R0', '030123456789', 'VN012347', 'Male', '1201234567', 'Lê', 'Văn E1', 'Vietnam', '1986-09-25', 24, 'A'),
('P8Q9R0', '031234567890', 'VN123459', 'Female', '1212345678', 'Ngô', 'Thị F1', 'Vietnam', '1992-12-15', 24, 'B'),
('R4S5T6', '033456789012', 'VN345681', 'Female', '1234567890', 'Trương', 'Thị H1', 'Vietnam', '1990-11-01', 26, 'A'),
('S6T7U8', '034567890123', 'VN456782', 'Male', '1245678901', 'Nguyễn', 'Văn I1', 'Vietnam', '1987-02-20', 27, 'B'),
('U1V2W3', '036789012345', 'VN678904', 'Male', '1267890123', 'Phan', 'Văn K1', 'Vietnam', '1986-12-22', 29, 'A'),
('V6W7X8', '037890123456', 'VN789015', 'Female', '1278901234', 'Vũ', 'Thị L1', 'Vietnam', '1991-03-10', 30, 'B');

