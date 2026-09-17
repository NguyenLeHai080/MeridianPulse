# User Story #MP-04: Cảnh Báo Bất Thường Nguy Hiểm Đa Kênh (Critical Anomaly Alerts)

- **Epic:** `EPIC-04 - Anomaly Alerting & Emergency Notification`
- **Mã Issue:** `#MP-04`
- **Độ ưu tiên:** `P1 - Medium`
- **Điểm ước lượng (Story Points):** `5`
- **Sprint thực hiện:** `Sprint 02`
- **Nhánh Git tương ứng:** `feat/MP-04-anomaly-alerts`
- **Tệp mã nguồn liên quan:** `be/alerts/rule-engine.js`, `fe/index.html`

---

## 1. Mô Tả Người Dùng (User Story)

> **Là một** Bác sĩ hoặc Điều dưỡng viên trực phòng Hồi sức cấp cứu,  
> **Tôi muốn** nhận được tín hiệu cảnh báo trực quan nhấp nháy đỏ và âm thanh báo động ngay lập tức khi chỉ số sinh tồn của bệnh nhân vượt ra ngoài ngưỡng an toàn,  
> **Để** đội ngũ can thiệp cấp cứu kịp thời trong vòng 60 giây đầu tiên.

---

## 2. Tiêu Chuẩn Chấp Nhận (Acceptance Criteria - Given/When/Then)

### Scenario 1: Kích hoạt báo động nhịp tim nguy kịch
- **Given** bệnh nhân Giường 103 có chỉ số BPM = 126 đo được liên tục trong 5 giây,
- **When** động cơ cảnh báo quét qua gói tin,
- **Then** hệ thống thực hiện đồng thời:
  1. Đổi viền thẻ Giường 103 sang màu đỏ neon có hiệu ứng thở nhấp nháy (`animation: pulse 1s infinite`).
  2. Tăng số đếm "Cảnh Báo Nguy Kịch" trên HUD chính lên `01`.
  3. Bật còi báo động âm thanh cấp cứu tại bàn trực ca.

### Scenario 2: Tự động phục hồi khi chỉ số trở về bình thường
- **Given** bệnh nhân đã được xử lý y khoa và nhịp tim hạ xuống mức 82 BPM,
- **When** dữ liệu ổn định trong 15 giây liên tục,
- **Then** hệ thống tự động gỡ cảnh báo đỏ, chuyển trạng thái về "Ổn định" màu xanh lá cây và lưu sự kiện vào nhật ký cảnh báo.
