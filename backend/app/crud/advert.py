from fastapi import UploadFile, HTTPException
from app.models import Advert
from app.schemas.advert import AdvertBase, AdvertCreate
from .crud_utils import *
from sqlalchemy.orm import Session
import os

UPLOAD_DIR = os.path.join("static")
os.makedirs(UPLOAD_DIR, exist_ok=True)


async def create_advert(file: UploadFile, advert_name: str, text: str, db: Session):
    """
    Create an advertisement
    """

    # Get the current working directory to join the path correctly
    current_directory = os.getcwd()

    # Ensure the upload directory exists
    upload_path = os.path.join(current_directory, UPLOAD_DIR)
    os.makedirs(upload_path, exist_ok=True)

    # Print the directory and file name for debugging
    print(f"Upload directory: {upload_path}")
    print(f"File name: {file.filename}")

    # Get the file path where we want to save the uploaded file
    file_path = os.path.join(upload_path, file.filename)

    # Check if the file path is correct
    print(f"Saving file to: {file_path}")

    try:
        # Save the uploaded file
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)
        print(f"File saved successfully at {file_path}")
    except Exception as e:
        print(f"Error saving file: {e}")
        raise HTTPException(status_code=500, detail="File save error")

    # Generate a URL for the saved file (you can adjust this to match your setup)
    file_url = f"http://localhost:8000/{UPLOAD_DIR}/{file.filename}"
    print(f"File URL: {file_url}")

    # Prepare the advertisement model
    ad_model = {
        "advert_name": advert_name,
        "text": text,
        "media_link": file_url,
    }

    # Call your create function to save the advertisement in the DB
    return create(Advert, db, ad_model)


def update_advert(ad: AdvertBase, db: Session):
    """
    Update an advertisement
    """
    return update(Advert, db, ad.model_dump())


def delete_advert(db_ad: Advert, db: Session):
    """
    Delete an advertisement
    """

    return delete(db_ad, db)


def get_adverts(db: Session):
    """
    Get all advertisements
    """

    return get_all(Advert, db)


def get_advert(advert_name: str, db: Session):
    """
    Get an advertisement using it's name
    """

    db_ad = db.query(Advert).filter(Advert.advert_name == advert_name).first()

    return db_ad
