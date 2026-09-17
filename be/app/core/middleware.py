"""Core Security Middleware - MeridianPulse Backend
Implements OWASP Security Headers, IP-based Rate Limiting and Audit logging.
"""

import time
from collections import defaultdict
from typing import Dict, List
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from app.core.config import settings
from app.core.exceptions import create_error_response


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Appends hardened HTTP headers recommended by OWASP to mitigate XSS, Clickjacking, MIME sniffing."""
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        
        # Hardened Security Headers
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
        
        if settings.ENVIRONMENT == "production":
            response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains; preload"
            response.headers["Content-Security-Policy"] = (
                "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
            )
            
        return response


class RateLimiterMiddleware(BaseHTTPMiddleware):
    """In-memory sliding window rate limiter to protect against DDoS & Brute-force credential stuffing."""
    def __init__(self, app):
        super().__init__(app)
        # Dictionary mapping IP to list of timestamps: Dict[ip, List[float]]
        self.requests_log: Dict[str, List[float]] = defaultdict(list)

    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host if request.client else "unknown"
        path = request.url.path
        now = time.time()
        window_seconds = 60

        # Choose limit: stricter for login/register
        limit = (
            settings.AUTH_RATE_LIMIT_PER_MINUTE
            if "/auth/login" in path or "/auth/register" in path
            else settings.RATE_LIMIT_PER_MINUTE
        )

        # Clean timestamps older than window
        timestamps = self.requests_log[client_ip]
        self.requests_log[client_ip] = [ts for ts in timestamps if now - ts < window_seconds]

        # Check rate threshold
        if len(self.requests_log[client_ip]) >= limit:
            retry_after = int(window_seconds - (now - self.requests_log[client_ip][0]))
            response = create_error_response(
                status_code=429,
                code="RATE_LIMIT_EXCEEDED",
                message=f"Quá nhiều yêu cầu từ địa chỉ IP của bạn. Vui lòng thử lại sau {max(1, retry_after)} giây.",
                details={"limit_per_minute": limit, "retry_after_seconds": max(1, retry_after)}
            )
            response.headers["Retry-After"] = str(max(1, retry_after))
            return response

        # Record this request
        self.requests_log[client_ip].append(now)
        return await call_next(request)
