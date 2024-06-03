from .gameSchemas import GameBaseSchema, GameCreateSchema, GameSchema
from .tableSchemas import TableBaseSchema, TableCreateSchema, TableSchema
from .teamSchemas import TeamBaseSchema, TeamCreateSchema, TeamSchema

game_schemas = [GameBaseSchema, GameCreateSchema, GameSchema]
table_schemas = [TableBaseSchema, TableCreateSchema, TableSchema]
team_schemas = [TeamBaseSchema, TeamCreateSchema, TeamSchema]