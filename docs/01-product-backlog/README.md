# Master Product Backlog - MeridianPulse

Tài liệu này là **Kho Yêu Cầu Cốt Lõi (Artifact 1 trong Scrum)** của toàn bộ hệ thống MeridianPulse, đóng vai trò là "Single Source of Truth" cho Product Owner, Scrum Master và Development Team.

---

## 🎯 Tầm Nhìn Sản Phẩm (Product Vision)

> **"MeridianPulse là nền tảng số theo dõi, trực quan hóa và cảnh báo chỉ số sinh tồn (Vital Signs Telemetry) theo thời gian thực, hỗ trợ đội ngũ y bác sĩ, nhân viên chăm sóc sức khỏe và bệnh nhân giám sát nhịp tim, huyết áp, nồng độ oxy trong máu (SpO2) với độ chính xác cao và khả năng phản hồi tức thời."**

---

## 📊 Bảng Tổng Hợp Master Product Backlog

| Mã Issue | Thuộc Epic | Tên User Story / Tính Năng | SP | Độ Ưu Tiên | Sprint | Nhánh Git Phụ Trách | Trạng Thái |
| :---: | :--- | :--- | :---: | :---: | :---: | :--- | :---: |
| **`#MP-00`** | `Chore` | Khởi tạo Gitflow, Git hook chặn commit lỗi, bộ tài liệu Scrum | 3 | P0 | Sprint 01 | `feat/MP-00-gitflow-scrum-docs` | ✅ DONE |
| **`#MP-01`** | `EPIC-01` | Giao diện Bảng điều khiển sinh tồn HUD ([fe/index.html](../../fe/index.html)) | 5 | P0 | Sprint 01 | `feat/MP-01-homepage-dashboard` | ✅ DONE |
| **`#MP-02`** | `EPIC-02` | Xác thực đăng nhập bảo mật JWT & Phân quyền vai trò RBAC | 8 | P0 | Sprint 02 | `feat/MP-02-auth-rbac` | ⏳ To Do |
| **`#MP-03`** | `EPIC-03` | Kênh thu phát tín hiệu sinh tồn thời gian thực qua WebSocket | 8 | P0 | Sprint 02 | `feat/MP-03-telemetry-engine` | 🔄 In Progress |
| **`#MP-04`** | `EPIC-04` | Động cơ phát hiện bất thường & Báo động khẩn cấp đa kênh | 5 | P1 | Sprint 03 | `feat/MP-04-anomaly-alerts` | ⏳ To Do |
| **`#MP-05`** | `EPIC-05` | Thống kê xu hướng sinh tồn 24h & Xuất hồ sơ bệnh án PDF | 5 | P2 | Sprint 03 | `feat/MP-05-clinical-reports` | ⏳ To Do |
| **`#MP-99`** | `Hotfix` | Vá khẩn cấp lỗi đồng bộ cảm biến trên Production | 2 | P0 | Hotfix | `hotfix/MP-99-fix-pulse-stream` | ✅ DONE |

---

## 📂 Danh Sách Chi Tiết Từng Epic Nghiệp Vụ

Nhấp vào từng Epic để xem chi tiết nghiệp vụ, sơ đồ luồng dữ liệu và Acceptance Criteria:

1. 🖥️ **[epic-01-core-platform.md](epic-01-core-platform.md)**: Giao diện nền tảng, HUD chỉ số sinh tồn và sóng nhịp tim ECG 60 FPS.
2. 🔐 **[epic-02-identity-access.md](epic-02-identity-access.md)**: Xác thực JWT, quản lý phiên và phân quyền RBAC (Bác sĩ, Y tá, Bệnh nhân).
3. 📡 **[epic-03-vital-telemetry.md](epic-03-vital-telemetry.md)**: Kênh truyền thông tin sinh tồn thời gian thực WebSocket, độ trễ < 200ms.
4. 🚨 **[epic-04-anomaly-alerting.md](epic-04-anomaly-alerting.md)**: Động cơ quét ngưỡng nguy kịch (Tachycardia, Bradycardia) và phát báo động.
5. 📋 **[epic-05-clinical-records.md](epic-05-clinical-records.md)**: Báo cáo xu hướng Holter ECG 24 giờ và trích xuất hồ sơ bệnh án PDF.
