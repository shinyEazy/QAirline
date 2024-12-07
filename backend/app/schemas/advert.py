from .base import SchemaModel


class AdvertBase(SchemaModel):
    advert_name: str
    media_link: str
    text: str


class AdvertCreate(SchemaModel):
    advert_name: str
    text: str
