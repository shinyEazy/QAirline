from typing import Annotated
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from schemas.admin import *
from crud.admin import *
from sqlalchemy.orm import Session
from core.database import get_db
from core.security import (
    authenticate_user,
    bcrypt_context,
    create_access_token,
    get_current_user,
    UserToken,
)
from datetime import timedelta

router = APIRouter(prefix="/admin", tags=["Admin"])
ACCESS_TOKEN_EXPIRES_MIUTES = timedelta(minutes=20)


@router.get("/{admin_id}")
async def get_user_admin_end_point(admin_id: int, db: Session = Depends(get_db)):
    """
    Get a specific user by admin_id
    """
    db_user_admin = get_admin(admin_id, db)

    if not db_user_admin:
        raise HTTPException(status_code=404, detail="User not found")

    return db_user_admin


@router.get("/")
async def get_all_admin_end_point(db: Session = Depends(get_db)):
    """
    Get all users
    """
    db_user_admins = get_all_admins(db)
    return db_user_admins


@router.get("/username/{username}")
async def get_user_admin_by_username_end_point(
    username: str, db: Session = Depends(get_db)
):
    """
    Get a specific user by username
    """
    db_user_admin = get_admin_by_username(username, db)

    if not db_user_admin:
        raise HTTPException(status_code=404, detail="User not found")

    return db_user_admin


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_admin_end_point(admin: AdminCreate, db: Session = Depends(get_db)):
    """
    Create a user
    """
    if get_admin_by_username(admin.username, db):
        raise HTTPException(
            status_code=400, detail="A user with this email already registered"
        )

    admin.password = bcrypt_context.hash(admin.password)

    new_user_admin = create_admin(admin, db)
    return {
        "id": new_user_admin.admin_id,
        "username": new_user_admin.username,
        "message": "User created successfully",
    }


@router.delete("/{user_id}")
async def delete_admin_end_point(admin_id: int, db: Session = Depends(get_db)):
    """
    Delete a user by user_id
    """
    db_user_admin = get_admin(admin_id, db)

    if not db_user_admin:
        raise HTTPException(status_code=404, detail="User not found")

    return delete_admin(db_user_admin, db)


@router.put("/{user_id}")
async def update_user_end_point(
    user_admin_id: int, user_admin: AdminUpdate, db: Session = Depends(get_db)
):
    """
    Update a user by user_id
    """
    db_user_admin = get_admin(user_admin_id, db)

    if not db_user_admin:
        raise HTTPException(status_code=404, detail="User not found")

    return update_admin(db_user_admin, user_admin, db)


@router.get("/me")
async def get_user_admin_me_end_point(
    current_user_admin: Admin = Depends(get_current_user),
):
    return current_user_admin


@router.post("/auth", response_model=UserToken)
async def authenticate_user_admin_end_point(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db),
):
    """
    Authenticate a user admin
    """

    # treat email as username
    db_user_admin = get_admin_by_username(form_data.username, db)

    if not db_user_admin:
        raise HTTPException(status_code=404, detail="User not found")

    if not authenticate_user(db_user_admin, form_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate user",
            headers={"WWW-Authenticate": "Admin"},
        )

    token = create_access_token(db_user_admin, ACCESS_TOKEN_EXPIRES_MIUTES)
    return {
        "access_token": token,
        "token_type": "admin",
        "message": "successfully authenticated",
    }
