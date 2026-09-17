"""Authentication Router - MeridianPulse Backend
Exposes /api/v1/auth endpoints.
"""

from fastapi import APIRouter, Depends, status
from app.core.dependencies import get_current_user
from app.modules.auth.models import User
from app.modules.auth.schemas import (
    LoginRequest,
    RegisterRequest,
    RefreshTokenRequest,
    TokenResponse,
    UserResponse
)
from app.modules.auth.service import auth_service

router = APIRouter(prefix="/auth", tags=["Authentication & Security"])


@router.post("/login", response_model=TokenResponse, status_code=status.HTTP_200_OK)
async def login(credentials: LoginRequest):
    """Đăng nhập bảo mật vào hệ thống MeridianPulse, trả về JWT Access Token & Refresh Token."""
    return auth_service.authenticate(credentials)


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: RegisterRequest):
    """Đăng ký tài khoản y bác sĩ mới."""
    user = auth_service.create_user(
        email=user_data.email,
        password=user_data.password,
        full_name=user_data.full_name,
        role=user_data.role,
        department=user_data.department
    )
    user_public = User(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        role=user.role,
        is_active=user.is_active,
        department=user.department
    )
    return UserResponse(success=True, data=user_public)


@router.post("/refresh", response_model=TokenResponse, status_code=status.HTTP_200_OK)
async def refresh_token(payload: RefreshTokenRequest):
    """Cấp mới Access Token bằng Refresh Token mà không cần người dùng đăng nhập lại."""
    return auth_service.refresh_access_token(payload.refresh_token)


@router.get("/me", response_model=UserResponse, status_code=status.HTTP_200_OK)
async def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Lấy thông tin tài khoản hiện tại (yêu cầu Authorization: Bearer <token>)."""
    return UserResponse(success=True, data=current_user)


@router.post("/logout", status_code=status.HTTP_200_OK)
async def logout(current_user: User = Depends(get_current_user)):
    """Đăng xuất an toàn khỏi phiên làm việc."""
    return {"success": True, "message": "Đã đăng xuất thành công"}
