# User Story #MP-05: Thống Kê Xu Hướng Sinh Tồn & Xuất Báo Cáo Lâm Sàng

- **Epic:** `EPIC-05 - Clinical Records & Historical Analytics`
- **Mã Issue:** `#MP-05`
- **Độ ưu tiên:** `P2 - Low`
- **Điểm ước lượng (Story Points):** `5`
- **Sprint thực hiện:** `Sprint 03`
- **Nhánh Git tương ứng:** `feat/MP-05-clinical-reports`
- **Tệp mã nguồn liên quan:** `be/reports/analytics.js`, `fe/reports/`

---

## 1. Mô Tả Người Dùng (User Story)

> **Là một** Bác sĩ phụ trách điều trị chuyên khoa Tim mạch,  
> **Tôi muốn** tra cứu lại đồ thị diễn biến nhịp tim và nồng độ SpO2 của bệnh nhân trong 24 giờ qua và xuất báo cáo PDF,  
> **Để** đánh giá chính xác hiệu quả đáp ứng thuốc và đưa vào biên bản hội chẩn bệnh viện.

---

## 2. Tiêu Chuẩn Chấp Nhận (Acceptance Criteria - Given/When/Then)

### Scenario 1: Biểu đồ xu hướng 24 giờ
- **Given** bác sĩ mở hồ sơ bệnh nhân ID #101,
- **When** chọn khoảng thời gian "24 giờ qua",
- **Then** biểu đồ hiển thị đường xu hướng BPM, đỉnh cao nhất (Max BPM), đáy thấp nhất (Min BPM) và đường trung bình.

### Scenario 2: Trích xuất báo cáo PDF
- **Given** trang chi tiết báo cáo ca trực,
- **When** nhấp nút "Xuất Hồ Sơ Lâm Sàng (PDF)",
- **Then** hệ thống tạo file PDF chuẩn A4 gồm tiêu đề bệnh viện, thông tin bệnh nhân, biểu đồ sóng ECG mẫu và bảng tổng hợp các đợt cảnh báo bất thường trong ngày.
