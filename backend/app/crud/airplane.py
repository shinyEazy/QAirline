from sqlalchemy.orm import Session
from schemas import AirplaneModelCreate, AirplaneModelUpdate, AirplaneCreate, AirplaneUpdate
from .crud_utils import *
from models import AirplaneModel, Airplane

# CRUD for AirplaneModel
def create_airplane_model(db: Session, airplane_model: AirplaneModelCreate) -> AirplaneModel:
   return create(AirplaneModel, db, airplane_model.model_dump())

def get_airplane_model(db: Session, airplane_model_id: int) -> AirplaneModel:
   db_airplane_model = db.query(AirplaneModel).filter(AirplaneModel.airplane_model_id == airplane_model_id).first()
   return db_airplane_model

def update_airplane_model(db: Session, db_airplane_model:Airplane,airplane_model:AirplaneModelUpdate) -> AirplaneModel:
    return update(db_airplane_model, db, airplane_model.model_dump())

def delete_airplane_model(db:Session, db_airplane_model:AirplaneModel) -> AirplaneModel:
    return delete(db_airplane_model,db)



# CRUD for Airplane
def create_airplane(db: Session, airplane: AirplaneCreate) -> Airplane:
    return create(Airplane, db, airplane.model_dump())

def get_airplane(db: Session, airplane_id: int) -> Airplane:
    db_airplane = db.query(Airplane).filter(Airplane.airplane_id == airplane_id).first()
    return db_airplane

def update_airplane(db: Session, db_airplane:Airplane,airplane:AirplaneUpdate) -> Airplane:
    return update(db_airplane, db, airplane.model_dump())

def delete_airplane(db:Session, db_airplane:Airplane) -> Airplane:
    return delete(db_airplane,db)
