from uuid import UUID

from pydantic import BaseModel

from src.db.schemas.tableSchemas import TableSchema
from src.db.schemas.baseSchema import BaseSchema
from src.db.schemas.teamSchemas import TeamSchema, TeamCreateSchema


class GameBaseSchema(BaseModel):
    game_mode: str
    points_to_win: int


class GameCreateSchema(GameBaseSchema):
    table_name: str
    team_white: TeamCreateSchema
    team_black: TeamCreateSchema


class GameSchema(GameBaseSchema, BaseSchema):
    table: TableSchema
    team_white: TeamSchema
    team_black: TeamSchema

    class Config:
        from_attribute = True
        arbitrary_types_allowed = True
