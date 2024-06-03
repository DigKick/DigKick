from datetime import datetime


class BaseSchema:
    uuid: str
    created_at: datetime
    updated_at: datetime
