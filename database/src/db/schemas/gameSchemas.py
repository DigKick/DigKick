from pydantic import BaseModel

from src.db.models import Table
from src.db.schemas.baseSchema import BaseSchema
from src.db.schemas.teamSchemas import Team


class GameBase(BaseModel):
    game_mode: str
    points_to_win: int

    team_white: Team
    team_black: Team

    table: Table


class GameCreate(GameBase):
    pass


class Game(GameBase, BaseSchema):
    class Config:
        from_attribute = True
