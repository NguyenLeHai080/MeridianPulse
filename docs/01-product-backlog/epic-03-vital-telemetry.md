# EPIC-03: Kênh Thu Nhận Tín Hiệu Sinh Tồn Thời Gian Thực (Vital Signs Telemetry)

- **Trạng thái Epic:** 🔄 **Đang phát triển (In Progress trong Sprint 02)**
- **Mã Epic:** `EPIC-03`
- **Mã Issue:** `#MP-03`
- **Nhánh Git phụ trách:** `feat/MP-03-telemetry-engine`
- **Mã nguồn liên quan:** `be/sockets/telemetry.js`, `fe/index.html`

---

## 1. Tuyên Bố Phạm Vi Nghiệp Vụ
EPIC-03 là "trái tim" kỹ thuật của MeridianPulse, chịu trách nhiệm thu nạp tín hiệu từ cảm biến y tế (nhịp tim BPM, SpO2, huyết áp), xử lý làm mịn dữ liệu và truyền tới Web Client qua WebSocket với độ trễ siêu thấp (< 200ms).

---

## 2. Đặc Tả Chi Tiết User Story #MP-03

> **Là một** Kỹ sư phần mềm phát triển backend & frontend,  
> **Tôi muốn** xây dựng kênh truyền song công WebSocket giữa máy chủ và bảng điều khiển trực ca,  
> **Để** dữ liệu nhịp tim và oxy trong máu được truyền tải tức thời với độ trễ dưới 200ms.

---

## 3. Tiêu Chuẩn Chấp Nhận (Acceptance Criteria):
- **Scenario 1:** Kết nối thành công tới endpoint `/ws/telemetry?wardId=ICU-01`, nhận gói tin JSON định kỳ 1s/lần:
  ```json
  {
    "patientId": "P-101",
    "bedNumber": "101",
    "bpm": 74,
    "spo2": 98.5,
    "bloodPressure": "120/80",
    "timestamp": 1726569100000
  }
  ```
- **Scenario 2:** Tự động khôi phục kết nối (Exponential Backoff Reconnect: 1s, 2s, 4s, 8s) khi mất mạng, hiển thị huy hiệu cảnh báo vàng trên màn hình.
