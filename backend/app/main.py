import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "app")))

import fastapi
from pydantic import BaseModel
from typing import Annotated
from sqlalchemy.orm import Session
import models, schemas, crud
from database import engine, SessionLocal
from datetime import datetime

app = fastapi.FastAPI()
models.Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, fastapi.Depends(get_db)]


@app.post("/users/")
async def create_users(user: schemas.UserCreate, db: db_dependency):
    return crud.create_user(user, db)


@app.get("/user/{user_id}")
async def get_user(user_id: int, db: db_dependency):
    return crud.get_user(user_id, db)
