from pydantic import BaseModel

from src.db.schemas.baseSchema import BaseSchema


class TeamBase(BaseModel):
    color: str
    score: int
    is_winner: bool


class TeamCreate(TeamBase):
    pass


class Team(TeamBase, BaseSchema):
    class Config:
        from_attribute = True
