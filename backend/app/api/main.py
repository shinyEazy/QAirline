from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import (
    admin,
    passenger,
    booking,
    airplane,
    airport,
    flight,
    payment,
    user,
)

app = FastAPI()

# Cấu hình CORS
origins = [
    "http://localhost:3000",  # Thêm địa chỉ frontend của bạn
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
api_router = APIRouter()

# api_router.include_router(admin.router, prefix="/api", tags=["Admin"])
api_router.include_router(user.router, prefix="/api", tags=["User"])
api_router.include_router(passenger.router, prefix="/api", tags=["Passenger"])
api_router.include_router(booking.router, prefix="/api", tags=["Booking"])
api_router.include_router(airplane.router, prefix="/api", tags=["Airplane"])
api_router.include_router(airport.router, prefix="/api", tags=["Airport"])
api_router.include_router(flight.router, prefix="/api", tags=["Flight"])
api_router.include_router(payment.router, prefix="/api", tags=["Payment"])
