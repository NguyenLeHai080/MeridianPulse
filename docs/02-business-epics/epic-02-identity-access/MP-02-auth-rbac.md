# User Story #MP-02: Xác Thực Bảo Mật & Phân Quyền Vai Trò (Authentication & RBAC)

- **Epic:** `EPIC-02 - Identity & Role-Based Access`
- **Mã Issue:** `#MP-02`
- **Độ ưu tiên:** `P0 - High`
- **Điểm ước lượng (Story Points):** `8`
- **Sprint thực hiện:** `Sprint 02`
- **Nhánh Git tương ứng:** `feat/MP-02-auth-rbac`
- **Tệp mã nguồn liên quan:** `be/auth/`, `be/middleware/rbac.js`

---

## 1. Mô Tả Người Dùng (User Story)

> **Là một** Quản trị viên hệ thống hoặc Bác sĩ điều trị,  
> **Tôi muốn** đăng nhập an toàn bằng tài khoản kèm cơ chế JWT token và phân quyền chặt chẽ theo vai trò,  
> **Để** đảm bảo chỉ những người có thẩm quyền y khoa mới được truy cập dữ liệu theo dõi bệnh nhân.

---

## 2. Tiêu Chuẩn Chấp Nhận (Acceptance Criteria - Given/When/Then)

### Scenario 1: Đăng nhập thành công với tài khoản Bác Sĩ
- **Given** thông tin đăng nhập bác sĩ hợp lệ (email, password),
- **When** gửi request `POST /api/v1/auth/login`,
- **Then** hệ thống trả về HTTP 200 kèm payload:
  - `accessToken` (hết hạn sau 15 phút).
  - `refreshToken` (lưu trữ an toàn trong HttpOnly Cookie, hạn 7 ngày).
  - Đối tượng user với role `DOCTOR`.

### Scenario 2: Chặn truy cập trái phép bằng Middleware RBAC
- **Given** người dùng đăng nhập với role `PATIENT`,
- **When** gửi request `PUT /api/v1/wards/101/thresholds` để đổi ngưỡng cảnh báo,
- **Then** hệ thống chặn lại với mã HTTP 403 Forbidden và thông báo "Yêu cầu quyền hạn Bác Sĩ".

### Scenario 3: Cấp mới Access Token (Token Refreshing)
- **Given** Access Token đã hết hạn,
- **When** client gửi request `POST /api/v1/auth/refresh`,
- **Then** hệ thống kiểm tra refresh token hợp lệ và cấp mới Access Token mà không bắt người dùng đăng nhập lại.
