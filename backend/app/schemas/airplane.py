from .base import SchemaModel


class AirplaneModel(SchemaModel):
    airplane_model_id: int
    name: str
    manufacturer: str
    total_seats: int


class AirplaneBase(SchemaModel):
    airplane_id: int
    registration_number: str
    current_airport_code: str
    model: AirplaneModel
