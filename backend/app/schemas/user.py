from pydantic import EmailStr
from datetime import datetime

# from . import SchemaModel  # Import from base.py
from .base import SchemaModel


class UserCreate(SchemaModel):
    email: EmailStr
    password: str
    created_at: datetime = datetime.now()


class UserBase:
    user_id: int
    email: EmailStr
    password: str


class UserResponse(UserBase):
    pass


class UserUpdate(SchemaModel):
    password: str
