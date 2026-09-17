# Sprint Backlog: Sprint 01 - Foundation & Dashboard HUD

- **Thời gian diễn ra:** Tuần 1 - Tuần 2 (2 tuần / 10 ngày làm việc)
- **Trạng thái:** ✅ **Hoàn thành (DONE)**
- **Nhánh phát hành Staging:** `staging` (Tag `v1.0.0`)
- **Tổng điểm Story Points cam kết:** `11 Points`

---

## 🎯 Mục Tiêu Sprint (Sprint Goal)
> *"Thiết lập toàn bộ khung phân phối nhánh Gitflow chuẩn, quy chuẩn commit message bắt buộc gắn Issue ID, bộ tài liệu nghiệp vụ Scrum chuẩn hóa, và hoàn thiện giao diện Bảng điều khiển sinh tồn Homepage Dashboard (`fe/`) với biểu đồ nhịp tim ECG động 60 FPS."*

---

## 📋 Danh Sách Product Backlog Items (PBI) Trong Sprint

| Mã Issue | Loại | Tên Hạng Mục Công Việc | Story Points | Nhánh Git Triển Khai | Trạng Thái |
| :---: | :---: | :--- | :---: | :--- | :---: |
| **`#MP-00`** | `docs` | Thiết lập phân phối nhánh Gitflow, Git hook chặn commit lỗi, bộ tài liệu nghiệp vụ Scrum. | 3 SP | `feat/MP-00-gitflow-scrum-docs` | ✅ DONE |
| **`#MP-01`** | `feat` | Xây dựng giao diện Bảng điều khiển sinh tồn Homepage Dashboard ([fe/index.html](file:///e:/Projects/MeridianPulse/fe/index.html)). | 5 SP | `feat/MP-01-homepage-dashboard` | ✅ DONE |
| **`#MP-02`** | `chore` | Thiết kế kiến trúc và cấu trúc thư mục tầng Backend ([be/README.md](file:///e:/Projects/MeridianPulse/be/README.md)). | 3 SP | `feat/MP-02-backend-skeleton` | ✅ DONE |

---

## 🔍 Kết Quả Nghiệm Thu Sprint Review
- [x] Đã demo giao diện Homepage với sóng ECG chạy trực tiếp trên HTML5 Canvas.
- [x] Đã nghiệm thu các thẻ chỉ số BPM, SpO2, Huyết áp và thẻ cảnh báo nguy kịch Giường 103.
- [x] Mã nguồn đã merge sạch sẽ vào `dev`, chuyển giao kiểm thử trên `staging` và phát hành lên `prod` (`v1.0.0`).
