from datetime import datetime, timezone

from sqlalchemy import Column, UUID, DateTime
from sqlalchemy.ext.declarative import as_declarative, declared_attr


@as_declarative()
class BaseModel:
    uuid = Column(UUID(as_uuid=True), primary_key=True)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), nullable=True)

    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()
