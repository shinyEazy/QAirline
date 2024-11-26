from .base import SchemaModel

class AirportBase(SchemaModel):
    airport_id: int
    airport_code: str
    city: str
    name: str

class AirportCreate(SchemaModel):
    airport_code: str
    city: str
    name: str

class AirportUpdate(SchemaModel):
    airport_code: str
    city: str
    name: str