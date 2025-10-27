from datetime import datetime

from pydantic import BaseModel, Field
from typing import List, Optional



class ChoiceBase(BaseModel):
	choice_text: str
	votes: int = 0

class ChoiceCreate(ChoiceBase):
	pass

class ChoiceList(ChoiceBase):
	id: int

	class Config:
		orm_mode = True



class QuestionBase(BaseModel):
	question_text: str
	description: Optional[str] = None
	pub_date: datetime
	start_time: Optional[datetime] = None
	end_time: Optional[datetime] = None
	allow_multiple: bool = False
	visibility: str = "public"

class QuestionCreate(QuestionBase):
	choices: Optional[List[ChoiceCreate]] = None

class QuestionList(BaseModel):
    id: int
    question_text: str
    description: Optional[str]
    status: str
    start_time: datetime
    end_time: Optional[datetime]
    allow_multiple: bool
    visibility: str
    likes_count: int
    total_votes: int
    status: str

    class Config:
        orm_mode = True

class QuestionInfo(QuestionList):
    is_owner: bool = False
    user_votes: List[int] = []
    has_liked: bool = False
    choices: List[ChoiceList] = []


class PollLikeBase(BaseModel):
    likes: int = 0


class PollLikeList(PollLikeBase):
    id: int
    question_id: int

    class Config:
        orm_mode = True

