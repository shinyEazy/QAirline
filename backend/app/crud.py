from sqlalchemy.orm import Session
import models, schemas
from datetime import datetime
from fastapi import HTTPException


def get_user(user_id: int, db: Session) -> models.User:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table users where users.id = user_id'
    Returns models.User
    """
    db_user = db.query(models.User).filter(models.User.id == user_id).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


def create_user(user: schemas.UserCreate, db: Session):
    # note: Cần phải xây dựng cơ sở trước rồi sẽ tạo authentication với hashing password sau.
    """
    Equivalent to a SQL query that is 'INSERT INTO users values (user.email, user.password, datetime.now)'
    """
    db_user = models.User(
        email=user.email, password=user.password, created_at=datetime.now()
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user
