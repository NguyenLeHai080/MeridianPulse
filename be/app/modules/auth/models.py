"""Authentication Models - MeridianPulse Backend"""

from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class Role(str, Enum):
    ADMIN = "ADMIN"
    DOCTOR = "DOCTOR"
    NURSE = "NURSE"
    PATIENT = "PATIENT"


class User(BaseModel):
    id: str
    email: str
    full_name: str
    role: Role = Role.DOCTOR
    is_active: bool = True
    department: Optional[str] = "Khoa Cấp Cứu & Hồi Sức (ICU)"


class UserInDB(User):
    hashed_password: str
