from typing import Annotated
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from schemas.user import *
from crud.user import *
from sqlalchemy.orm import Session
from core.database import get_db
from core.security import (
    authenticate_user,
    bcrypt_context,
    create_access_token_user,
    get_current_user,
    UserToken,
)
from datetime import timedelta

router = APIRouter(prefix="/user", tags=["User"])
ACCESS_TOKEN_EXPIRES_MINUTES = timedelta(minutes=20)

@router.get("/{user_id}")
async def get_user_end_point(user_id: int, db: Session = Depends(get_db)):
    """
    Get a specific user by user_id
    """
    db_user = get_user(user_id, db)

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return db_user

@router.get("/")
async def get_all_user_end_point(db: Session = Depends(get_db)):
    """
    Get all users
    """
    db_users = get_all_users(db)
    return db_users

@router.get("/username/{username}")
async def get_user_by_username_end_point(username: str, db: Session = Depends(get_db)):
    """
    Get a specific user by username
    """
    db_user = get_user_by_username(username, db)

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return db_user


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user_end_point(user: UserCreate, db: Session = Depends(get_db)):
    """
    Create a new user
    """
    db_user = get_user_by_username(user.username, db)

    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    user.password = bcrypt_context.hash(user.password)
    new_user = create_user(user, db)
    return {
        "user_id": new_user.user_id,
        "email": new_user.email,
        "message": "User created successfully",
    }

@router.put("/{user_id}")
async def update_user_end_point(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    """
    Update a user
    """
    db_user = get_user(user_id, db)

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    updated_user = update_user(db_user, user, db)
    return updated_user

@router.delete("/{username}")
async def delete_user_end_point(username: str, db: Session = Depends(get_db)):
    """
    Delete a user
    """
    db_user = get_user_by_username(username, db)

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    deleted_user = delete_user(db_user, db)
    return deleted_user

@router.get("/me")
async def get_user_me_end_point(
    current_user: User = Depends(get_current_user),
):
    return current_user


@router.post("/auth", response_model=UserToken)
async def authenticate_user_end_point(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db),
):
    db_user = get_user_by_username(form_data.username, db)

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not authenticate_user(db_user, form_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate user",
            headers={"WWW-Authenticate": "User"},
        )

    token = create_access_token_user(db_user, ACCESS_TOKEN_EXPIRES_MINUTES)
    return {
        "access_token": token,
        "token_type": "user",
        "message": "successfully authenticated",
    }