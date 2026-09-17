# Danh Mục Các Miền Nghiệp Vụ (Business Domains & Epics) - MeridianPulse

Thư mục này chứa toàn bộ tài liệu đặc tả nghiệp vụ chi tiết của hệ thống **MeridianPulse** (Nền tảng Giám sát & Quản lý Chỉ số Sinh tồn Thời gian Thực). Mỗi miền nghiệp vụ được tổ chức thành một thư mục Epic độc lập với các User Stories chi tiết.

---

## 🏛️ Kiến Trúc Tổng Thể Các Miền Nghiệp Vụ

```text
                                  +-------------------------------------------------------+
                                  |              Hệ Thống MeridianPulse                   |
                                  +-------------------------------------------------------+
                                                              |
                 +-----------------------+--------------------+--------------------+-----------------------+
                 |                       |                                         |                       |
                 v                       v                                         v                       v
      +---------------------+ +---------------------+                   +---------------------+ +---------------------+
      |       EPIC-01       | |       EPIC-02       |                   |       EPIC-03       | |       EPIC-04       |
      |    Core Platform    | |   Identity & Access |                   |   Vital Telemetry   | |  Anomaly Alerting   |
      |   & Dashboard HUD   | |     Control (IAM)   |                   |   Realtime Stream   | |  & Emergency Dispatch|
      +---------------------+ +---------------------+                   +---------------------+ +---------------------+
                 |                       |                                         |                       |
                 +-----------------------+--------------------+--------------------+-----------------------+
                                                              |
                                                              v
                                                   +---------------------+
                                                   |       EPIC-05       |
                                                   |  Clinical Records   |
                                                   |  & Historical ECG   |
                                                   +---------------------+
```

---

## 📂 Danh Sách Các Thư Mục Nghiệp Vụ (Epic Folders)

| Thư Mục Nghiệp Vụ | Tên Miền Nghiệp Vụ | Trọng Tâm Nghiệp Vụ | User Story Đại Diện |
| :--- | :--- | :--- | :--- |
| [epic-01-core-platform/](epic-01-core-platform/) | **Giao Diện & Bảng Điều Khiển** | Bố cục HUD y tế, chỉ số tổng quan nhanh, responsive đa thiết bị, giao diện phòng bệnh. | [MP-01-homepage-dashboard.md](epic-01-core-platform/MP-01-homepage-dashboard.md) |
| [epic-02-identity-access/](epic-02-identity-access/) | **Định Danh & Phân Quyền** | Quản lý đăng nhập bảo mật JWT, phân quyền Bác sĩ, Y tá, Bệnh nhân, tuân thủ HIPAA. | [MP-02-auth-rbac.md](epic-02-identity-access/MP-02-auth-rbac.md) |
| [epic-03-vital-telemetry/](epic-03-vital-telemetry/) | **Kênh Tín Hiệu Sinh Tồn** | Luồng thu phát dữ liệu thời gian thực WebSocket, độ trễ < 200ms, sóng ECG 60 FPS. | [MP-03-telemetry-engine.md](epic-03-vital-telemetry/MP-03-telemetry-engine.md) |
| [epic-04-anomaly-alerting/](epic-04-anomaly-alerting/) | **Phát Hiện Bất Thường** | Động cơ quét ngưỡng nguy kịch (nhịp nhanh, nhịp chậm, tụt SpO2), cảnh báo âm thanh & thị giác. | [MP-04-critical-anomaly-alerts.md](epic-04-anomaly-alerting/MP-04-critical-anomaly-alerts.md) |
| [epic-05-clinical-records/](epic-05-clinical-records/) | **Bệnh Án & Thống Kê** | Báo cáo diễn biến nhịp sinh học theo ca trực, trích xuất dữ liệu PDF cho hồ sơ bệnh án. | [MP-05-historical-analytics.md](epic-05-clinical-records/MP-05-historical-analytics.md) |
