# Trung Tâm Tài Liệu Chuẩn Scrum - MeridianPulse

Chào mừng bạn đến với kho tài liệu chuẩn hóa theo **Khung Scrum (Scrum Framework)** và **Quy trình Gitflow** của dự án **MeridianPulse** (Nền Tảng Giám Sát Sinh Tồn Thời Gian Thực).

---

## 🏛️ Cấu Trúc 4 Cột Trụ Chuẩn Scrum (4-Pillar Scrum Architecture)

Toàn bộ tài liệu trong thư mục [docs/](file:///e:/Projects/MeridianPulse/docs) được tổ chức theo đúng 3 Artifacts chính thống của Scrum và quy trình kỹ thuật Gitflow:

```text
docs/
├── README.md                                 # [TRANG CHỦ DỰ ÁN] - Tổng quan sản phẩm & điều hướng
│
├── 01-product-backlog/                       # [ARTIFACT 1: PRODUCT BACKLOG - KHO YÊU CẦU CỐT LÕI]
│   ├── README.md                             # Bảng Master Product Backlog (Tổng hợp User Stories, SP, Priority, Trạng thái)
│   ├── epic-01-core-platform.md              # EPIC 01: Giao diện HUD & Sóng ECG nhịp tim (#MP-01) - [DONE]
│   ├── epic-02-identity-access.md            # EPIC 02: Xác thực JWT & Phân quyền Bác sĩ/Y tá/Bệnh nhân (#MP-02)
│   ├── epic-03-vital-telemetry.md            # EPIC 03: Kênh truyền WebSocket thời gian thực độ trễ < 200ms (#MP-03)
│   ├── epic-04-anomaly-alerting.md           # EPIC 04: Động cơ phát hiện bất thường & Cảnh báo khẩn cấp (#MP-04)
│   └── epic-05-clinical-records.md           # EPIC 05: Hồ sơ bệnh án & Báo cáo xu hướng Holter ECG 24h (#MP-05)
│
├── 02-sprint-backlog/                        # [ARTIFACT 2: SPRINT BACKLOG - KẾ HOẠCH TỪNG CHU KỲ]
│   ├── README.md                             # Lộ trình phát triển sản phẩm (Product Roadmap)
│   ├── sprint-01-foundation.md               # Sprint 01: Thiết lập nền tảng & Homepage Dashboard (11 SP - DONE)
│   └── sprint-02-telemetry-security.md       # Sprint 02: Kênh Telemetry & Xác thực phân quyền (16 SP - ACTIVE)
│
├── 03-scrum-governance/                      # [QUY TRÌNH VẬN HÀNH SCRUM & TIÊU CHUẨN ĐỘI NGŨ]
│   ├── roles-and-ceremonies.md               # Vai trò (PO, SM, Dev Team) & 4 sự kiện Sprint 2 tuần
│   └── definition-of-ready-and-done.md       # Tiêu chuẩn Sẵn sàng (DoR) và Hoàn thành (DoD)
│
└── 04-gitflow-guidelines/                    # [KỸ THUẬT & QUY TRÌNH PHÂN PHỐI NHÁNH GITFLOW]
    ├── gitflow-workflow.md                   # Cấu trúc 3 nhánh chính (prod, staging, dev) & Hotfix 3 chiều
    ├── commit-and-issue-conventions.md       # Quy chuẩn commit message bắt buộc gắn #Issue_ID & Git Hook
    └── branch-protection-and-review.md       # Hướng dẫn khóa nhánh GitHub & checklist PR Code Review
```

---

## ⚡ Bảng Tra Cứu Nhanh Cho Thành Viên

| Nhiệm Vụ Của Bạn | Tài Liệu Cần Xem | Đường Dẫn |
| :--- | :--- | :--- |
| **Xem toàn bộ tính năng & User Stories** | Master Product Backlog | [01-product-backlog/README.md](01-product-backlog/README.md) |
| **Xem công việc Sprint đang chạy** | Sprint 02 Backlog | [02-sprint-backlog/sprint-02-telemetry-security.md](02-sprint-backlog/sprint-02-telemetry-security.md) |
| **Xem tiêu chuẩn để đưa task vào làm / đóng task** | DoR và DoD Checklist | [03-scrum-governance/definition-of-ready-and-done.md](03-scrum-governance/definition-of-ready-and-done.md) |
| **Cách đặt tên nhánh, viết commit đúng chuẩn** | Quy chuẩn Commit & Issue ID | [04-gitflow-guidelines/commit-and-issue-conventions.md](04-gitflow-guidelines/commit-and-issue-conventions.md) |
| **Quy trình merge code, xử lý lỗi khẩn cấp** | Gitflow & Hotfix 3 chiều | [04-gitflow-guidelines/gitflow-workflow.md](04-gitflow-guidelines/gitflow-workflow.md) |
