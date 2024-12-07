import sys
import os
import time
import fastapi
from contextlib import asynccontextmanager
from sqlalchemy.exc import OperationalError
from fastapi.middleware.cors import CORSMiddleware

from fastapi.staticfiles import StaticFiles

# Ensure the app directory is in the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "app")))
from app.crud.user import create_admin
from app.models import Base
from app.core.database import engine, get_db
from app.helper import get_default_admin
import os

@asynccontextmanager
async def lifespan(app: fastapi.FastAPI):
    # Wait for database to be ready
    while True:
        try:
            Base.metadata.create_all(bind=engine)
            break
        except OperationalError:
            print("Database is not ready, retrying in 5 seconds...")
            time.sleep(5)

    # Create default admin
    db = next(get_db())
    try:
        admin_user = get_default_admin()
        create_admin(admin_user, db)
    except Exception as e:
        print(f"Error creating admin user: {e}")

    yield


# Create FastAPI app with lifespan
app = fastapi.FastAPI(lifespan=lifespan)
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

static_dir = "static"
if not os.path.exists(static_dir):
    os.makedirs(static_dir)
    
app.mount("/static", StaticFiles(directory="static"), name="static")
# Include router
from api.main import api_router

app.include_router(api_router)
