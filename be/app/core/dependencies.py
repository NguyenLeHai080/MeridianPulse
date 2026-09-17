"""Core Dependencies Module - MeridianPulse Backend
Provides dependency injection for authentication, role verification and request lifecycle.
"""

from typing import List, Optional
from fastapi import Depends, Header
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt
from app.core.security import decode_token
from app.core.exceptions import UnauthorizedException, ForbiddenException
from app.modules.auth.models import Role, User

# Bearer scheme without auto_error so we can return localized clear error payloads
security_scheme = HTTPBearer(auto_error=False)


async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_scheme),
    authorization: Optional[str] = Header(None)
) -> User:
    """Extract and validate JWT Bearer token, returning the authenticated user entity."""
    token = None
    if credentials:
        token = credentials.credentials
    elif authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]

    if not token:
        raise UnauthorizedException("Yêu cầu mã xác thực Authorization Bearer token")

    try:
        payload = decode_token(token)
        if payload.get("type") != "access":
            raise UnauthorizedException("Loại token không hợp lệ (yêu cầu Access Token)")
        
        user_id = payload.get("sub")
        email = payload.get("email")
        role_str = payload.get("role", Role.PATIENT.value)
        full_name = payload.get("full_name", "")
        
        if not user_id:
            raise UnauthorizedException("Mã định danh người dùng trong token không hợp lệ")

        return User(
            id=user_id,
            email=email,
            full_name=full_name,
            role=Role(role_str),
            is_active=True
        )
    except jwt.ExpiredSignatureError:
        raise UnauthorizedException("Phiên đăng nhập đã hết hạn. Vui lòng làm mới token hoặc đăng nhập lại")
    except (jwt.PyJWTError, ValueError) as e:
        raise UnauthorizedException(f"Chữ ký token không hợp lệ: {str(e)}")


def require_roles(allowed_roles: List[Role]):
    """Role-Based Access Control (RBAC) Dependency Factory.
    Ensures the authenticated user possesses one of the authorized roles.
    """
    async def role_checker(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in allowed_roles:
            role_names = ", ".join([r.value for r in allowed_roles])
            raise ForbiddenException(
                f"Tài khoản của bạn ({current_user.role.value}) không có quyền thực hiện hành động này. Yêu cầu: {role_names}"
            )
        return current_user

    return role_checker
