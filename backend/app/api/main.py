from fastapi import APIRouter

from api.routes import admin, passenger, booking, airplane, airport, flight

api_router = APIRouter()

api_router.include_router(admin.router, prefix="/api", tags=["Admin"])
api_router.include_router(passenger.router, prefix="/api", tags=["Passenger"])
api_router.include_router(booking.router, prefix="/api", tags=["Booking"])
api_router.include_router(airplane.router, prefix="/api", tags=["Airplane"])
api_router.include_router(airport.router, prefix="/api", tags=["Airport"])
api_router.include_router(flight.router, prefix="/api", tags=["Flight"])

