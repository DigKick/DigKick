from .gameSchemas import GameBase, GameCreate, Game
from .tableSchemas import TableBase, TableCreate, Table
from .teamSchemas import TeamBase, TeamCreate, Team

game_schemas = [GameBase, GameCreate, Game]
table_schemas = [TableBase, TableCreate, Table]
team_schemas = [TeamBase, TeamCreate, Team]