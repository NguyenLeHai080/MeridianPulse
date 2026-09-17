# User Story #MP-01: Giao Diện Bảng Điều Khiển Tổng Quan (Homepage Dashboard)

- **Epic:** `EPIC-01 - Core Platform & Dashboard Layout`
- **Mã Issue:** `#MP-01`
- **Độ ưu tiên:** `P0 - High`
- **Điểm ước lượng (Story Points):** `5`
- **Sprint thực hiện:** `Sprint 01`
- **Nhánh Git tương ứng:** `feat/MP-01-homepage-dashboard` (hoặc `feat/homepage`)
- **Tệp mã nguồn liên quan:** [fe/index.html](file:///e:/Projects/MeridianPulse/fe/index.html)

---

## 1. Mô Tả Người Dùng (User Story)

> **Là một** Y bác sĩ hoặc Điều dưỡng viên trực ca,  
> **Tôi muốn** truy cập một trang chủ trực quan hiển thị tổng quan các giường bệnh/bệnh nhân cùng nhịp tim trung bình, trạng thái kết nối thiết bị và danh sách cảnh báo mới nhất,  
> **Để** nắm bắt tức thời tình trạng toàn bộ bệnh nhân trong khu vực điều trị chỉ bằng một ánh nhìn.

---

## 2. Tiêu Chuẩn Chấp Nhận (Acceptance Criteria - Given/When/Then)

### Scenario 1: Bảng chỉ số tổng quan nhanh (KPI Overview Cards)
- **Given** người dùng truy cập trang chủ `fe/index.html`,
- **When** trang tải xong dữ liệu,
- **Then** hệ thống phải hiển thị 4 thẻ chỉ số nhanh:
  1. *Nhịp tim trung bình:* Hiển thị màu xanh lá cây khi ở khoảng 60 - 100 BPM.
  2. *SpO2 trung bình:* Hiển thị chỉ số oxy trong máu (> 95%).
  3. *Huyết áp toàn khoa:* Chỉ số tâm thu/tâm trương tiêu chuẩn (120/80 mmHg).
  4. *Số lượng cảnh báo nguy kịch:* Đổi sang màu đỏ nhấp nháy nếu có bệnh nhân nguy kịch.

### Scenario 2: Biểu đồ sóng nhịp tim thời gian thực (Pulse Monitor Wave)
- **Given** khu vực sóng điện tâm đồ tại màn hình chính,
- **When** có tín hiệu dữ liệu cập nhật,
- **Then** biểu đồ sóng nhịp tim (ECG canvas) phải vẽ chuyển động mượt mà ở tần số quét 60 FPS, có điểm quét laser phát sáng cyan.

### Scenario 3: Danh sách trạng thái giường bệnh (Patient Bed Cards)
- **Given** danh sách bệnh nhân tại khoa,
- **When** quan sát lưới các giường bệnh,
- **Then** từng giường bệnh phải thể hiện rõ: Mã giường, Tên bệnh nhân, BPM, SpO2, Huyết áp, và nhãn trạng thái (Ổn định / Cảnh báo nhịp nhanh).
