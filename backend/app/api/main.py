from fastapi import APIRouter

from api.routes import user, passenger, booking

api_router = APIRouter()

api_router.include_router(user.router, prefix="/api", tags=["User"])
api_router.include_router(passenger.router, prefix="/api", tags=["Passenger"])
api_router.include_router(booking.router, prefix="/api", tags=["Booking"])
