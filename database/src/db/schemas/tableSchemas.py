from pydantic import BaseModel

from src.db.schemas.baseSchema import BaseSchema


class TableBase(BaseModel):
    name: str


class TableCreate(TableBase):
    pass


class Table(TableBase, BaseSchema):
    class Config:
        from_attribute = True
