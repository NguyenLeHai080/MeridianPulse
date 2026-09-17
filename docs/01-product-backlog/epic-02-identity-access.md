# EPIC-02: Định Danh & Phân Quyền Truy Cập (Identity & Access Management - IAM)

- **Trạng thái Epic:** ⏳ **Đã lên kế hoạch (To Do trong Sprint 02)**
- **Mã Epic:** `EPIC-02`
- **Mã Issue:** `#MP-02`
- **Nhánh Git phụ trách:** `feat/MP-02-auth-rbac`
- **Mã nguồn liên quan:** `be/auth/`, `be/middleware/rbac.js`

---

## 1. Tuyên Bố Phạm Vi Nghiệp Vụ
EPIC-02 thiết lập cơ chế bảo mật danh tính, quản lý phiên đăng nhập và phân quyền truy cập nghiêm ngặt theo vai trò (Role-Based Access Control - RBAC) nhằm bảo vệ thông tin bệnh án và tuân thủ các quy định bảo mật y tế (HIPAA).

---

## 2. Ma Trận Phân Quyền (RBAC Matrix)

| Chức Năng / Tài Nguyên | Quản Trị Viên (Admin) | Bác Sĩ Điều Trị (Doctor) | Điều Dưỡng (Nurse) | Bệnh Nhân (Patient) |
| :--- | :---: | :---: | :---: | :---: |
| Xem Dashboard thời gian thực | ✅ Toàn viện | ✅ Khoa phụ trách | ✅ Khoa phụ trách | ❌ |
| Xem chỉ số cá nhân | ❌ | ❌ | ❌ | ✅ Chỉ bản thân |
| Điều chỉnh ngưỡng cảnh báo | ✅ | ✅ | ❌ (Chỉ xem) | ❌ |
| Tắt chuông cảnh báo khẩn cấp | ✅ | ✅ | ✅ | ❌ |
| Quản lý tài khoản & phân quyền | ✅ | ❌ | ❌ | ❌ |

---

## 3. Đặc Tả Chi Tiết User Story #MP-02

> **Là một** Quản trị viên hệ thống hoặc Bác sĩ điều trị,  
> **Tôi muốn** đăng nhập an toàn bằng tài khoản kèm cơ chế JWT token và phân quyền chặt chẽ theo vai trò,  
> **Để** đảm bảo chỉ những người có thẩm quyền y khoa mới được truy cập dữ liệu theo dõi bệnh nhân.

### Tiêu Chuẩn Chấp Nhận (Acceptance Criteria):
- **Scenario 1:** Đăng nhập hợp lệ trả về HTTP 200 kèm `accessToken` (15 phút) và `refreshToken` (HttpOnly Cookie, 7 ngày).
- **Scenario 2:** Chặn truy cập trái phép bằng Middleware RBAC: Trả về HTTP 403 Forbidden nếu không đủ thẩm quyền.
- **Scenario 3:** Cơ chế cấp mới token tự động (`POST /api/v1/auth/refresh`) mà không làm gián đoạn phiên làm việc.
