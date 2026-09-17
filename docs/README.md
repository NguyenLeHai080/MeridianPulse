# Trung Tâm Tài Liệu Nghiệp Vụ & Kỹ Thuật (MeridianPulse Docs)

Chào mừng bạn đến với kho tài liệu tiêu chuẩn kỹ thuật và nghiệp vụ Scrum của dự án **MeridianPulse** (Hệ Thống Giám Sát & Quản Lý Chỉ Số Sinh Tồn Thời Gian Thực). Toàn bộ tài liệu được phân chia thành các thư mục chuyên biệt theo từng miền nghiệp vụ và quy trình.

---

## 🏛️ Cấu Trúc Thư Mục Nghiệp Vụ (Directory Architecture)

```text
docs/
├── README.md                                    # Tài liệu này (Mục lục trung tâm)
│
├── 00-gitflow-workflow/                        # [Quy trình Gitflow & Quản lý Nhánh]
│   ├── README.md                                # Tổng quan quy trình Git & Cheat-sheet
│   ├── branching-strategy.md                    # Cấu trúc 3 nhánh chính (prod, staging, dev) & nhánh tạm
│   ├── commit-convention.md                     # Quy chuẩn Conventional Commits kèm mã Issue ID (#MP-xx)
│   ├── hotfix-and-sync-process.md               # Quy trình vá lỗi khẩn cấp & đồng bộ 3 chiều
│   └── branch-protection-and-review.md          # Hướng dẫn khóa nhánh GitHub & checklist Code Review
│
├── 01-scrum-framework/                         # [Khung Vận Hành Scrum & Agile]
│   ├── README.md                                # Tổng quan nguyên tắc Scrum
│   ├── roles-and-ceremonies.md                  # Vai trò (PO, SM, Dev Team) & chu kỳ Sprint 2 tuần
│   ├── definition-of-ready-and-done.md          # Bộ tiêu chuẩn Sẵn sàng (DoR) và Hoàn thành (DoD)
│   └── git-scrum-integration-matrix.md          # Ma trận ánh xạ Issue ID, Branch, PR, Releases
│
├── 02-business-epics/                          # [CÁC MIỀN NGHIỆP VỤ CỐT LÕI (DOMAINS & USER STORIES)]
│   ├── README.md                                # Sơ đồ kiến trúc tổng thể các miền nghiệp vụ
│   ├── epic-01-core-platform/                  # Nghiệp vụ Giao diện & Bảng điều khiển HUD
│   │   ├── README.md                            # Phạm vi nghiệp vụ UI/UX
│   │   └── MP-01-homepage-dashboard.md          # User Story #MP-01 (Acceptance Criteria Gherkin, DoD)
│   ├── epic-02-identity-access/                 # Nghiệp vụ Định danh & Phân quyền (IAM)
│   │   ├── README.md                            # Ma trận phân quyền Bác sĩ / Y tá / Bệnh nhân
│   │   └── MP-02-auth-rbac.md                   # User Story #MP-02 (JWT, Refresh Token, RBAC)
│   ├── epic-03-vital-telemetry/                 # Nghiệp vụ Kênh Tín hiệu Sinh tồn Realtime
│   │   ├── README.md                            # Tiêu chuẩn luồng dữ liệu WebSocket, độ trễ < 200ms
│   │   └── MP-03-telemetry-engine.md            # User Story #MP-03 (BPM, SpO2, Sóng ECG 60 FPS)
│   ├── epic-04-anomaly-alerting/                # Nghiệp vụ Phát hiện Bất thường & Báo động Khẩn cấp
│   │   ├── README.md                            # Bảng ngưỡng cảnh báo lâm sàng (Nhịp nhanh/chậm)
│   │   └── MP-04-critical-anomaly-alerts.md     # User Story #MP-04 (Cảnh báo thị giác & âm thanh)
│   └── epic-05-clinical-records/                # Nghiệp vụ Hồ sơ Bệnh án & Thống kê Lâm sàng
│       ├── README.md                            # Báo cáo xu hướng nhịp tim 24h & Holter ECG
│       └── MP-05-historical-analytics.md        # User Story #MP-05 (Trích xuất hồ sơ bệnh án PDF)
│
└── 03-sprints/                                 # [Kế Hoạch & Nhật Ký Sprint Backlog]
    ├── README.md                                # Lộ trình phát triển sản phẩm (Product Roadmap)
    ├── sprint-01-foundation/                    # Sprint 01: Thiết lập nền tảng & Homepage Dashboard
    │   └── sprint-backlog.md                    # Danh sách PBI, cam kết 11 Story Points (Đã xong)
    └── sprint-02-telemetry-security/            # Sprint 02: Xác thực bảo mật & Luồng dữ liệu sinh tồn
        └── sprint-backlog.md                    # Danh sách PBI, cam kết 16 Story Points (Đang làm)
```

---

## 🚀 Hướng Dẫn Nhanh Dành Cho Thành Viên Dự Án

1. **Bắt đầu công việc mới:**
   - Xem User Story trong thư mục [02-business-epics/](02-business-epics/) để nắm rõ **Acceptance Criteria**.
   - Tạo nhánh tính năng từ `dev`:
     ```bash
     git switch dev
     git pull origin dev
     git switch -c feat/<issue_id>-<ten_tinh_nang>
     ```
2. **Commit mã nguồn:**
   - Bắt buộc phải gắn mã Issue ID (được kiểm tra tự động bởi Git hook):
     ```bash
     git commit -m "feat: add real-time ecg pulse monitor #MP-01"
     ```
3. **Mở Pull Request:**
   - Mở PR từ nhánh tính năng vào **`dev`**. Điền checklist theo mẫu [.github/pull_request_template.md](../.github/pull_request_template.md).
4. **Quy trình Release & Hotfix:**
   - Xem chi tiết tại [00-gitflow-workflow/hotfix-and-sync-process.md](00-gitflow-workflow/hotfix-and-sync-process.md).
