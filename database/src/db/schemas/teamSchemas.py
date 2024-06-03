from pydantic import BaseModel
from sqlalchemy.dialects.postgresql import UUID
from src.db.schemas.baseSchema import BaseSchema


class TeamBaseSchema(BaseModel):
    color: str
    score: int
    is_winner: bool


class TeamCreateSchema(TeamBaseSchema):
    pass


class TeamSchema(TeamBaseSchema, BaseSchema):
    class Config:
        from_attribute = True
        arbitrary_types_allowed = True
