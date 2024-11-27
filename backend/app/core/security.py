from datetime import timedelta, datetime
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from crud.user import get_user_by_email
from schemas.user import UserAuth
from jose import jwt, JWTError

SECRET_KEY = "123"
ALGORITMH = "HS256"

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="api/user/auth")


def authenticate_user(user, password: str):
    """Authenticate the user"""
    return bcrypt_context.verify(password, str(user.password))


def create_access_token(user, expires_delta: timedelta):
    """Create a JWT access token."""
    encode = {"sub": user.email, "id": user.id}
    expires = datetime.now() + expires_delta
    encode.update({"expires": expires.isoformat()})

    return jwt.encode(encode, SECRET_KEY, ALGORITMH)
