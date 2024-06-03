from sqlalchemy.orm import Session

from src.db import schemas
from src.db.models import Team


def save_team(db: Session, team_create: schemas.TeamCreateSchema):
    new_team = Team(color=team_create.color, score=team_create.score, is_winner=team_create.is_winner)

    db.add(new_team)
    db.commit()
    db.refresh(new_team)

    return new_team
