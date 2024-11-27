from sqlalchemy.orm import Session
from typing import Type

# from app.data import Base


def create(model, db: Session, data: dict):
    """
    Equivalent to a SQL query that is 'INSERT INTO table values ()'
    Order does matter, so the data must be in the correct order
    """
    db_obj = model(**data)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def update(queried_model, db: Session, data: dict):
    """
    Equivalent to a SQL query that is 'UPDATE table SET column = value WHERE table.id = id'
    """
    for key, value in data.items():
        setattr(queried_model, key, value)
    db.commit()
    db.refresh(queried_model)
    return queried_model


def delete(queried_model, db: Session):
    """
    Equivalent to a SQL query that is 'DELETE FROM table WHERE table.id = id'
    """
    db.delete(queried_model)
    db.commit()
    return queried_model
