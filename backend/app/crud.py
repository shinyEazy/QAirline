from sqlalchemy.orm import Session
import models, schemas
from datetime import datetime


def get_user(user_id: int, db: Session) -> models.User:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table users where users.id = user_id'
    Returns models.User
    """
    return db.query(models.User).filter(models.User.id == user_id).first()
