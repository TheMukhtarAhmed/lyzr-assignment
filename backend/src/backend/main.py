from . import schema
from .connection_manager import ConnectionManager
from fastapi import (
    FastAPI,
    HTTPException,
    Request,
    Response,
    Depends,
    WebSocket,
    WebSocketDisconnect,
)
from typing import List
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from . import crud
from .database import Base, SessionLocal, engine, get_db
from dotenv import load_dotenv

load_dotenv()

Base.metadata.create_all(bind=engine)


app = FastAPI()
manager = ConnectionManager()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://mukhtarahmed.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


## Question
@app.post("/questions/", response_model=schema.QuestionInfo)
def create_question(
    question: schema.QuestionCreate, request: Request, db: Session = Depends(get_db)
):
    session_id = request.state.session_id
    return crud.create_question(db=db, question=question, session_id=session_id)


@app.get("/questions/", response_model=List[schema.QuestionInfo])
def get_questions(request: Request, db: Session = Depends(get_db)):
    session_id = request.state.session_id
    return crud.get_all_questions(db=db, session_id=session_id)


@app.get("/questions/{qid}", response_model=schema.QuestionInfo)
def get_question(qid: int, request: Request, db: Session = Depends(get_db)):
    session_id = request.state.session_id
    question = crud.get_question(db=db, qid=qid, session_id=session_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    return question


@app.put("/questions/{qid}", response_model=schema.QuestionInfo)
def edit_question(
    qid: int,
    question: schema.QuestionCreate,
    request: Request,
    db: Session = Depends(get_db),
):
    session_id = request.state.session_id
    return crud.edit_question(db=db, qid=qid, question=question, session_id=session_id)


@app.delete("/questions/{qid}")
def delete_question(qid: int, request: Request, db: Session = Depends(get_db)):
    session_id = request.state.session_id
    crud.delete_question(db=db, qid=qid, session_id=session_id)
    return {"detail": "Question deleted", "status_code": 204}


## Choice
@app.put("/choices/{choice_id}/vote")
async def toggle_vote(choice_id: int, request: Request, db: Session = Depends(get_db)):
    session_id = request.state.session_id
    result = crud.toggle_vote(choice_id=choice_id, session_id=session_id, db=db)

    await manager.broadcast(
        {
            "event": "vote_toggle",
            "choice_id": choice_id,
            "question_id": result["question_id"],
            "votes": result["choice"].votes,
            "user_votes": result["user_votes"],
            "total_votes": result["total_votes"],
            "all_choices": result["all_choices"],
            "action": result["action"],
        }
    )

    return result


@app.put("/questions/{question_id}/like")
async def toggle_like(
    question_id: int, request: Request, db: Session = Depends(get_db)
):
    session_id = request.state.session_id
    result = crud.toggle_like(question_id=question_id, session_id=session_id, db=db)

    await manager.broadcast(
        {
            "event": "like_toggle",
            "question_id": question_id,
            "likes_count": result["likes_count"],
            "action": result["action"],
        }
    )

    return result


@app.websocket("/ws/polls")
async def poll_updates(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            print(f"Received from client: {data}")
            await manager.broadcast(data)
    except WebSocketDisconnect:
        print("WebSocket client disconnected")
        manager.disconnect(websocket)
    except Exception as e:
        print(f"WebSocket error: {e}")
        manager.disconnect(websocket)
