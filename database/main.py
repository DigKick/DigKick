from fastapi import FastAPI, Depends

from src.db import models
from src.db.database import SessionLocal, engine

for model in models.models:
    print("----->" + model.__name__)

for model in models.models:
    print("----->" + model.__name__)
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


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
