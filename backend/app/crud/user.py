from app.schemas.user import UserCreateAdmin, UserCreate, UserUpdate
from .crud_utils import *

from app.models import User
from sqlalchemy.orm import Session


def get_user(user_id: int, db: Session) -> User:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table users where users.id = user_id'
    Returns user
    """
    db_user = db.query(User).filter(User.user_id == user_id).first()

    # if not db_user:
    # raise HTTPException(status_code=404, detail="User not found")
    return db_user


def get_user_by_username(username: str, db: Session) -> User:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table users where users.email = user_email'
    Returns user
    """
    db_user = db.query(User).filter(User.username == username).first()

    return db_user


def get_all_users(db: Session):
    """
    Equivalent to a SQL query that is 'SELECT * FROM table users'
    Returns all users
    """
    return db.query(User).all()


def create_user(user: UserCreate, db: Session):
    """
    Equivalent to a SQL query that is 'INSERT INTO users values (user.email, user.password, datetime.now)'
    """

    return create(User, db, user.model_dump())


def update_user(db_user: User, user: UserUpdate, db: Session):
    """
    Equivalent to a SQL query that is 'UPDATE users SET password=user.password WHERE users.id = user_id'
    """
    return update(db_user, db, user.model_dump())


def create_admin(user: UserCreateAdmin, db: Session):
    """
    Equivalent .. <-> Create an admin
    """

    return create(User, db, user.model_dump())


def delete_user(db_user: User, db: Session):
    """
    Delete a user
    """

    return delete(db_user, db)
