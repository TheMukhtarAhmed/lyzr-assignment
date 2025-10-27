import redis
import json
from typing import Any, Optional, List, Dict
import os


class RedisClient:
    def __init__(self):
        self.redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
        self.client = redis.Redis.from_url(
            self.redis_url,
            decode_responses=True,
            socket_connect_timeout=5,
            socket_keepalive=True,
        )

    def set_key(self, key: str, value: Any, ex: Optional[int] = None) -> bool:
        try:
            if isinstance(value, (dict, list)):
                value = json.dumps(value)
            return self.client.set(key, value, ex=ex)
        except redis.RedisError as e:
            print(f"Redis set error: {e}")
            return False

    def get_key(self, key: str) -> Any:
        try:
            value = self.client.get(key)
            if value is None:
                return None

            try:
                return json.loads(value)
            except json.JSONDecodeError:
                return value
        except redis.RedisError as e:
            print(f"Redis get error: {e}")
            return None

    def delete_key(self, key: str) -> bool:
        try:
            return bool(self.client.delete(key))
        except redis.RedisError as e:
            print(f"Redis delete error: {e}")
            return False

    def key_exists(self, key: str) -> bool:
        try:
            return self.client.exists(key) == 1
        except redis.RedisError as e:
            print(f"Redis exists error: {e}")
            return False


redis_client = RedisClient()
