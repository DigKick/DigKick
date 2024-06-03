from sqlalchemy import Column, Integer, String, Boolean

from src.db.database import Base
from src.db.models.baseModel import BaseModel


class Team(BaseModel, Base):
    color = Column("color", String(10))
    score = Column("score", Integer)
    is_winner = Column("isWinner", Boolean)
