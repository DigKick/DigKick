from uuid import UUID

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from src.db import models, schemas, crud
from src.db.database import SessionLocal, engine

for model in models.models:
    if model.__name__ == "BaseModel":
        continue
    model.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root(db: SessionLocal = Depends(get_db)):
    return {"message": "Hello World"}


@app.post("/tables/", response_model=schemas.TableSchema)
async def post_table(table: schemas.TableCreateSchema, db: Session = Depends(get_db)):
    return crud.save_table(db=db, table=table)


@app.get("/tables/{table_uuid}")
async def get_table_by_uuid(table_uuid: UUID, db: Session = Depends(get_db)):
    return crud.get_table_by_uuid(table_uuid=table_uuid, db=db)


@app.post("/games/")
async def post_game(game: schemas.GameCreateSchema, db: Session = Depends(get_db)):
    return crud.save_game(db=db, game=game)
