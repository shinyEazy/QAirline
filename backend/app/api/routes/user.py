from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
import schemas, models
from crud.user import *
from sqlalchemy.orm import Session
from database import get_db
import logging

router = APIRouter(prefix="/user", tags=["User"])


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


@router.post("/")
async def create_user_end_point(
    user: schemas.UserCreate, db: Session = Depends(get_db)
):
    """
    Create a user
    """
    if get_user_by_email(user.email, db):
        raise HTTPException(
            status_code=400, detail="A user with this email already registered"
        )
    return create_user(user, db)


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
    user_id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)
):
    """
    Update a user by user_id
    """
    db_user = get_user(user_id, db)

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return update_user(db_user, user, db)
