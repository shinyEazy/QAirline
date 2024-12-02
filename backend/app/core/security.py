from datetime import timedelta, datetime
from fastapi import status, Depends
from fastapi.exceptions import HTTPException
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.crud.admin import get_admin_by_username
from schemas.user import UserAuth
from jose import jwt, JWTError
from core.database import get_db

SECRET_KEY = "123"
ALGORITMH = "HS256"


class UserToken(BaseModel):
    access_token: str
    token_type: str


bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_admin_scheme = OAuth2PasswordBearer(tokenUrl="api/admin/auth")
oauth2_user_scheme = OAuth2PasswordBearer(tokenUrl="api/user/auth")

class TokenData(BaseModel):
    username: str


def authenticate_user(user, password: str):
    """Authenticate the user"""
    return bcrypt_context.verify(password, str(user.password))


def create_access_token_admin(admin, expires_delta: timedelta):
    """Create a JWT access token."""
    encode = {"sub": admin.username, "id": admin.admin_id}
    expires = datetime.now() + expires_delta
    encode.update({"expires": expires.isoformat()})

    return jwt.encode(encode, SECRET_KEY, ALGORITMH)

def create_access_token_user(user, expires_delta: timedelta):
    """Create a JWT access token."""
    encode = {"sub": user.username, "id": user.user_id}
    expires = datetime.now() + expires_delta
    encode.update({"expires": expires.isoformat()})

    return jwt.encode(encode, SECRET_KEY, ALGORITMH)

async def get_current_admin(
    token: str = Depends(oauth2_admin_scheme), db: Session = Depends(get_db)
):
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Admin"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITMH])
        username: str = payload.get("sub")

        if not username:
            raise credential_exception

        token_data = TokenData(username=username)
    except JWTError:
        raise credential_exception

    user = get_admin_by_username(token_data.username, db=db)

    if not user:
        raise credential_exception

    return user

async def get_current_user(
    token: str = Depends(oauth2_user_scheme),
    db: Session = Depends(get_db),
):
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITMH])
        username: str = payload.get("sub")
        if not username:
            raise credential_exception
    except JWTError:
        raise credential_exception

    from app.crud.user import get_user_by_username  # Import thêm CRUD cho user
    user = get_user_by_username(username, db=db)
    if not user:
        raise credential_exception

    return user

