from pydantic import BaseModel

from src.db.schemas.baseSchema import BaseSchema


class TableBaseSchema(BaseModel):
    name: str


class TableCreateSchema(TableBaseSchema):
    pass


class TableSchema(TableBaseSchema, BaseSchema):
    class Config:
        from_attribute = True
        arbitrary_types_allowed = True
