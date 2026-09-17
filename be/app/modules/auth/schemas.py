"""Authentication Pydantic Schemas - MeridianPulse Backend"""

from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from app.modules.auth.models import Role, User


class LoginRequest(BaseModel):
    email: EmailStr = Field(..., example="doctor@meridianpulse.health")
    password: str = Field(..., min_length=6, max_length=128)


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)
    full_name: str = Field(..., min_length=2, max_length=100)
    role: Role = Role.DOCTOR
    department: Optional[str] = "Khoa Cấp Cứu & Hồi Sức (ICU)"


class RefreshTokenRequest(BaseModel):
    refresh_token: str = Field(..., description="JWT Refresh Token")


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in_seconds: int
    user: User


class UserResponse(BaseModel):
    success: bool = True
    data: User
