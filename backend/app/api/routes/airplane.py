from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.security import role_checker
from service.airport import get_airport
from service.airplane import *
from schemas import (
    AirplaneModelCreate,
    AirplaneModelUpdate,
    AirplaneCreate,
    AirplaneUpdate,
)
from core.database import get_db

router = APIRouter(
    prefix="/airplanes",
    tags=["Airplane"],
    dependencies=[Depends(role_checker(["admin"]))],
)

# Endpoints for AirplaneModel


@router.post("/models/")
async def create_airplane_model_end_point(
    airplane_model: AirplaneModelCreate, db: Session = Depends(get_db)
):
    return create_airplane_model(db, airplane_model)


@router.get("/models/{airplane_model_id}")
async def get_airplane_model_end_point(
    airplane_model_id: int, db: Session = Depends(get_db)
):
    db_airplane_model = get_airplane_model(db, airplane_model_id=airplane_model_id)
    if not db_airplane_model:
        raise HTTPException(status_code=404, detail="Airplane model not found")
    return db_airplane_model


@router.put("/models/{airplane_model_id}")
async def update_airplane_model_end_point(
    airplane_model_id: int,
    airplane_model: AirplaneModelUpdate,
    db: Session = Depends(get_db),
):
    """
    Update an airplane model
    """
    db_airplane_model = get_airplane_model(db, airplane_model_id)
    if not db_airplane_model:
        raise HTTPException(status_code=404, detail="Airplane model not found")
    return update_airplane_model(db, db_airplane_model, airplane_model)


@router.delete("/models/{airplane_model_id}")
async def delete_airplane_model_end_point(
    airplane_model_id: int, db: Session = Depends(get_db)
):
    """
    Delete an airplane model
    """
    db_airplane_model = get_airplane_model(db, airplane_model_id)
    if not db_airplane_model:
        raise HTTPException(status_code=404, detail="Airplane model not found")
    return delete_airplane_model(db, db_airplane_model)


# Endpoints for Airplane


@router.post("/")
async def create_airplane_end_point(
    airplane: AirplaneCreate, db: Session = Depends(get_db)
):
    if not get_airport(db, airplane.current_airport_id):
        raise HTTPException(status_code=404, detail="Airport not found")
    if not get_airplane_model(db, airplane.airplane_model_id):
        raise HTTPException(status_code=404, detail="Airplane model not found")
    return create_airplane(db, airplane)


@router.get("/{airplane_id}")
async def get_airplane_by_id_end_point(airplane_id: int, db: Session = Depends(get_db)):
    db_airplane = get_airplane_by_id(db, airplane_id=airplane_id)
    if not db_airplane:
        raise HTTPException(status_code=404, detail="Airplane not found")
    return db_airplane


@router.put("/{airplane_id}")
async def update_airplane_end_point(
    airplane_id: int, airplane: AirplaneUpdate, db: Session = Depends(get_db)
):
    """
    Update an airplane
    """
    db_airplane = get_airplane_by_id(db, airplane_id)
    if not db_airplane:
        raise HTTPException(status_code=404, detail="Airplane not found")
    return update_airplane(db, db_airplane, airplane)

@router.get("/by-regis/{registration_number}")
async def get_airplane_by_registration_number_end_point(registration_number: str, db: Session = Depends(get_db)):
    db_airplane = get_airplane_by_registration_number(db, registration_number=registration_number)
    if not db_airplane:
        raise HTTPException(status_code=404, detail="Airplane not found")
    return db_airplane
 
@router.delete("/{airplane_id}")
async def delete_airplane_end_point(airplane_id: int, db: Session = Depends(get_db)):
    """
    Delete an airplane
    """
    db_airplane = get_airplane_by_id(db, airplane_id)
    if not db_airplane:
        raise HTTPException(status_code=404, detail="Airplane not found")
    return delete_airplane(db, db_airplane)


@router.get("/by-city/{city}", response_model=List[AirplaneInfo])
async def get_airplane_by_city_end_point(city: str, db: Session = Depends(get_db)):
    """
    Get a list of airplanes by city
    """
    db_airplanes = get_airplane_by_city(db, city)
    if not db_airplanes:
        raise HTTPException(status_code=404, detail="Airplane not found")
    return db_airplanes
