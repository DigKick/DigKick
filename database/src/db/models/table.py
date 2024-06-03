from sqlalchemy import Column, String

from src.db.database import Base
from src.db.models.baseModel import BaseModel


class Table(BaseModel, Base):
    name = Column("name", String)
