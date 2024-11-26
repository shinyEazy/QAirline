from sqlalchemy.orm import Session
from typing import Type

# from app.data import Base


def create(model, db: Session, data: dict):
    db_obj = model(**data)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def update(queried_model, db: Session, data: dict):
    for key, value in data.items():
        setattr(queried_model, key, value)
    db.commit()
    db.refresh(queried_model)
    return queried_model


def delete(queried_model, db: Session):
    db.delete(queried_model)
    db.commit()
    return queried_model
