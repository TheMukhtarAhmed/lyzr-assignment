from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship

from .database import Base


class Question(Base):
    __tablename__ = "question"

    id = Column(Integer, primary_key=True)
    question_text = Column(String(200))
    description = Column(Text, nullable=True)
    pub_date = Column(DateTime, default=datetime.now())
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=True)
    allow_multiple = Column(Boolean, default=False)
    visibility = Column(String(20), default="public")  # public, private, unlisted
    likes_count = Column(Integer, default=0)
    total_votes = Column(Integer, default=0)
    owner_session_id = Column(String(64), nullable=True)

    choices = relationship(
        "Choice", back_populates="question", cascade="all, delete-orphan"
    )
    likes = relationship(
        "PollLike", back_populates="question", cascade="all, delete-orphan"
    )

    @property
    def status(self):
        now = datetime.now()
        if self.start_time > now:
            return "upcoming"
        elif self.end_time and self.end_time < now:
            return "ended"
        return "active"


class Choice(Base):
    __tablename__ = "choice"

    id = Column(Integer, primary_key=True)
    question_id = Column(Integer, ForeignKey("question.id", ondelete="CASCADE"))
    choice_text = Column(String(200))
    votes = Column(Integer, default=0)

    question = relationship("Question", back_populates="choices")


class PollLike(Base):
    __tablename__ = "poll_like"

    id = Column(Integer, primary_key=True)
    question_id = Column(Integer, ForeignKey("question.id", ondelete="CASCADE"))
    likes = Column(Integer, default=0)

    question = relationship("Question", back_populates="likes")
