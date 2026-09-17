# EPIC-02: Định Danh & Phân Quyền Truy Cập (Identity & Access Management - IAM)

---

## 1. Tuyên Bố Phạm Vi Nghiệp Vụ (Scope)
EPIC-02 thiết lập cơ chế bảo mật danh tính, quản lý phiên đăng nhập và phân quyền truy cập nghiêm ngặt theo vai trò (Role-Based Access Control - RBAC) nhằm bảo vệ thông tin bệnh án và tuân thủ các quy định bảo mật y tế (HIPAA).

## 2. Ma Trận Phân Quyền (RBAC Matrix)

| Chức Năng / Tài Nguyên | Quản Trị Viên (Admin) | Bác Sĩ Điều Trị (Doctor) | Điều Dưỡng (Nurse) | Bệnh Nhân (Patient) |
| :--- | :---: | :---: | :---: | :---: |
| Xem Dashboard thời gian thực | ✅ Toàn viện | ✅ Khoa phụ trách | ✅ Khoa phụ trách | ❌ |
| Xem chỉ số cá nhân | ❌ | ❌ | ❌ | ✅ Chỉ bản thân |
| Điều chỉnh ngưỡng cảnh báo | ✅ | ✅ | ❌ (Chỉ xem) | ❌ |
| Tắt chuông cảnh báo khẩn cấp | ✅ | ✅ | ✅ | ❌ |
| Quản lý tài khoản & phân quyền | ✅ | ❌ | ❌ | ❌ |

## 3. Danh Sách User Stories Thuộc Epic
- [ ] [MP-02-auth-rbac.md](MP-02-auth-rbac.md): Xác thực người dùng bằng JWT và phân quyền vai trò (Sprint 02 - 8 SP).
