# EPIC-03: Kênh Thu Nhận Tín Hiệu Sinh Tồn Thời Gian Thực (Vital Signs Telemetry)

---

## 1. Tuyên Bố Phạm Vi Nghiệp Vụ (Scope)
EPIC-03 là "trái tim" kỹ thuật của hệ thống MeridianPulse, chịu trách nhiệm thu nạp hàng nghìn gói tin tín hiệu sinh học mỗi giây từ các cảm biến y tế (cảm biến nhịp tim, máy đo SpO2, máy đo huyết áp), xử lý làm mịn dữ liệu và phân phối tới Web Client qua WebSocket với độ trễ siêu thấp.

## 2. Các Tiêu Chuẩn Kỹ Thuật Bắt Buộc
- **Độ trễ truyền tải:** Dưới 200 miligiây từ thiết bị tới màn hình trực ca.
- **Tần số cập nhật:** 1 giây/lần cho chỉ số số học (BPM, SpO2) và 60 Hz cho sóng dạng sóng điện tâm đồ (ECG Waveform).
- **Cơ chế chịu lỗi:** Tự động kết nối lại (Exponential Backoff Reconnection) khi mất sóng Wi-Fi hoặc chập chờn mạng.

## 3. Danh Sách User Stories Thuộc Epic
- [ ] [MP-03-telemetry-engine.md](MP-03-telemetry-engine.md): Động cơ truyền tải luồng dữ liệu thời gian thực WebSocket (Sprint 02 - 8 SP).
