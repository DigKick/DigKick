from uuid import UUID

from sqlalchemy.orm import Session

from src.db import schemas
from src.db.models import Table, models


def save_table(db: Session, table: schemas.TableCreateSchema):
    new_team = Table(name=table.name)
    db.add(new_team)
    db.commit()
    db.refresh(new_team)
    return new_team


def get_table_by_uuid(db: Session, table_uuid: UUID):
    return db.query(Table).filter(Table.uuid == table_uuid).first()


def get_table_by_name(db: Session, name: str):
    return db.query(Table).filter(Table.name == name).first()
