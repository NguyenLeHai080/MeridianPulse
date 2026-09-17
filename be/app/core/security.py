"""Core Security Module - MeridianPulse Backend
Provides hardened password hashing, JWT issuance and cryptographic verification.
"""

import hashlib
import hmac
import os
import secrets
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Optional, Union
import jwt
from app.core.config import settings


def generate_salt(length: int = 16) -> str:
    """Generate a cryptographically secure random salt."""
    return secrets.token_hex(length)


def hash_password(password: str, salt: Optional[str] = None) -> str:
    """Hash a password using PBKDF2 with HMAC-SHA256 (600,000 iterations - OWASP recommended).
    Format stored: salt$derived_key_hex
    """
    if not salt:
        salt = generate_salt(16)
    
    # Compute PBKDF2 hash
    key = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        600000
    )
    return f"{salt}${key.hex()}"


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a stored hashed password using constant-time comparison."""
    try:
        salt, stored_hash = hashed_password.split("$", 1)
        computed_hash = hash_password(plain_password, salt=salt).split("$", 1)[1]
        return hmac.compare_digest(stored_hash, computed_hash)
    except Exception:
        return False


def create_access_token(subject: Union[str, Any], claims: Optional[Dict[str, Any]] = None) -> str:
    """Create a signed JWT access token with limited lifespan."""
    now = datetime.now(timezone.utc)
    expire = now + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    payload: Dict[str, Any] = {
        "sub": str(subject),
        "iat": now,
        "exp": expire,
        "type": "access",
    }
    if claims:
        payload.update(claims)
        
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def create_refresh_token(subject: Union[str, Any]) -> str:
    """Create a signed JWT refresh token with extended lifespan."""
    now = datetime.now(timezone.utc)
    expire = now + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    
    payload: Dict[str, Any] = {
        "sub": str(subject),
        "iat": now,
        "exp": expire,
        "type": "refresh",
        "jti": secrets.token_hex(16),  # Unique token ID to support revocation
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def decode_token(token: str) -> Dict[str, Any]:
    """Decode and cryptographically verify a JWT token.
    Raises jwt.PyJWTError on invalid signature, expiration or malformed structure.
    """
    return jwt.decode(
        token,
        settings.SECRET_KEY,
        algorithms=[settings.ALGORITHM],
        options={"require": ["exp", "sub", "type"]}
    )
