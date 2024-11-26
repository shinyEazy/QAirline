from .crud_utils import *
from models import User
from sqlalchemy.orm import Session
from datetime import datetime
from schemas import UserCreate, UserUpdate


def get_user(user_id: int, db: Session) -> User:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table users where users.id = user_id'
    Returns User
    """
    db_user = db.query(User).filter(User.id == user_id).first()

    # if not db_user:
    # raise HTTPException(status_code=404, detail="User not found")
    return db_user


def get_all_users(db: Session):
    """
    Equivalent to a SQL query that is 'SELECT * FROM table users'
    Returns User
    """
    return db.query(User).all()


def get_user_by_email(user_email: str, db: Session) -> User:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table users where users.email = user_email'
    Returns User
    """
    db_user = db.query(User).filter(User.email == user_email).first()

    return db_user


def delete_user(db_user, db: Session) -> User:
    """
    Equivalent to a SQL query that is 'DELETE FROM table users where users.id = user_id'
    Returns User
    """
    # return the deleted object, cascade is on for passengers and admin
    return delete(db_user, db)


def create_user(user: UserCreate, db: Session):
    # note: Cần phải xây dựng cơ sở trước rồi sẽ tạo authentication với hashing password sau.
    """
    Equivalent to a SQL query that is 'INSERT INTO users values (user.email, user.password, datetime.now)'
    """

    return create(User, db, user.dict())


def update_user(db_user: User, user: UserUpdate, db: Session):
    """
    Equivalent to a SQL query that is 'UPDATE users SET password=user.password WHERE users.id = user_id'
    """
    return update(db_user, db, user.dict())
