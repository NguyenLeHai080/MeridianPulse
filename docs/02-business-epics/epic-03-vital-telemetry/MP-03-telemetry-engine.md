# User Story #MP-03: Kênh Truyền Dữ Liệu Sinh Tồn Thời Gian Thực (Telemetry Stream Engine)

- **Epic:** `EPIC-03 - Vital Signs Telemetry & Real-time Stream`
- **Mã Issue:** `#MP-03`
- **Độ ưu tiên:** `P0 - High`
- **Điểm ước lượng (Story Points):** `8`
- **Sprint thực hiện:** `Sprint 02`
- **Nhánh Git tương ứng:** `feat/MP-03-telemetry-engine`
- **Tệp mã nguồn liên quan:** `be/sockets/telemetry.js`, `fe/index.html`

---

## 1. Mô Tả Người Dùng (User Story)

> **Là một** Kỹ sư phần mềm phát triển backend & frontend,  
> **Tôi muốn** xây dựng kênh truyền song công WebSocket giữa máy chủ và bảng điều khiển trực ca,  
> **Để** dữ liệu nhịp tim và oxy trong máu được truyền tải tức thời với độ trễ dưới 200ms.

---

## 2. Tiêu Chuẩn Chấp Nhận (Acceptance Criteria - Given/When/Then)

### Scenario 1: Kết nối và nhận gói tin Telemetry định kỳ
- **Given** client đã xác thực kết nối vào WebSocket endpoint `/ws/telemetry?wardId=ICU-01`,
- **When** thiết bị cảm biến phát dữ liệu nhịp tim,
- **Then** client nhận được cấu trúc gói tin JSON:
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
  và cập nhật tức thì lên thẻ bệnh nhân mà không làm đơ giao diện.

### Scenario 2: Tự động khôi phục kết nối khi mạng gián đoạn
- **Given** kết nối WebSocket bị đứt đột ngột do lỗi mạng,
- **When** phát hiện sự kiện `onclose`,
- **Then** client hiển thị huy hiệu "MẤT KẾT NỐI - ĐANG THỬ LẠI..." màu vàng cam và tự động gọi lại kết nối theo chu kỳ 1s, 2s, 4s, 8s cho đến khi thành công.
