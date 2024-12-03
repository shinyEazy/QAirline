import sys
import os
import time
import fastapi
from contextlib import asynccontextmanager
from sqlalchemy.orm import Session
from sqlalchemy.exc import OperationalError

# Ensure the app directory is in the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "app")))

from app.crud.user import create_admin
from app.schemas.user import UserCreateAdmin
from app.models import Base
from app.core.database import engine, get_db
from core.security import bcrypt_context


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
        admin_user = UserCreateAdmin(
            firstname="bill",
            lastname="joe",
            username="admin",
            password=bcrypt_context.hash("abc123"),
            role="admin",
        )
        create_admin(admin_user, db)
    except Exception as e:
        print(f"Error creating admin user: {e}")

    yield


# Create FastAPI app with lifespan
app = fastapi.FastAPI(lifespan=lifespan)

# Include router
from api.main import api_router

app.include_router(api_router)
