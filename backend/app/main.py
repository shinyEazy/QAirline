import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "app")))

import fastapi
from pydantic import BaseModel
from typing import Annotated
from sqlalchemy.orm import Session
import models
from database import engine, SessionLocal
import crud
from datetime import datetime

app = fastapi.FastAPI()
models.Base.metadata.create_all(bind=engine)


class UserBase(BaseModel):
    email: str
    password: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, fastapi.Depends(get_db)]


@app.post("/users/")
async def create_users(user: UserBase, db: db_dependency):
    db_user = models.User(
        email=user.email, password=user.password, created_at=datetime.now()
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)


@app.get("/user/{user_id}")
async def get_user(user_id: int, db: db_dependency):
    return crud.get_user(user_id, db)
