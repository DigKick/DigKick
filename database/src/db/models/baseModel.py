from sqlalchemy import Column, UUID, DateTime, func
from sqlalchemy.ext.declarative import as_declarative, declared_attr
from sqlalchemy.dialects.postgresql import UUID
import uuid


@as_declarative()
class BaseModel:
    __abstract__ = True

    uuid = Column(UUID, primary_key=True, default=uuid.uuid4)

    created_at = Column("createdAt", DateTime, default=func.current_timestamp())
    updated_at = Column("updatedAt", DateTime,
                        default=func.current_timestamp(),
                        onupdate=func.current_timestamp())

    @declared_attr
    def __tablename__(self):
        return self.__name__.lower()
