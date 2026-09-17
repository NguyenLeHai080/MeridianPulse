"""Core Exceptions & Error Handling - MeridianPulse Backend
Standardized error structures across all API endpoints.
"""

from typing import Any, Dict, Optional
from fastapi import Request, status
from fastapi.responses import JSONResponse


class AppException(Exception):
    """Base application exception."""
    def __init__(
        self,
        message: str,
        status_code: int = status.HTTP_400_BAD_REQUEST,
        code: str = "BAD_REQUEST",
        details: Optional[Any] = None,
    ):
        self.message = message
        self.status_code = status_code
        self.code = code
        self.details = details
        super().__init__(message)


class UnauthorizedException(AppException):
    def __init__(self, message: str = "Thông tin xác thực không hợp lệ hoặc đã hết hạn", details: Optional[Any] = None):
        super().__init__(
            message=message,
            status_code=status.HTTP_401_UNAUTHORIZED,
            code="UNAUTHORIZED",
            details=details
        )


class ForbiddenException(AppException):
    def __init__(self, message: str = "Bạn không có quyền hạn truy cập tài nguyên này", details: Optional[Any] = None):
        super().__init__(
            message=message,
            status_code=status.HTTP_403_FORBIDDEN,
            code="FORBIDDEN",
            details=details
        )


class NotFoundException(AppException):
    def __init__(self, message: str = "Tài nguyên không tìm thấy", details: Optional[Any] = None):
        super().__init__(
            message=message,
            status_code=status.HTTP_404_NOT_FOUND,
            code="NOT_FOUND",
            details=details
        )


class RateLimitExceededException(AppException):
    def __init__(self, message: str = "Quá nhiều yêu cầu, vui lòng thử lại sau giây lát", details: Optional[Any] = None):
        super().__init__(
            message=message,
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            code="RATE_LIMIT_EXCEEDED",
            details=details
        )


def create_error_response(
    status_code: int,
    code: str,
    message: str,
    details: Optional[Any] = None
) -> JSONResponse:
    return JSONResponse(
        status_code=status_code,
        content={
            "success": False,
            "error": {
                "code": code,
                "message": message,
                "details": details,
            }
        }
    )


async def app_exception_handler(request: Request, exc: AppException) -> JSONResponse:
    return create_error_response(
        status_code=exc.status_code,
        code=exc.code,
        message=exc.message,
        details=exc.details
    )


async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    return create_error_response(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        code="INTERNAL_SERVER_ERROR",
        message="Lỗi hệ thống máy chủ nội bộ. Vui lòng liên hệ quản trị viên.",
        details=str(exc) if request.app.debug else None
    )
