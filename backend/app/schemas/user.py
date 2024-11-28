from pydantic import BaseModel, EmailStr, fields
from datetime import datetime

# from . import SchemaModel  # Import from base.py
from .base import SchemaModel


class UserCreate(SchemaModel):
    email: EmailStr
    password: str


class UserBase:
    user_id: int
    email: EmailStr
    password: str


class UserResponse(UserBase):
    pass


class UserAuth(UserCreate):
    pass


class UserUpdate(SchemaModel):
    password: str


class UserToken(BaseModel):
    access_token: str
    token_type: str
