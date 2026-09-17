"""Authentication Models - MeridianPulse Backend"""

from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class Role(str, Enum):
    ADMIN = "ADMIN"
    VIP_CREATOR = "VIP_CREATOR"
    CREATOR = "CREATOR"
    USER = "USER"


class User(BaseModel):
    id: str
    email: str
    full_name: str
    role: Role = Role.CREATOR
    is_active: bool = True
    credit_balance: int = 150
    avatar_url: Optional[str] = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    plan: str = "Pro Creator"


class UserInDB(User):
    hashed_password: str
