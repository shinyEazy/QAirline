from fastapi import APIRouter, HTTPException, Depends
import schemas, models
from crud import create_user, get_user, get_all_users, get_user_by_email, delete_user
from sqlalchemy.orm import Session
from database import get_db

router = APIRouter(prefix="/user", tags=["User"])


@router.get("/{user_id}")
def get_user_end_point(user_id: int, db: Session = Depends(get_db)):
    """
    Get a specific user by user_id
    """
    db_user = get_user(user_id, db)
    return db_user
