from fastapi import APIRouter, HTTPException, Depends
import schemas, models
from crud.user import *
from sqlalchemy.orm import Session
from database import get_db

router = APIRouter(prefix="/user", tags=["User"])


@router.get("/{user_id}")
def get_user_end_point(user_id: int, db: Session = Depends(get_db)):
    """
    Get a specific user by user_id
    """
    db_user = get_user(user_id, db)

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return db_user


@router.get("/")
def get_all_users_end_point(db: Session = Depends(get_db)):
    """
    Get all users
    """
    db_users = get_all_users(db)
    return db_users


@router.get("/email/{user_email}")
def get_user_by_email_end_point(user_email: str, db: Session = Depends(get_db)):
    """
    Get a specific user by user_email
    """
    db_user = get_user_by_email(user_email, db)

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return db_user


@router.post("/")
def create_user_end_point(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Create a user
    """
    if get_user_by_email(user.email, db):
        raise HTTPException(
            status_code=400, detail="A user with this email already registered"
        )
    return create_user(user, db)


@router.delete("/{user_id}")
def delete_user_end_point(user_id: int, db: Session = Depends(get_db)):
    """
    Delete a user by user_id
    """
    db_user = delete_user(user_id, db)

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return db_user
