# EPIC-04: Động Cơ Cảnh Báo Bất Thường Khẩn Cấp (Anomaly Alerting & Dispatch)

---

## 1. Tuyên Bố Phạm Vi Nghiệp Vụ (Scope)
EPIC-04 đóng vai trò cứu sinh trong hệ thống MeridianPulse, tự động phân tích dòng dữ liệu sinh học theo thời gian thực dựa trên các quy tắc y khoa (Clinical Rules) để phát hiện sớm các nguy cơ sốc tim, suy hô hấp, nhịp tim quá nhanh hoặc quá chậm và kích hoạt báo động khẩn cấp tới nhân viên y tế.

## 2. Bảng Ngưỡng Cảnh Báo Tiêu Chuẩn (Clinical Alert Thresholds)

| Loại Cảnh Báo | Điều Kiện Kích Hoạt | Cấp Độ Nguy Hiểm | Hành Động Hệ Thống |
| :--- | :--- | :--- | :--- |
| **Nhịp tim tăng vọt (Tachycardia)** | BPM > 120 liên tục trong > 5 giây | 🚨 **Critical (Đỏ)** | Nhấp nháy đỏ thẻ giường, phát âm thanh cảnh báo tần số cao, gửi thông báo khẩn tới máy tính bảng bác sĩ. |
| **Nhịp tim quá chậm (Bradycardia)** | BPM < 50 liên tục trong > 5 giây | 🚨 **Critical (Đỏ)** | Tương tự cấp độ nguy kịch. |
| **Tụt oxy trong máu (Hypoxemia)** | SpO2 < 92% | ⚠️ **Warning (Vàng cam)** | Đổi màu thẻ sang cam, phát chuông nhắc nhở nhẹ. |
| **Mất tín hiệu cảm biến** | Không có dữ liệu trong > 10 giây | ℹ️ **Notice (Xám)** | Đổi trạng thái sang "OFFLINE". |

## 3. Danh Sách User Stories Thuộc Epic
- [ ] [MP-04-critical-anomaly-alerts.md](MP-04-critical-anomaly-alerts.md): Hệ thống phát hiện bất thường và cảnh báo đa phương tiện (Sprint 02 - 5 SP).
