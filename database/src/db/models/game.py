from uuid import UUID
from sqlalchemy import Column, UUID, DateTime, func
from sqlalchemy.ext.declarative import as_declarative, declared_attr
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, Integer, Text, String, ForeignKey
from sqlalchemy.orm import relationship

from src.db.database import Base
from src.db.models.baseModel import BaseModel


class Game(BaseModel, Base):
    game_mode = Column("gameMode", String(20))
    points_to_win = Column("pointsToWin", Integer)

    team_white_uuid = Column(UUID, ForeignKey("team.uuid"))
    team_black_uuid = Column(UUID, ForeignKey("team.uuid"))
    table_uuid = Column(UUID, ForeignKey("table.uuid"))

    team_white = relationship("Team", primaryjoin="Game.team_white_uuid == Team.uuid", lazy='joined')
    team_black = relationship("Team", primaryjoin="Game.team_black_uuid == Team.uuid", lazy='joined')
    table = relationship("Table", primaryjoin="Game.table_uuid == Table.uuid", lazy='joined')

