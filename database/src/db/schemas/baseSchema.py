from datetime import datetime
from uuid import UUID


class BaseSchema:
    uuid: UUID
    created_at: datetime
    updated_at: datetime
