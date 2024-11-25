from pydantic import BaseModel


class SchemaModel(BaseModel):
    """
    Made to have easier time to apply configuration to other pydantic models
    """

    class Config:
        orm_mode = True
