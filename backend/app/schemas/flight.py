from datetime import datetime
from typing import List, Optional
from .base import SchemaModel
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
from .airplane import AirplaneBase
=======
from .airplane import AirplaneBase as Airplane
>>>>>>> origin/main
=======
from .airplane import AirplaneBase as Airplane
>>>>>>> origin/main
=======
from .airplane import AirplaneBase as Airplane
>>>>>>> origin/main
=======
from .airplane import AirplaneBase as Airplane
>>>>>>> origin/main
from .flight_seats import FlightSeats

class Flight(SchemaModel):
    flight_id: int
    estimated_departure_time: datetime
    actual_departure_time: Optional[datetime]
    estimated_arrival_time: datetime
    actual_arrival_time: Optional[datetime]
    destination_airport_code: str
    status: str
    airplane: AirplaneBase
    flight_seats: List[FlightSeats]


class FlightCreate(SchemaModel):
    airplane_id: int
    estimated_departure_time: datetime
    estimated_arrival_time: datetime
    destination_airport_code: str
    status: str = "Scheduled"
