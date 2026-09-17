# MeridianPulse Python Backend (`be/`)

Hệ thống Backend được thiết kế theo kiến trúc **Clean Modular Monolith** bằng **Python FastAPI**, phân tách tuyệt đối giữa tầng Cốt lõi (`core/`) và các Module nghiệp vụ (`modules/`).

---

## 🏛️ Cấu Trúc Thư Mục Backend

```text
be/
├── app/
│   ├── core/                    # [TẦNG CỐT LÕI TOÀN CỤC]
│   │   ├── config.py            # Cấu hình Pydantic v2 (BaseSettings, .env)
│   │   ├── security.py          # Băm mật khẩu PBKDF2, sinh & xác thực JWT Access/Refresh Token
│   │   ├── dependencies.py      # Dependency Injection (get_current_user, require_roles RBAC)
│   │   ├── exceptions.py        # Custom Exceptions & Global Exception Handler (chuẩn JSON)
│   │   └── middleware.py        # OWASP Security Headers & Rate Limiting chống Brute-force
│   │
│   ├── modules/                 # [CÁC MODULE NGHIỆP VỤ TỰ ĐÓNG GÓI]
│   │   ├── auth/                # Module Xác thực: router, schemas, service, models
│   │   ├── patients/            # Module Bệnh nhân & Giường bệnh ICU
│   │   ├── telemetry/           # Module Kênh truyền WebSocket nhịp tim & Sóng ECG realtime
│   │   └── alerts/              # Module Phát hiện Bất thường & Cảnh báo Tachycardia/Bradycardia
│   │
│   ├── main.py                  # Khởi chạy FastAPI App, đăng ký middleware & routers
│   └── __init__.py
│
├── requirements.txt             # Danh sách thư viện (FastAPI, Uvicorn, Pydantic, PyJWT)
├── Dockerfile                   # Dockerfile triển khai sản xuất
├── .env.example                 # Mẫu biến môi trường
└── README.md
```

---

## 🛡️ Các Cơ Chế Bảo Mật Chống Xâm Nhập (Hardened Security)

1. **JWT Authentication & Token Expiry:**
   - Access Token có hạn ngắn (30 phút) chứa role claims.
   - Refresh Token (7 ngày) độc lập, hỗ trợ cấp mới mà không cần đăng nhập lại.
2. **PBKDF2-HMAC-SHA256 (600,000 Iterations):**
   - Mật khẩu được băm với salt ngẫu nhiên 16 bytes, so sánh hằng thời gian (`hmac.compare_digest`) chống tấn công Timing Attack.
3. **Phân Quyền Vai Trò (RBAC):**
   - Phân cấp vai trò nghiêm ngặt: `ADMIN`, `DOCTOR`, `NURSE`, `PATIENT` thông qua dependency `require_roles`.
4. **Rate Limiting Middleware:**
   - Bảo vệ các endpoint nhạy cảm (`/auth/login`, `/auth/register`) tối đa 10 req/phút/IP để ngăn chặn Brute-force mật khẩu.
5. **OWASP Security Headers:**
   - `X-Frame-Options: DENY` (Chống Clickjacking).
   - `X-Content-Type-Options: nosniff` (Chống MIME sniffing).
   - `Content-Security-Policy` & `Strict-Transport-Security` (Ép HTTPS).

---

## 🚀 Hướng Dẫn Chạy Cục Bộ

### Chạy bằng Python thông thường:
```bash
cd be
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
- Swagger UI Documentation: `http://localhost:8000/docs`
- ReDoc Documentation: `http://localhost:8000/redoc`

### Chạy bằng Docker:
```bash
docker build -t meridian-pulse-be .
docker run -p 8000:8000 meridian-pulse-be
```
