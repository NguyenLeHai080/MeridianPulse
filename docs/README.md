# Trung Tâm Tài Liệu Dự Án MeridianPulse (Docs Directory)

Chào mừng bạn đến với kho tài liệu tiêu chuẩn kỹ thuật và nghiệp vụ Scrum của dự án **MeridianPulse**.

---

## 📑 Mục Lục Tài Liệu

| Thứ Tự | Tài Liệu | Nội Dung Chính |
| :---: | :--- | :--- |
| **01** | [01-gitflow-workflow.md](01-gitflow-workflow.md) | **Quy trình Gitflow:** Cấu trúc 3 nhánh chính (`prod`, `staging`, `dev`), nhánh tạm thời (`feat/*`, `hotfix/*`), quy tắc commit bắt buộc gắn **Issue ID**, bảng tra cứu lệnh Git, và quy trình xử lý hotfix 3 chiều. |
| **02** | [02-scrum-framework-guidelines.md](02-scrum-framework-guidelines.md) | **Khung Vận Hành Scrum:** Cơ cấu vai trò (PO, SM, Dev), các sự kiện Sprint (Planning, Daily, Review, Retro), bộ tiêu chuẩn sẵn sàng (DoR) và hoàn thành (DoD), ma trận liên kết Scrum sang Gitflow. |
| **03** | [03-product-backlog-and-sprints.md](03-product-backlog-and-sprints.md) | **Nghiệp Vụ & Product Backlog:** Tầm nhìn sản phẩm hệ thống theo dõi nhịp sinh học MeridianPulse, danh mục Epics, các User Stories chi tiết kèm mã Issue (`#MP-01`, `#MP-02`...), Acceptance Criteria và kế hoạch phân bổ Sprint 1 & Sprint 2. |
| **04** | [04-branch-protection-and-collaboration.md](04-branch-protection-and-collaboration.md) | **Bảo Vệ Nhánh & Code Review:** Hướng dẫn thiết lập khóa nhánh trên GitHub (`prod`, `staging`), chống force push, checklist đánh giá Pull Request trước khi merge. |

---

## 🚀 Tóm Tắt Quy Ước Nhanh Cho Thành Viên Mới

1. **Nhánh làm việc:** Luôn tạo nhánh `feat/<issue_id>-<ten_tinh_nang>` từ `dev`.
2. **Commit message:** Bắt buộc có mã Issue: `feat: add initial layout #MP-01`.
3. **Đưa mã lên môi trường:**
   - Mở PR từ `feat/*` vào `dev`.
   - Sau khi duyệt & test, merge `dev` vào `staging` (cho QA/QC kiểm thử & Demo).
   - Khi ổn định, merge `staging` vào `prod` (cho người dùng thực tế).
4. **Xử lý sự cố khẩn cấp (Hotfix):**
   - Nhánh `hotfix/*` tạo từ `prod`.
   - Sửa lỗi -> Merge vào `prod` -> Đồng bộ ngay vào `staging` và `dev`.
