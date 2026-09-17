"""MeridianPulse Core Application Entrypoint
Orchestrates Core Middlewares, Routers and Hardened Security Layer.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.exceptions import AppException, app_exception_handler, global_exception_handler
from app.core.middleware import SecurityHeadersMiddleware, RateLimiterMiddleware
from app.modules.auth import auth_router
from app.modules.video_generation import video_router
from app.modules.fast_apps import fast_apps_router
from app.modules.tiktok_tools import tiktok_router
from app.modules.credits import credits_router
from app.modules.admin_ops import admin_ops_router
from app.modules.voice_studio import voice_router

# Initialize FastAPI Application with metadata
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="PlenxAI - Generative AI Video, Image, TikTok Prompt Extractor & Automation Platform",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# 1. Register OWASP Security Headers & Rate Limiting Middleware
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(RateLimiterMiddleware)

# 2. Strict CORS Configuration (Prevents Cross-Site Request Forgery & unauthorized browser access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["Content-Range", "X-Total-Count", "Retry-After"]
)

# 3. Global Exception Handlers
app.add_exception_handler(AppException, app_exception_handler)
app.add_exception_handler(Exception, global_exception_handler)

# 4. Register PlenxAI Modular Routers under /api/v1
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(video_router, prefix=settings.API_V1_STR)
app.include_router(fast_apps_router, prefix=settings.API_V1_STR)
app.include_router(tiktok_router, prefix=settings.API_V1_STR)
app.include_router(credits_router, prefix=settings.API_V1_STR)
app.include_router(voice_router, prefix=settings.API_V1_STR)
app.include_router(admin_ops_router, prefix=settings.API_V1_STR)


@app.get("/", tags=["Health & System"])
async def root_status():
    """Endpoint kiểm tra trạng thái hoạt động của hệ thống MeridianPulse API."""
    return {
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "ONLINE",
        "environment": settings.ENVIRONMENT,
        "security": {
            "jwt_algorithm": settings.ALGORITHM,
            "rate_limiting": "ENABLED",
            "owasp_headers": "ENFORCED"
        }
    }


@app.get("/health", tags=["Health & System"])
async def health_check():
    """Healthcheck endpoint cho Kubernetes / Docker load balancers."""
    return {"status": "HEALTHY"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=settings.DEBUG)
