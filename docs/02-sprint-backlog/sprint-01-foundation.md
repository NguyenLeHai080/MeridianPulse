# Sprint 01: Thiết Lập Nền Tảng & Dashboard Sinh Tồn

- **Thời gian:** Tuần 1 - Tuần 2 (10 ngày làm việc)
- **Trạng thái:** ✅ **HOÀN THÀNH (DONE)**
- **Nhánh phát hành Staging & Prod:** `prod` (Tag `v1.0.0`)
- **Điểm Story Points cam kết:** `11 Points`

---

## 🎯 Mục Tiêu Sprint (Sprint Goal)
> *"Thiết lập toàn bộ khung phân phối nhánh Gitflow chuẩn, quy chuẩn commit message bắt buộc gắn Issue ID, bộ tài liệu nghiệp vụ Scrum chuẩn hóa, và hoàn thiện giao diện Bảng điều khiển sinh tồn Homepage Dashboard (`fe/`) với biểu đồ nhịp tim ECG động 60 FPS."*

---

## 📋 Danh Sách Hạng Mục Sprint Backlog

| Mã Issue | Loại | Tên User Story / Nhiệm Vụ | SP | Nhánh Git | Kết Quả |
| :---: | :---: | :--- | :---: | :--- | :---: |
| **`#MP-00`** | `docs` | Thiết lập phân phối nhánh Gitflow, Git hook chặn commit lỗi, bộ tài liệu Scrum. | 3 | `feat/MP-00-gitflow-scrum-docs` | ✅ Pass DoD |
| **`#MP-01`** | `feat` | Xây dựng giao diện Bảng điều khiển sinh tồn Homepage Dashboard ([fe/index.html](../../fe/index.html)). | 5 | `feat/MP-01-homepage-dashboard` | ✅ Pass DoD |
| **`#MP-02`** | `chore` | Thiết kế kiến trúc và cấu trúc thư mục tầng Backend ([be/README.md](../../be/README.md)). | 3 | `feat/MP-02-backend-skeleton` | ✅ Pass DoD |

---

## 🔍 Biên Bản Nghiệm Thu Sprint Review
- [x] Giao diện Homepage chạy mượt mà trên trình duyệt, không lỗi console.
- [x] Biểu đồ sóng điện tâm đồ ECG vẽ mượt 60 FPS trên HTML5 Canvas.
- [x] Các thẻ chỉ số sinh tồn và cảnh báo khẩn cấp tại Giường 103 hiển thị trực quan.
- [x] Merge thành công từ `dev` vào `staging`, UAT thành công và phát hành lên `prod`.
