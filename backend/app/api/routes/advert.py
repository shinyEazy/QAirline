from fastapi import APIRouter, Depends, Form, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from app.core.database import get_db
from app.core.security import role_checker
from app.service.advert import (
    create_advert,
    delete_advert,
    get_adverts,
    get_advert,
    update_advert,
)
from app.schemas.advert import AdvertBase, AdvertCreate


router = APIRouter(
    prefix="/advert",
    tags=["Advert"],
)


@router.get("/{advert_name}")
def get_advert_end_point(advert_name: str, db: Session = Depends(get_db)):
    """
    API end point: Get an advertisement using that advert's name
    """

    db_ad = get_advert(advert_name, db)

    if not db_ad:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail="Advertisement not found"
        )

    return db_ad


@router.post("/", dependencies=[Depends(role_checker(["admin"]))])
async def create_advert_end_point(
    file_upload: UploadFile = File(...),
    advert_name: str = Form(...),
    text: str = Form(...),
    db: Session = Depends(get_db),
):
    """
    API end point: Create an advertisement
    """

    db_ad = get_advert(advert_name=advert_name, db=db)

    if db_ad:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="An advert with that name already existed",
        )

    new_db_ad = await create_advert(file_upload, advert_name, text, db)

    return {"message": "New advertisement has been created"}


@router.put("/{advert_name}", dependencies=[Depends(role_checker(["admin"]))])
def update_advert_end_point(
    advert_name: str, advert: AdvertBase, db: Session = Depends(get_db)
):
    """
    API end point: Update an advertisement
    """

    db_ad = get_advert(advert_name=advert_name, db=db)

    updated_advert = get_advert(advert_name=advert.advert_name, db=db)

    if not db_ad:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail="Advertisement not found"
        )

    if updated_advert:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="Cannot update an advert with that name, as an advertisement with that name already exist",
        )

    update_advert(advert, db)

    return {"message": "Succesfully updated"}


@router.delete("/{advert_name}", dependencies=[Depends(role_checker(["admin"]))])
def delete_advert_end_point(advert_name: str, db: Session = Depends(get_db)):
    """
    API end point: Delete an advertisment
    """
    db_ad = get_advert(advert_name, db)

    if not db_ad:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail="Advertisement not found"
        )

    delete_advert(db_ad, db)

    return {"message": "Succesfully deleted"}


@router.get("/")
def get_all_adverts_end_point(db: Session = Depends(get_db)):
    """
    API end point: Get all adverts
    """

    db_ads = get_adverts(db)

    return db_ads
