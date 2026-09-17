"""Authentication Service - MeridianPulse Backend
Business logic for user credentials, JWT lifecycle and account security.
"""

from typing import Dict, Optional
import uuid
from app.core.config import settings
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token, decode_token
from app.core.exceptions import AppException, UnauthorizedException, ForbiddenException
from app.modules.auth.models import Role, User, UserInDB
from app.modules.auth.schemas import LoginRequest, RegisterRequest, TokenResponse


class AuthService:
    def __init__(self):
        # In-memory user database initialized with pre-configured verified accounts
        self._users: Dict[str, UserInDB] = {}
        self._init_default_accounts()

    def _init_default_accounts(self):
        """Seed initial accounts for PlenxAI roles with secure PBKDF2 hashes."""
        # 1. Primary Admin (Google Account from Prompt)
        self.create_user(
            email="haiyuanhai9@gmail.com",
            password="Ntt@080220",
            full_name="Nguyễn Lê Hải (Plenx Super Admin)",
            role=Role.ADMIN,
            credit_balance=999999,
            plan="Enterprise Sovereign"
        )
        # 2. System Admin
        self.create_user(
            email="admin@plenxai.com",
            password="Admin@123456",
            full_name="PlenxAI System Master",
            role=Role.ADMIN,
            credit_balance=500000,
            plan="Enterprise VIP"
        )
        # 3. Pro Creator
        self.create_user(
            email="creator@plenxai.com",
            password="Creator@123456",
            full_name="Alex Rivers (AI Filmmaker)",
            role=Role.VIP_CREATOR,
            credit_balance=2500,
            plan="Pro Creator Studio"
        )
        # 4. Standard User
        self.create_user(
            email="user@plenxai.com",
            password="User@123456",
            full_name="Trần Minh Vũ",
            role=Role.USER,
            credit_balance=150,
            plan="Starter Free"
        )

    def create_user(
        self,
        email: str,
        password: str,
        full_name: str,
        role: Role = Role.CREATOR,
        credit_balance: int = 150,
        plan: str = "Pro Creator",
        avatar_url: Optional[str] = None
    ) -> UserInDB:
        email_normalized = email.lower().strip()
        if email_normalized in self._users:
            raise AppException(f"Email {email} đã được sử dụng trong hệ thống", code="EMAIL_ALREADY_EXISTS")

        user_id = str(uuid.uuid4())
        hashed = hash_password(password)
        
        user_db = UserInDB(
            id=user_id,
            email=email_normalized,
            full_name=full_name,
            role=role,
            is_active=True,
            credit_balance=credit_balance,
            plan=plan,
            avatar_url=avatar_url or "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            hashed_password=hashed
        )
        self._users[email_normalized] = user_db
        return user_db

    def deduct_credits(self, email: str, amount: int) -> int:
        email_normalized = email.lower().strip()
        user = self._users.get(email_normalized)
        if not user:
            raise AppException("Người dùng không tồn tại", code="USER_NOT_FOUND")
        if user.credit_balance < amount:
            raise AppException("Số dư credits không đủ để thực hiện tạo tác vụ này", code="INSUFFICIENT_CREDITS")
        user.credit_balance -= amount
        return user.credit_balance

    def add_credits(self, email: str, amount: int) -> int:
        email_normalized = email.lower().strip()
        user = self._users.get(email_normalized)
        if not user:
            raise AppException("Người dùng không tồn tại", code="USER_NOT_FOUND")
        user.credit_balance += amount
        return user.credit_balance

    def authenticate(self, login_data: LoginRequest) -> TokenResponse:
        email = login_data.email.lower().strip()
        user = self._users.get(email)

        if not user or not user.is_active:
            # Ambiguous message to prevent username enumeration attacks
            raise UnauthorizedException("Email hoặc mật khẩu không chính xác")

        if not verify_password(login_data.password, user.hashed_password):
            raise UnauthorizedException("Email hoặc mật khẩu không chính xác")

        # Issue JWT Access & Refresh Tokens
        claims = {
            "email": user.email,
            "role": user.role.value,
            "full_name": user.full_name,
            "department": user.department
        }
        access_token = create_access_token(subject=user.id, claims=claims)
        refresh_token = create_refresh_token(subject=user.id)

        user_public = User(
            id=user.id,
            email=user.email,
            full_name=user.full_name,
            role=user.role,
            is_active=user.is_active,
            department=user.department
        )

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in_seconds=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user=user_public
        )

    def refresh_access_token(self, refresh_token: str) -> TokenResponse:
        try:
            payload = decode_token(refresh_token)
            if payload.get("type") != "refresh":
                raise UnauthorizedException("Loại token không hợp lệ (yêu cầu Refresh Token)")

            user_id = payload.get("sub")
            # Find user
            user = next((u for u in self._users.values() if u.id == user_id), None)
            if not user or not user.is_active:
                raise UnauthorizedException("Người dùng không còn tồn tại hoặc đã bị khóa")

            # Issue new tokens
            claims = {
                "email": user.email,
                "role": user.role.value,
                "full_name": user.full_name,
                "department": user.department
            }
            new_access_token = create_access_token(subject=user.id, claims=claims)
            new_refresh_token = create_refresh_token(subject=user.id)

            user_public = User(
                id=user.id,
                email=user.email,
                full_name=user.full_name,
                role=user.role,
                is_active=user.is_active,
                department=user.department
            )

            return TokenResponse(
                access_token=new_access_token,
                refresh_token=new_refresh_token,
                expires_in_seconds=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
                user=user_public
            )
        except Exception as e:
            raise UnauthorizedException(f"Refresh token không hợp lệ hoặc đã hết hạn: {str(e)}")


# Singleton instance
auth_service = AuthService()
