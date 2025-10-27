from datetime import datetime
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from .session_manager import session_manager


from .models import PollLike, Question, Choice
from . import schema


def create_question(db: Session, question: schema.QuestionCreate, session_id: str):
    if not question.choices or len(question.choices) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="At least one choice is required for the question.",
        )

    obj = Question(
        question_text=question.question_text,
        description=question.description,
        start_time=question.start_time,
        end_time=question.end_time,
        allow_multiple=question.allow_multiple,
        visibility=question.visibility,
        owner_session_id=session_id,
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)

    if question.choices:
        for choice_data in question.choices:
            choice = Choice(choice_text=choice_data.choice_text, question_id=obj.id)
            db.add(choice)
        db.commit()
        db.refresh(obj)

    return obj


def get_all_questions(db: Session, session_id: str):
    questions = db.query(Question).all()

    for question in questions:
        question.is_owner = question.owner_session_id == session_id
        question.user_votes = session_manager.get_user_votes(question.id, session_id)
        question.has_liked = session_manager.has_user_liked(question.id, session_id)

    return questions


def get_question(db: Session, qid, session_id: str):
    question = db.query(Question).filter(Question.id == qid).first()
    if not question:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Question not found"
        )

    is_owner = question.owner_session_id == session_id
    user_votes = session_manager.get_user_votes(qid, session_id)
    has_liked = session_manager.has_user_liked(qid, session_id)

    question.is_owner = is_owner
    question.user_votes = user_votes
    question.has_liked = has_liked

    return question


def edit_question(
    db: Session,
    qid,
    question: schema.QuestionCreate,
    session_id: str,
):
    obj = get_question(db, qid, session_id)
    obj.question_text = question.question_text
    obj.description = question.description
    obj.start_time = question.start_time
    obj.end_time = question.end_time
    obj.allow_multiple = question.allow_multiple
    obj.visibility = question.visibility

    if question.choices:
        existing_choices = {choice.id: choice for choice in obj.choices}
        updated_choice_ids = set()
        total_votes_reduction = 0

        for choice_data in question.choices:
            if choice_data.id in existing_choices:
                existing_choice = existing_choices[choice_data.id]
                existing_choice.choice_text = choice_data.choice_text
                updated_choice_ids.add(choice_data.id)
            else:
                # Create new choice
                choice = Choice(choice_text=choice_data.choice_text, question_id=obj.id)
                db.add(choice)

        for choice_id, choice_obj in existing_choices.items():
            if choice_id not in updated_choice_ids:
                total_votes_reduction += choice_obj.votes
                db.delete(choice_obj)

    # Update total_votes
    obj.total_votes = max(0, obj.total_votes - total_votes_reduction)

    db.commit()
    db.refresh(obj)
    return obj


def delete_question(
    db: Session,
    qid,
    session_id: str,
):
    obj = get_question(db, qid, session_id)
    db.delete(obj)
    db.commit()


def toggle_vote(choice_id: int, session_id: str, db: Session):
    choice = db.query(Choice).filter(Choice.id == choice_id).first()
    if not choice:
        raise HTTPException(status_code=404, detail="Choice not found")

    poll = choice.question
    now = datetime.now()

    if poll.start_time > now:
        raise HTTPException(status_code=400, detail="Poll has not started yet")
    if poll.end_time and poll.end_time < now:
        raise HTTPException(status_code=400, detail="Poll has ended")

    current_user_votes = session_manager.get_user_votes(poll.id, session_id)
    has_voted_for_this = choice_id in current_user_votes

    if has_voted_for_this:
        # Remove vote from this choice
        choice.votes = max(0, choice.votes - 1)
        poll.total_votes = max(0, poll.total_votes - 1)
        session_manager.remove_user_vote(poll.id, session_id, choice_id)
        action = "removed"
        updated_user_votes = [v for v in current_user_votes if v != choice_id]

    else:
        if not poll.allow_multiple:
            # Single choice - remove all previous votes first
            for voted_choice_id in current_user_votes:
                voted_choice = (
                    db.query(Choice).filter(Choice.id == voted_choice_id).first()
                )
                if voted_choice:
                    voted_choice.votes = max(0, voted_choice.votes - 1)
                    poll.total_votes = max(0, poll.total_votes - 1)

            # Clear all previous votes
            session_manager.clear_user_votes(poll.id, session_id)

        # Add the new vote
        choice.votes += 1
        poll.total_votes += 1
        session_manager.add_user_vote(poll.id, session_id, choice_id)
        action = "added"
        updated_user_votes = session_manager.get_user_votes(poll.id, session_id)

    db.commit()
    db.refresh(choice)

    all_choices = db.query(Choice).filter(Choice.question_id == poll.id).all()
    choices_data = [
        {
            "id": c.id,
            "votes": c.votes,
        }
        for c in all_choices
    ]

    return {
        "choice": choice,
        "action": action,
        "question_id": poll.id,
        "total_votes": poll.total_votes,
        "user_votes": updated_user_votes,
        "all_choices": choices_data,
        "allow_multiple": poll.allow_multiple,
    }


def toggle_like(question_id: int, session_id: str, db: Session):
    question = get_question(db, question_id, session_id)

    # Check if user already liked
    if session_manager.has_user_liked(question_id, session_id):
        # Unlike
        question.likes_count = max(0, question.likes_count - 1)
        session_manager.remove_user_like(question_id, session_id)
        action = "unliked"
    else:
        # Like
        question.likes_count += 1
        session_manager.set_user_like(question_id, session_id)
        action = "liked"

    db.commit()
    db.refresh(question)

    has_liked = session_manager.has_user_liked(question_id, session_id)

    return {
        "question": question,
        "action": action,
        "likes_count": question.likes_count,
        "has_liked": has_liked,
    }
