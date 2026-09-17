# EPIC-05: Hồ Sơ Bệnh Án & Thống Kê Lâm Sàng (Clinical Records & Analytics)

- **Trạng thái Epic:** ⏳ **Dự kiến (Sprint 03)**
- **Mã Epic:** `EPIC-05`
- **Mã Issue:** `#MP-05`
- **Nhánh Git phụ trách:** `feat/MP-05-clinical-reports`
- **Mã nguồn liên quan:** `be/reports/analytics.js`, `fe/reports/`

---

## 1. Tuyên Bố Phạm Vi Nghiệp Vụ
Lưu trữ dài hạn dữ liệu điện tâm đồ, tổng hợp đồ thị xu hướng biến thiên nhịp tim trong 24 giờ (Holter ECG trend) và trích xuất hồ sơ bệnh án định dạng PDF/CSV phục vụ hội chẩn y khoa.

---

## 2. Đặc Tả Chi Tiết User Story #MP-05

> **Là một** Bác sĩ phụ trách điều trị chuyên khoa Tim mạch,  
> **Tôi muốn** tra cứu lại đồ thị diễn biến nhịp tim và nồng độ SpO2 của bệnh nhân trong 24 giờ qua và xuất báo cáo PDF,  
> **Để** đánh giá chính xác hiệu quả đáp ứng thuốc và đưa vào biên bản hội chẩn bệnh viện.

### Tiêu Chuẩn Chấp Nhận (Acceptance Criteria):
- **Scenario 1:** Biểu đồ xu hướng 24h hiển thị rõ Max BPM, Min BPM, Average BPM và tỷ lệ phần trăm thời gian trong ngưỡng an toàn (Time-in-Range).
- **Scenario 2:** Trích xuất file PDF chuẩn A4 gồm thông tin bệnh viện, dữ liệu bệnh nhân, biểu đồ ECG mẫu và danh sách cảnh báo trong ngày.
