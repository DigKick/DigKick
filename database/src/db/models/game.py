from sqlalchemy import Column, Integer, Text, String, ForeignKey

from src.db.database import Base
from src.db.models.baseModel import BaseModel


class Game(BaseModel, Base):
    game_mode = Column("gameMode", String(20))
    points_to_win = Column("pointsToWin", Integer)

    team_white_id = Column("teamWhiteId", String, ForeignKey('team.uuid'))
    team_black_id = Column("teamBlackId", String, ForeignKey('team.uuid'))
    table_id = Column("tableId", String, ForeignKey('table.uuid'))
