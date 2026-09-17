# Cẩm Nang Vận Hành Hệ Thống Quản Trị (/admin Operations Guide)

Tài liệu này đặc tả chi tiết 4 phân hệ quản trị vận hành cốt lõi trong trang `/admin` giúp đội ngũ kỹ thuật và vận hành kiểm soát toàn bộ hạ tầng, tài chính và kiểm duyệt nội dung.

---

## 1. Phân Hệ 1: Vận Hành Hạ Tầng AI & Service Models

```text
[Admin Service Models] ──► Cấu hình bật/tắt Model (Veo, Kling, Flux)
                       ──► Đặt giá Credits tiêu thụ cho từng giây video/ảnh
                       ──► Cấu hình ngưỡng thời gian Timeout và cơ chế Fallback
```

### 1.1. Quản lý danh mục mô hình (`/admin/service-models`)
* Cho phép Admin cập nhật ngay lập tức mà không cần deploy lại code:
  - Bật/tắt model (Active / Inactive).
  - Đặt nhãn "HOT", "NEW", "BETA" trên giao diện người dùng.
  - Cấu hình số credits trừ cho từng độ phân giải (720p, 1080p, 4K) và thời lượng (5s, 10s).

### 1.2. Trình điều phối tài khoản & Token Pool (`/admin/pool-manager`)
* Đối với các model AI sử dụng tài khoản upstream xoay vòng:
  - Quản lý danh sách Cookie / Auth Token của dàn tài khoản.
  - Tự động kiểm tra trạng thái sống (Health Check) mỗi 5 phút.
  - Tự động loại bỏ tài khoản bị hết hạn mức hoặc bị rate-limit ra khỏi hàng đợi.

### 1.3. Quản lý Proxy Farm (`/admin/proxies`)
* Nhập danh sách Proxy (HTTP/SOCKS5) hàng loạt định dạng `ip:port:user:pass`.
* Chức năng **Check-All**: Kiểm tra độ trễ (Latency), quốc gia (Geo-IP), và chặn các IP bị đưa vào blacklist của nhà cung cấp AI.

---

## 2. Phân Hệ 2: Kiểm Duyệt Nội Dung & An Toàn (Trust & Safety)

### 2.1. Kiểm duyệt hình ảnh/video vi phạm (`/admin/nsfw-review`)
* **Kiểm duyệt tự động 2 lớp:**
  - **Lớp 1 (Prompt Firewall):** Chặn danh sách từ khóa cấm (Bạo lực, chính trị nhạy cảm, người nổi tiếng, 18+).
  - **Lớp 2 (Post-generation AI Vision Filter):** Trước khi trả kết quả cho người dùng, ảnh/video được quét qua mô hình phân loại NSFW (Fal NSFW Filter hoặc AWS Rekognition).
* Nếu phát hiện nội dung vi phạm:
  - Tự động làm mờ (Blur) và gắn cờ `FLAGGED`.
  - Đưa vào hàng đợi duyệt thủ công của Admin tại `/admin/nsfw-review`.
  - Nếu vi phạm nghiêm trọng: Tự động khóa tài khoản và giữ lại số dư credits.

---

## 3. Phân Hệ 3: Quản Trị Người Dùng, Tài Chính & Đại Lý

### 3.1. Quản lý tài khoản người dùng (`/admin/users`)
* Tra cứu thông tin người dùng theo Email, Google ID.
* Xem lịch sử tạo video, prompt đã sử dụng và địa chỉ IP đăng nhập.
* Chức năng cộng/trừ credits thủ công (để hỗ trợ khách hàng hoặc đền bù khi hệ thống gặp sự cố).

### 3.2. Quản lý thanh toán & Đối soát (`/admin/payments`)
* Tích hợp cổng thanh toán đa kênh:
  - Quốc tế: **Stripe**, **PayPal**.
  - Việt Nam: **PayOS / VietQR (Quét mã chuyển khoản tự động qua Webhook)**, **MoMo**, **VNPAY**.
  - Web3 / Crypto: **USDT (TRC20 / BEP20)** cho khách hàng quốc tế muốn ẩn danh.
* Bảng đối soát tự động: Tự động cộng credits ngay khi nhận được Webhook thanh toán thành công trong vòng 3 giây.

### 3.3. Phê duyệt rút tiền Marketplace (`/admin/marketplace/withdrawals`)
* Đối với các Creator bán template và nhận hoa hồng:
  - Kiểm tra số dư hoa hồng khả dụng.
  - Xác minh thông tin tài khoản ngân hàng hoặc ví USDT.
  - Bấm nút "Phê Duyệt & Chuyển Tiền" ➔ Cập nhật trạng thái `COMPLETED`.

---

## 4. Phân Hệ 4: Nhật Ký & Phân Tích Dữ Liệu (Logs & Analytics)

* **Generation Logs (`/admin/generation-logs`):** Ghi lại mọi lượt sinh ảnh/video: Người dùng nào, dùng model gì, prompt gì, mất bao nhiêu giây render, tốn bao nhiêu chi phí gốc và thu được bao nhiêu credits.
* **API Key Error Tracking (`/admin/api-key-errors`):** Cảnh báo ngay lập tức qua Telegram Bot khi một API key của nhà cung cấp bị hết tiền hoặc lỗi HTTP 429 (Too Many Requests).
