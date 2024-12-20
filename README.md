# QAirline - Airline Booking System Project Overview

QAirline is a robust airline booking system designed to streamline flight searching, booking, and administrative tasks. It offers a clean, user-friendly interface for customers to book flights and for administrators to manage flight details, passenger reservations, and airplane information.

---

## Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Folder Structure](#folder-structure)
4. [Installation](#installation)
5. [API and Backend](#api-and-backend)
6. [Project Highlights](#project-highlights)
7. [Code Standards](#code-standards)
8. [Contributors](#contributors)
9. [Future Improvements](#future-improvements)

---

## Features

### Customer Features

* **Flight Search**: Search flights using filters like date, destination, and flight type.
* **Booking Flights**: Reserve seats and proceed to the booking process.
* **Payment Management**: Placeholder for payment steps (without integration).
* **View Booked Tickets**: Manage and track flight reservations.

### Admin Features

* **Manage Flights**: Add, update, and delete flight schedules.
* **Manage Airplanes**: Manage airplane details like model, capacity, etc.
* **Monitor Bookings**: View passenger reservations and cancellations.
* **Manage Airports**: Handle airport information.
* **Generate Statistics**: View system reports and summaries.

---

## Technology Stack

### Frontend (React with TypeScript)

* **React**: For building reusable and dynamic components.
* **TypeScript**: Enforced type safety for scalable development.
* **CSS**: Custom styles for components (modularized for each section).
* **React Router**: Page navigation and routing.

### Backend (FastAPI with Python)

* **FastAPI**: High-performance backend to handle API requests.
* **SQLAlchemy**: ORM for database interactions.
* **Docker**: Containerization for deployment.
* **PostgreSQL**: Relational database to store application data.

### Other Tools

* **Docker & Docker Compose**: Setup and orchestration.
* **Git**: Version control system.
* **Nginx**: Optional reverse proxy configuration.

---

## Folder Structure

### Frontend (Located in `frontend/`)

```plaintext
frontend/
├── App.tsx                # Main React component
├── components/            # Reusable UI components
│   ├── admin/             # Admin panel components
│   ├── flight/            # Customer flight components
│   ├── home-page/         # Landing and static pages
│   └── user/              # User profile and booking history
├── hooks/                 # Custom React hooks (fetching logic)
├── pages/                 # Page-level components
├── routes.ts              # App routing configuration
├── store/                 # Global state management (if applicable)
├── styles.css             # Global styles
├── types/                 # TypeScript types for strong typing
└── wrappers/              # Auth wrappers for protected routes
```

### Backend (Located in `backend/`)

```plaintext
backend/
├── app/                   # Core application logic
│   ├── api/               # API endpoints
│   │   └── routes/        # Individual API route files
│   ├── core/              # Database and security configs
│   ├── crud/              # CRUD operations
│   ├── schemas/           # Pydantic models for API validation
│   ├── service/           # Service layer for business logic
│   ├── models.py          # Database models
│   └── main.py            # FastAPI app entry point
├── requirements.txt       # Backend dependencies
├── Dockerfile             # Backend Docker configuration
├── docker-compose.yml     # Orchestration of services
└── init.sql               # Database initialization
```

## Installation

### Prerequisites

Ensure you have the following installed:

* Node.js and npm (for the frontend)
* Python 3.11+ (for the backend)
* Docker and Docker Compose

### Steps

#### Clone the Repository

```bash
git clone https://github.com/your-repo/QAirline.git
cd QAirline
```

#### Setup Frontend

Navigate to the frontend folder and run:

```bash
npm install
npm start
```

Access the application at `http://localhost:3000`.

#### Setup Backend

Navigate to the backend folder and run:

```bash
docker compose up --build
```

The backend will start at `http://127.0.0.1:8000`.

## API and Backend

The backend exposes RESTful APIs for:

- **Flight Management**: Manage flight schedules, routes, and available seats.
- **Passenger Booking**: Create, update, and delete flight reservations.
- **Airplane and Airport Details**: Manage airplane models, capacities, and airport information.

### API Documentation

Once the backend server is running, access Swagger UI for API documentation at:

```text
http://127.0.0.1:8000/docs
```

The Swagger UI provides an interactive interface for exploring and testing the API endpoints.

---

## Project Highlights

- **Type-Safe Development**: The frontend uses TypeScript to catch errors early in the development process, improving maintainability and scalability.
- **Modular Design**: The application follows a component-based architecture, allowing for reusable and maintainable code.
- **High Performance**: FastAPI ensures low latency and fast response times for API requests.
- **Scalable**: The backend is designed with scalability in mind, making it easier to extend functionality as the application grows.

---

## Code Standards

### Frontend

- Use **React functional components** and **hooks** for building user interface components.
- 
### Backend

- Follow **FastAPI conventions** for defining API routes and services.
- Ensure **secure API access** with proper input validation and session management to protect user data.

### Documentation

- Keep code well-documented with **comments** and **README updates** to provide clarity to future developers.
- Ensure **proper API documentation** is available using tools like Swagger UI.

---

## Contributors

- **Team Members**:
  - Bùi Đức Anh - 22028071 (Backend Developer, Database Administrator, Project Manager)
  - Nguyễn Tuấn Anh - 22028303 (Frontend Developer, UI/UX Designer)
  - Vũ Việt Hùng - 22028124 (Backend Developer, Database Administrator, Integration Developer)
- Developed as part of **INT3306 - Phát triển ứng dụng web** course.

---

## Future Improvements

- Integrate **secure payment gateways** for flight bookings.
- Enhance **admin dashboards** with advanced analytics and reporting features.
- Improve **search algorithms** for better flight results based on user preferences.
