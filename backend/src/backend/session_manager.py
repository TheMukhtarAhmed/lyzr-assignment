from .redis_client import redis_client


class SessionManager:
    @staticmethod
    def get_user_votes(question_id: int, session_id: str) -> list:
        key = f"votes:{question_id}:{session_id}"
        votes = redis_client.get_key(key)
        return votes if votes else []

    @staticmethod
    def set_user_votes(question_id: int, session_id: str, choice_ids: list):
        key = f"votes:{question_id}:{session_id}"
        redis_client.set_key(key, choice_ids, ex=30 * 24 * 60 * 60)

    @staticmethod
    def add_user_vote(question_id: int, session_id: str, choice_id: int):
        current_votes = SessionManager.get_user_votes(question_id, session_id)
        if choice_id not in current_votes:
            current_votes.append(choice_id)
            SessionManager.set_user_votes(question_id, session_id, current_votes)

    @staticmethod
    def remove_user_vote(question_id: int, session_id: str, choice_id: int):
        current_votes = SessionManager.get_user_votes(question_id, session_id)
        if choice_id in current_votes:
            current_votes.remove(choice_id)
            SessionManager.set_user_votes(question_id, session_id, current_votes)

    @staticmethod
    def clear_user_votes(question_id: int, session_id: str):
        key = f"votes:{question_id}:{session_id}"
        redis_client.delete_key(key)

    @staticmethod
    def has_user_voted_for_choice(
        question_id: int, session_id: str, choice_id: int
    ) -> bool:
        votes = SessionManager.get_user_votes(question_id, session_id)
        return choice_id in votes

    @staticmethod
    def get_user_votes_count(question_id: int, session_id: str) -> int:
        votes = SessionManager.get_user_votes(question_id, session_id)
        return len(votes)

    @staticmethod
    def has_user_liked(question_id: int, session_id: str) -> bool:
        key = f"liked:{question_id}:{session_id}"
        return redis_client.key_exists(key)

    @staticmethod
    def set_user_like(question_id: int, session_id: str):
        key = f"liked:{question_id}:{session_id}"
        redis_client.set_key(key, "yes", ex=30 * 24 * 60 * 60)

    @staticmethod
    def remove_user_like(question_id: int, session_id: str):
        key = f"liked:{question_id}:{session_id}"
        redis_client.delete_key(key)


session_manager = SessionManager()
