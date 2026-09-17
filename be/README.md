# MeridianPulse - Backend Service (`be/`)

Thư mục chứa mã nguồn tầng Backend phục vụ hệ thống giám sát sinh tồn **MeridianPulse**.

## Kiến Trúc Dự Kiến (Theo Sprint Backlog Sprint 02 - Issue #MP-02, #MP-03, #MP-04)
- **RESTful APIs**: Quản lý bệnh nhân, hồ sơ bệnh án, cấu hình ngưỡng cảnh báo khoa phòng.
- **WebSocket / SSE Stream**: Động cơ phát trực tiếp tín hiệu nhịp tim (ECG stream, BPM, SpO2) với độ trễ thấp (< 200ms).
- **Security**: JWT Authentication & Role-based Authorization (Bác sĩ, Điều dưỡng, Bệnh nhân).

Chi tiết xem tại tài liệu nghiệp vụ [docs/03-product-backlog-and-sprints.md](../docs/03-product-backlog-and-sprints.md).
