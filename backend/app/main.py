import sys
import os


sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "app")))

import fastapi
from sqlalchemy.exc import OperationalError
import models
from core.database import engine
import time
from api.main import api_router

app = fastapi.FastAPI()

# wait for db to start to connect
while True:
    try:
        models.Base.metadata.create_all(bind=engine)
        break
    except OperationalError:
        print("Database is not ready, retrying in 5 seconds...")
        time.sleep(5)

app.include_router(api_router)
