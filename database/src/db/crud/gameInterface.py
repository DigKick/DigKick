from . import tableInterface, teamInterface

from sqlalchemy.orm import Session
from src.db import schemas
from src.db.models import Game
from ..schemas import TableCreateSchema


def save_game(db: Session, game: schemas.GameCreateSchema):
    new_team_black = teamInterface.save_team(db=db, team_create=game.team_black)
    new_team_white = teamInterface.save_team(db=db, team_create=game.team_white)
    optional_table = tableInterface.get_table_by_name(db=db, name=game.table_name)

    if optional_table is None:
        optional_table = tableInterface.save_table(db=db, table=TableCreateSchema(name=game.table_name))
    new_game = Game(game_mode=game.game_mode, points_to_win=game.points_to_win,
                    team_black_uuid=new_team_black.uuid, team_white_uuid=new_team_white.uuid,
                    table_uuid=optional_table.uuid)
    db.add(new_game)
    db.commit()
    db.refresh(new_game)

    return new_game
