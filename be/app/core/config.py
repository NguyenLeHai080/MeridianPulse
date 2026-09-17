"""Core Configuration Module - MeridianPulse Backend
Loads environment variables with robust defaults and validation.
"""

from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Application Info
    PROJECT_NAME: str = "PlenxAI - Generative AI Creator & Automation Platform"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Security & JWT Credentials
    SECRET_KEY: str = "plenxai-enterprise-production-hardened-jwt-secret-key-xyz-888999"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 14

    # PlenxAI Economy & Credits
    NEW_USER_BONUS_CREDITS: int = 100
    COST_PER_VEO_VIDEO_SEC: int = 2
    COST_PER_KLING_VIDEO_SEC: int = 3
    COST_PER_FAST_APP_RENDER: int = 10

    # Upstream AI & Storage Mock/Live Config
    CLOUDFLARE_R2_BUCKET: str = "plenxai-media-assets"
    REDIS_QUEUE_URL: str = "redis://localhost:6379/0"
    RUNNING_HUB_API_KEY: str = "rh-live-comfyui-bridge-mock-key"

    # Rate Limiting (Requests per minute per IP for sensitive endpoints)
    RATE_LIMIT_PER_MINUTE: int = 60
    AUTH_RATE_LIMIT_PER_MINUTE: int = 10  # Stricter for login/register to prevent brute-force

    # CORS Policy: Specific allowed origins, strict matching
    BACKEND_CORS_ORIGINS: List[Union[str, AnyHttpUrl]] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "https://meridianpulse.health",
    ]

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, list):
            return v
        return []

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()
