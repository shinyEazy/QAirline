from datetime import timedelta, datetime
from fastapi import status, Depends
from fastapi.exceptions import HTTPException
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy.orm import Session
from crud.user import get_user_by_email
from schemas.user import UserAuth
from jose import jwt, JWTError
from core.database import get_db

SECRET_KEY = "123"
ALGORITMH = "HS256"

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/user/auth")


class TokenData(BaseModel):
    email: str


def authenticate_user(user, password: str):
    """Authenticate the user"""
    return bcrypt_context.verify(password, str(user.password))


def create_access_token(user, expires_delta: timedelta):
    """Create a JWT access token."""
    encode = {"sub": user.email, "id": user.id}
    expires = datetime.now() + expires_delta
    encode.update({"expires": expires.isoformat()})

    return jwt.encode(encode, SECRET_KEY, ALGORITMH)


async def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITMH])
        email: str = payload.get("sub")

        if not username:
            raise credential_exception

        token_data = TokenData(email=email)
    except JWTError:
        raise credential_exception

    user = get_user_by_email(user_email=token_data.email, db=db)

    if not user:
        raise credential_exception

    return user
