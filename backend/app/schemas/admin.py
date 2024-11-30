from pydantic import BaseModel, EmailStr, fields
from datetime import datetime

# from . import SchemaModel  # Import from base.py
from .base import SchemaModel


class AdminCreate(SchemaModel):
    username: str
    password: str


class AdminUpdate(AdminCreate):
    pass
