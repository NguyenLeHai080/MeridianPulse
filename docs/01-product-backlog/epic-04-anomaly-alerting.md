# EPIC-04: Động Cơ Cảnh Báo Bất Thường Khẩn Cấp (Anomaly Alerting & Dispatch)

- **Trạng thái Epic:** ⏳ **Dự kiến (Sprint 03)**
- **Mã Epic:** `EPIC-04`
- **Mã Issue:** `#MP-04`
- **Nhánh Git phụ trách:** `feat/MP-04-anomaly-alerts`
- **Mã nguồn liên quan:** `be/alerts/rule-engine.js`, `fe/index.html`

---

## 1. Tuyên Bố Phạm Vi Nghiệp Vụ
Tự động phân tích dòng dữ liệu sinh học theo các quy tắc y khoa để phát hiện sớm các nguy cơ nhịp tim bất thường (quá nhanh hoặc quá chậm) và kích hoạt báo động khẩn cấp tới nhân viên y tế trong vòng 60 giây.

---

## 2. Bảng Ngưỡng Cảnh Báo Lâm Sàng

| Loại Cảnh Báo | Điều Kiện Kích Hoạt | Cấp Độ Nguy Hiểm | Hành Động Hệ Thống |
| :--- | :--- | :--- | :--- |
| **Nhịp tim tăng vọt (Tachycardia)** | BPM > 120 liên tục trong > 5 giây | 🚨 **Critical (Đỏ)** | Nhấp nháy viền thẻ giường, tăng bộ đếm cảnh báo nguy kịch, phát âm thanh báo động. |
| **Nhịp tim quá chậm (Bradycardia)** | BPM < 50 liên tục trong > 5 giây | 🚨 **Critical (Đỏ)** | Tương tự cấp độ nguy kịch. |
| **Tụt oxy trong máu (Hypoxemia)** | SpO2 < 92% | ⚠️ **Warning (Vàng cam)** | Đổi màu thẻ sang cam, phát chuông nhắc nhở nhẹ. |

---

## 3. Đặc Tả Chi Tiết User Story #MP-04

> **Là một** Bác sĩ hoặc Điều dưỡng viên trực phòng Hồi sức cấp cứu,  
> **Tôi muốn** nhận được tín hiệu cảnh báo trực quan nhấp nháy đỏ và âm thanh báo động ngay lập tức khi chỉ số sinh tồn của bệnh nhân vượt ra ngoài ngưỡng an toàn,  
> **Để** đội ngũ can thiệp cấp cứu kịp thời trong vòng 60 giây đầu tiên.

### Tiêu Chuẩn Chấp Nhận (Acceptance Criteria):
- **Scenario 1:** Kích hoạt báo động khi BPM > 120: Viền thẻ bệnh nhân đổi sang đỏ nhấp nháy, còi báo động tại bàn trực kêu.
- **Scenario 2:** Tự động hạ cảnh báo khi chỉ số trở về bình thường ổn định trong 15 giây liên tục.
