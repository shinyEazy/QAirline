from .base import SchemaModel

class AirplaneModelBase(SchemaModel):
    airplane_model_id: int
    name: str
    manufacturer: str
    total_seats: int

class AirplaneModelCreate(SchemaModel):
    name: str
    manufacturer: str
    total_seats: int

<<<<<<< HEAD
=======
class AirplaneModelUpdate(SchemaModel):
    name: str
    manufacturer: str
    total_seats: int

>>>>>>> origin/main
class AirplaneBase(SchemaModel):
    airplane_id: int
    airplane_model_id: int
    registration_number: str
    current_airport_id: int

class AirplaneCreate(SchemaModel):
    airplane_model_id: int
    registration_number: str
    current_airport_id: int
    

class AirplaneUpdate(SchemaModel):
    registration_number: str
    current_airport_id: int


