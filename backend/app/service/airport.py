from sqlalchemy.orm import Session
from app.schemas import AirportCreate, AirportUpdate
from .crud_utils import *
from app.models import Airport


# CRUD for Airport
def create_airport(db: Session, airport: AirportCreate) -> Airport:
    return create(Airport, db, airport.model_dump())


def get_airport(db: Session, airport_id: int) -> Airport:
    db_airport = db.query(Airport).filter(Airport.airport_id == airport_id).first()
    return db_airport


def update_airport(db: Session, db_airport: Airport, airport: AirportUpdate) -> Airport:
    return update(db_airport, db, airport.model_dump())


def delete_airport(db: Session, db_airport: Airport) -> Airport:
    return delete(db_airport, db)

def get_city_by_airport_id(db: Session, airport_id: int) -> str:
    return db.query(Airport.city).filter(Airport.airport_id == airport_id).first()