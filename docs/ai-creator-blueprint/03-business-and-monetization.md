# Mô Hình Kinh Doanh, Tài Chính & Nhượng Quyền (Monetization & Franchise Blueprint)

Tài liệu này phân tích chi tiết cơ chế định giá Credits, chiến lược kinh doanh B2C và mô hình nhượng quyền B2B (Franchise White-label) theo đúng cấu trúc thực tế của **PlenxAI**.

---

## 1. Nền Kinh Tế Điểm Tín Dụng (Credit Economy)

Hệ sinh thái Generative AI sử dụng **Credits (Điểm tín dụng)** làm đơn vị tiền tệ trung gian để chuẩn hóa chi phí giữa các mô hình có giá thành khác nhau.

### 1.1. Công thức tính giá Credits (Profit Margin Formula)
```text
Giá bán Credits = Chi phí API gốc (hoặc GPU Cloud) x Hệ số lợi nhuận gộp (2.5x - 4.0x)
```

*Quy ước đơn vị tiền tệ:*  
**1 USD = 100 Credits** (Tương đương 1 Credit = 0.01 USD ~ 250 VNĐ).

| Hành Động Sinh Nội Dung | Model Sử Dụng | Chi Phí Gốc Ước Tính | Số Credits Trừ Người Dùng | Doanh Thu Ước Tính | Biên Lợi Nhuận Gộp |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Ảnh chuẩn (1024x1024)** | Flux.1 Schnell | ~$0.003 / ảnh | **2 Credits** | $0.02 | **85%** |
| **Ảnh chất lượng cao** | Flux.1 Dev / Midjourney | ~$0.025 / ảnh | **6 Credits** | $0.06 | **58%** |
| **Video AI 5s (Tiêu chuẩn)** | Minimax / Hailuo | ~$0.15 / video | **35 Credits** | $0.35 | **57%** |
| **Video AI 5s (Điện ảnh)** | Veo 3 / Kling Motion | ~$0.30 / video | **70 Credits** | $0.70 | **57%** |
| **Voice Clone (1,000 ký tự)** | F5-TTS / CosyVoice | ~$0.005 / lần | **5 Credits** | $0.05 | **90%** |
| **AI Product TVC** | ComfyUI RunningHub | ~$0.08 / task | **25 Credits** | $0.25 | **68%** |

---

## 2. Các Luồng Doanh Thu Chính (Revenue Streams)

### 2.1. Gói Thuê Bao Định Kỳ (Subscription Recurring - MRR)
* **Gói Free / Dùng Thử:** Tặng 25 credits khi đăng ký tài khoản qua Google, có watermark, hàng đợi tiêu chuẩn (hàng đợi chậm).
* **Gói Starter ($15 / tháng):** 1,800 credits/tháng, không watermark, hàng đợi ưu tiên, sinh ảnh/video không giới hạn lịch sử lưu trữ.
* **Gói Pro Creator ($39 / tháng):** 5,000 credits/tháng, truy cập toàn bộ model mới nhất (Veo 3.1, Kling Motion), hỗ trợ render song song 3 tác vụ.
* **Gói Studio / Agency ($99 / tháng):** 15,000 credits/tháng, chia sẻ workspace cho 5 thành viên, hàng đợi VIP tốc độ cao nhất.

### 2.2. Gói Nạp Credits Lẻ (Pay-as-you-go Credit Packs)
Dành cho khách hàng không muốn cam kết thuê bao hàng tháng:
* Pack 500 Credits: **$6**
* Pack 2,500 Credits: **$25**
* Pack 10,000 Credits: **$85**

### 2.3. Sàn Giao Dịch Workflow & Prompts (Marketplace Commission)
* Các Creator có thể đóng gói Workflow ComfyUI, câu lệnh Prompt, hoặc Style Preset để bán trên Marketplace.
* **Tỷ lệ ăn chia:**
  - Creator nhận: **80%** doanh thu bán template.
  - Nền tảng giữ lại: **20%** phí sàn và chi phí xử lý cổng thanh toán.

---

## 3. Mô Hình Nhượng Quyền Đại Lý (Franchise / Multi-Tenant B2B)

Đây là tính năng độc đáo giúp PlenxAI bán giải pháp cho các Agency hoặc các đối tác muốn sở hữu website AI riêng mà không cần viết code:

```text
[PlenxAI Master Platform]
            │
            ├──────► [Tenant A: vietai.vn] ──► Tên miền riêng, Logo riêng, Bảng giá riêng (VNĐ)
            │
            ├──────► [Tenant B: creative-agency.sg] ──► Tên miền riêng, Thanh toán Stripe (SGD)
            │
            └──────► [Tenant C: marketing-hub.us] ──► White-label toàn diện
```

* **Cơ chế kỹ thuật:**
  1. **Tên miền tùy biến (Custom Domain):** Đối tác trỏ CNAME về Cloudflare của nền tảng.
  2. **Nhận diện thương hiệu riêng (`/tenant/branding`):** Cấu hình logo, favicon, màu chủ đạo (Primary Color), tên nền tảng.
  3. **Tùy biến bảng giá (`/tenant/pricing`):** Đại lý tự đặt giá bán credits cho khách hàng của mình (ví dụ: mua sỉ credits từ bạn giá $0.005/credit và bán lẻ cho khách giá $0.015/credit).
  4. **Doanh thu nhượng quyền:**
     - Phí khởi tạo và cấp bản quyền (License fee): $500 - $2,000 / tenant.
     - Doanh thu bán sỉ credits (Wholesale credits) duy trì hàng tháng.
