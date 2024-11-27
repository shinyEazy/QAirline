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
    create_access_token,
    get_current_user,
)
from datetime import timedelta

router = APIRouter(prefix="/user", tags=["User"])
ACCESS_TOKEN_EXPIRES_MIUTES = timedelta(minutes=20)


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
async def get_all_users_end_point(db: Session = Depends(get_db)):
    """
    Get all users
    """
    db_users = get_all_users(db)
    return db_users


@router.get("/email/{user_email}")
async def get_user_by_email_end_point(user_email: str, db: Session = Depends(get_db)):
    """
    Get a specific user by user_email
    """
    db_user = get_user_by_email(user_email, db)

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return db_user


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user_end_point(user: UserCreate, db: Session = Depends(get_db)):
    """
    Create a user
    """
    if get_user_by_email(user.email, db):
        raise HTTPException(
            status_code=400, detail="A user with this email already registered"
        )

    user.password = bcrypt_context.hash(user.password)

    new_user = create_user(user, db)
    return {
        "id": new_user.id,
        "email": new_user.email,
        "message": "User created successfully",
    }


@router.delete("/{user_id}")
async def delete_user_end_point(user_id: int, db: Session = Depends(get_db)):
    """
    Delete a user by user_id
    """
    db_user = get_user(user_id, db)

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return delete_user(db_user, db)


@router.put("/{user_id}")
async def update_user_end_point(
    user_id: int, user: UserUpdate, db: Session = Depends(get_db)
):
    """
    Update a user by user_id
    """
    db_user = get_user(user_id, db)

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return update_user(db_user, user, db)


@router.get("/me")
async def get_users_me_end_point(current_user: User = Depends(get_current_user)):
    return current_user


@router.post("/auth", response_model=UserToken)
async def authenticate_user_end_point(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db),
):
    """
    Authenticate a user
    """

    # treat email as username
    db_user = get_user_by_email(form_data.username, db)

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not authenticate_user(db_user, form_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate user",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(db_user, ACCESS_TOKEN_EXPIRES_MIUTES)
    return {
        "access_token": token,
        "token_type": "bearer",
        "message": "successfully authenticated",
    }
