# Sprint 02: Kênh Telemetry Thời Gian Thực & Bảo Mật Danh Tính

- **Thời gian:** Tuần 3 - Tuần 4 (10 ngày làm việc)
- **Trạng thái:** 🔄 **ĐANG THỰC HIỆN (ACTIVE)**
- **Nhánh triển khai chính:** `dev`
- **Điểm Story Points cam kết:** `16 Points`

---

## 🎯 Mục Tiêu Sprint (Sprint Goal)
> *"Xây dựng module xác thực phân quyền người dùng JWT (RBAC) cho Bác sĩ / Điều dưỡng, đồng thời thiết lập kênh truyền dữ liệu sinh học song công WebSocket Telemetry truyền dữ liệu nhịp tim thời gian thực với độ trễ dưới 200ms."*

---

## 📋 Danh Sách Hạng Mục Sprint Backlog

| Mã Issue | Loại | Tên User Story / Nhiệm Vụ | SP | Nhánh Git | Trạng Thái |
| :---: | :---: | :--- | :---: | :--- | :---: |
| **`#MP-03`** | `feat` | Xây dựng động cơ thu phát luồng dữ liệu thời gian thực WebSocket Telemetry. | 8 | `feat/MP-03-telemetry-engine` | 🔄 In Progress |
| **`#MP-04`** | `feat` | Xây dựng module xác thực tài khoản JWT & Middleware phân quyền RBAC. | 8 | `feat/MP-04-auth-rbac` | ⏳ To Do |

---

## 🚀 Kế Hoạch Chuyển Giao Môi Trường
- Merge PR từ nhánh `feat/*` vào `dev` khi pass Unit Tests.
- Cuối Sprint: Merge `dev` vào `staging` để đóng gói bản kiểm thử `Release Candidate RC-v1.1.0`.
