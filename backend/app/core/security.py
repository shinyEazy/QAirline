from datetime import timedelta, datetime
from fastapi import status, Depends
from fastapi.exceptions import HTTPException
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel
from pydantic import BaseModel
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from core.database import get_db
from typing import List
from app.models import User
import hashlib
import os

SECRET_KEY = "123"
ALGORITMH = "HS256"
RANDOM_BYTES = 16

API_TEST_MODE = os.getenv("API_TEST_MODE", "false").lower() == "true"


class UserToken(BaseModel):
    access_token: str
    token_type: str


bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_admin_scheme = OAuth2PasswordBearer(tokenUrl="api/admin/auth")
oauth2_user_scheme = OAuth2PasswordBearer(tokenUrl="api/user/auth")


class OAuth2WithName(OAuth2):
    def __init__(self, name: str, tokenUrl: str):
        flows = OAuthFlowsModel(password={"tokenUrl": tokenUrl})
        super().__init__(flows=flows)
        self.scheme_name = name


oauth2_admin_scheme = OAuth2WithName(name="Admin Auth", tokenUrl="api/admin/auth")
oauth2_user_scheme = OAuth2WithName(name="User Auth", tokenUrl="api/user/auth")


class TokenData(BaseModel):
    username: str


def authenticate_user(user, password: str):
    """Authenticate the user"""
    return bcrypt_context.verify(password, str(user.password))


# def create_access_token_admin(admin, expires_delta: timedelta):
#     """Create a JWT access token."""
#     encode = {"sub": admin.username, "id": admin.admin_id, "role": "admin"}
#     expires = datetime.now() + expires_delta
#     encode.update({"expires": expires.isoformat()})
#
#     return jwt.encode(encode, SECRET_KEY, ALGORITMH)


def create_access_token_user(user, expires_delta: timedelta):
    """Create a JWT access token."""
    encode = {"sub": user.username, "id": user.user_id, "role": user.role}
    expires = datetime.now() + expires_delta
    encode.update({"expires": expires.isoformat()})

    return jwt.encode(encode, SECRET_KEY, ALGORITMH)


# async def get_current_admin(
#     token: str = Depends(oauth2_admin_scheme), db: Session = Depends(get_db)
# ):
#     credential_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Admin"},
#     )
#
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITMH])
#         username: str = payload.get("sub")
#
#         if not username:
#             raise credential_exception
#
#         token_data = TokenData(username=username)
#     except JWTError:
#         raise credential_exception
#
#     user = get_admin_by_username(token_data.username, db=db)
#
#     if not user:
#         raise credential_exception
#
#     return user


async def get_current_user(
    token: str = Depends(oauth2_user_scheme),
    db: Session = Depends(get_db),
):
    print(f"Token nhận được: {token}")
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        if token.startswith("Bearer "):
            token = token[len("Bearer ") :]

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITMH])
        username: str = payload.get("sub")

        print(username)
        if not username:
            raise credential_exception
    except JWTError:
        raise credential_exception

    user = db.query(User).filter(User.username == username).first()

    if not user:
        raise credential_exception

    return user


def role_checker(required_roles: List[str]):

    def check_role(user: User = Depends(get_current_user)):
        if user.role not in required_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied",
            )
        return user

    return check_role


def generate_booking_id_hash(
    booker_email: str,
    number_of_adults: int,
    number_of_children: int,
    flight_class: str,
    flight_id: int,
) -> str:
    # Create a string representation of the key fields
    hash_input = f"{booker_email}|{number_of_adults}|{number_of_children}|{flight_class}|{flight_id}|{os.urandom(RANDOM_BYTES)}"

    # Generate a SHA-256 hash
    booking_id_hash = hashlib.sha256(hash_input.encode()).hexdigest()

    # Optional: You can truncate the hash if you want a shorter ID
    return booking_id_hash[:6].upper()  # First 16 characters
