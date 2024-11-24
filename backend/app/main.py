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
async def create_user(user: schemas.UserCreate, db: db_dependency):
    return crud.create_user(user=user, db=db)


@app.get("/user/{user_id}")
async def get_user(user_id: int, db: db_dependency):
    return crud.get_user(user_id=user_id, db=db)


@app.delete("/user/{user_id}")
async def delete_user(user_id: int, db: db_dependency):
    return crud.delete_user(user_id=user_id, db=db)


@app.post("/passengers/")
async def create_passenger(passenger: schemas.PassengerCreate, db: db_dependency):
    return crud.create_passenger(passenger=passenger, db=db)


@app.get("/passengers/{passenger_id}")
async def get_passenger(passenger_id: int, db: db_dependency):
    return crud.get_passenger(passenger_id=passenger_id, db=db)
