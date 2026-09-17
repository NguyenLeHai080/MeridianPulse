# Lộ Trình Triển Khai Thực Tế 100% Theo Chuẩn Scrum (8 Sprints Roadmap)

Tài liệu này vạch ra lộ trình kỹ thuật gồm 4 giai đoạn (Phases) chia thành 8 Sprints (mỗi Sprint 2 tuần, tổng cộng 16 tuần / 4 tháng) để đưa nền tảng từ con số 0 lên một hệ sinh thái Generative AI hoàn chỉnh 100% tương đương **PlenxAI**.

---

## 🗺️ Bảng Tổng Hợp 4 Giai Đoạn Triển Khai

```text
[Phase 1: Nền Tảng Cốt Lõi & MVP] ──► Sprint 1 & 2: Auth, Credit Wallet, Image & Video Studio cơ bản.
                 │
                 ▼
[Phase 2: Video Chuyên Sâu & Fast Apps] ──► Sprint 3 & 4: Veo 3, Kling Motion, Product TVC, Dance Studio, TikTok Scraper.
                 │
                 ▼
[Phase 3: Voice AI & Hạ Tầng Admin] ──► Sprint 5 & 6: Voice Clone, Music Studio, Proxy Farm, Pool Manager, NSFW Filter.
                 │
                 ▼
[Phase 4: Marketplace & Nhượng Quyền B2B] ──► Sprint 7 & 8: Chợ Workflow, Rút tiền Creator, Hệ thống Franchise White-label.
```

---

## 🚀 Chi Tiết Từng Sprint & Nhiệm Vụ

### GIAI ĐOẠN 1: NỀN TẢNG CỐT LÕI & THANH TOÁN (SPRINT 01 & 02)

#### Sprint 01: Kiến Trúc Hạ Tầng, Xác Thực & Ví Tiền Điện Tử (Foundation & Wallet)
* **Mục tiêu:** Xây dựng khung ứng dụng Next.js, hệ thống tài khoản và ví Credits.
* **Nhiệm vụ cụ thể:**
  - `[EPIC-CORE]` Dựng skeleton Next.js 14, TailwindCSS, Dark Theme HUD.
  - `[EPIC-AUTH]` Tích hợp Google OAuth 1-tap và xác thực JWT.
  - `[EPIC-BILLING]` Thiết kế bảng `UserBalance`, `TransactionLedger` và tích hợp cổng thanh toán tự động (PayOS/VietQR chuyển khoản ngân hàng & Stripe).
  - `[EPIC-INFRA]` Dựng cụm Redis + BullMQ và cấu hình Cloudflare R2 bucket.

#### Sprint 02: Studio Ảnh (Flux) & Video Cơ Bản (Minimax/Kling)
* **Mục tiêu:** Người dùng nạp tiền có thể tạo được ảnh và video AI đầu tiên.
* **Nhiệm vụ cụ thể:**
  - `[EPIC-IMAGE]` Tích hợp model `Flux.1 Schnell` qua fal.ai API, hỗ trợ tỷ lệ khung hình (16:9, 9:16, 1:1).
  - `[EPIC-VIDEO]` Tích hợp Text-to-Video & Image-to-Video qua Minimax / Kling API.
  - `[EPIC-QUEUE]` Xây dựng worker nhận job, trừ credits tạm giữ, tải video lên R2 và thông báo hoàn thành qua WebSocket.

---

### GIAI ĐOẠN 2: VIDEO CHUYÊN SÂU & E-COMMERCE FAST APPS (SPRINT 03 & 04)

#### Sprint 03: Veo 3, Kling Motion Control & AI Dance Studio
* **Mục tiêu:** Mở rộng các model video đỉnh cao nhất và công cụ điều khiển chuyển động.
* **Nhiệm vụ cụ thể:**
  - `[EPIC-VIDEO]` Tích hợp Google Veo 3 / 3.1 với tùy chọn chất lượng cao.
  - `[EPIC-VIDEO]` Xây dựng công cụ điều khiển camera (Pan, Zoom, Tilt, Roll) và bút vẽ chuyển động (Motion Brush).
  - `[EPIC-FASTAPP]` Triển khai `See Dance Studio`: Ghép ảnh chân dung vào kho vũ đạo mẫu bằng template video.

#### Sprint 04: Bộ Công Cụ E-Commerce TVC & TikTok/Reels Scraper
* **Mục tiêu:** Phục vụ nhà bán hàng online và người làm affiliate video.
* **Nhiệm vụ cụ thể:**
  - `[EPIC-FASTAPP]` Triển khai `Product TVC`: Tự động tách nền sản phẩm, ghép bối cảnh 3D và render video quảng cáo 5s.
  - `[EPIC-FASTAPP]` Triển khai `Gacha KOLs` (người mẫu AI) & `Food Creator`.
  - `[EPIC-SCRAPER]` Xây dựng API tải video TikTok/Instagram không logo và dùng Vision LLM dịch ngược kịch bản thành Prompt AI.

---

### GIAI ĐOẠN 3: VOICE AI & HẠ TẦNG VẬN HÀNH ADMIN (SPRINT 05 & 06)

#### Sprint 05: Nhân Bản Giọng Nói (Voice Clone) & Music Studio
* **Mục tiêu:** Hoàn thiện trải nghiệm âm thanh cho video AI.
* **Nhiệm vụ cụ thể:**
  - `[EPIC-VOICE]` Tích hợp module Voice Cloning (trích xuất giọng mẫu 10s và đọc văn bản bất kỳ).
  - `[EPIC-VOICE]` Tích hợp Voice Changer và AI Music Generator tạo bài hát có lời.
  - `[EPIC-EDITOR]` Xây dựng trình ghép video cơ bản trên trình duyệt (ghép video, âm thanh, text phụ đề).

#### Sprint 06: Hệ Thống Quản Trị Vận Hành Cấp Cao (/admin Portal)
* **Mục tiêu:** Cung cấp đầy đủ công cụ kiểm soát cho ban quản trị.
* **Nhiệm vụ cụ thể:**
  - `[EPIC-ADMIN]` Xây dựng trang `/admin/service-models` cấu hình giá credits động.
  - `[EPIC-ADMIN]` Xây dựng `/admin/pool-manager` và `/admin/proxies` xoay vòng IP/Token.
  - `[EPIC-ADMIN]` Tích hợp bộ lọc kiểm duyệt ảnh/video nhạy cảm tự động (`/admin/nsfw-review`).
  - `[EPIC-ADMIN]` Bảng điều khiển tài chính, doanh thu theo ngày và tỷ lệ lỗi API key.

---

### GIAI ĐOẠN 4: SÀN GIAO DỊCH & NHƯỢNG QUYỀN B2B (SPRINT 07 & 08)

#### Sprint 07: Sàn Giao Dịch Creator Marketplace & Hệ Thống Affiliate
* **Mục tiêu:** Kích hoạt tính năng cộng đồng bán template và tiếp thị liên kết.
* **Nhiệm vụ cụ thể:**
  - `[EPIC-MARKETPLACE]` Cho phép Creator đăng bán Workflow/Prompt, cấu hình giá bán credits.
  - `[EPIC-MARKETPLACE]` Quy trình duyệt ứng dụng (`/admin/apps/approval`) và cơ chế rút tiền hoa hồng 80/20.
  - `[EPIC-AFFILIATE]` Hệ thống link giới thiệu (Referral link) tự động trích hoa hồng 10-20% cho đối tác khi người dùng nạp tiền.

#### Sprint 08: Hệ Thống Nhượng Quyền Đa Đại Lý (Franchise / Multi-Tenant)
* **Mục tiêu:** Thương mại hóa B2B cho các đại lý muốn sở hữu web AI riêng.
* **Nhiệm vụ cụ thể:**
  - `[EPIC-TENANT]` Kiến trúc Multi-tenant: Tách biệt dữ liệu người dùng của từng đại lý theo `tenantId`.
  - `[EPIC-TENANT]` Cho phép đại lý gắn Custom Domain (CNAME Cloudflare) và đổi Logo/Thương hiệu (`/tenant/branding`).
  - `[EPIC-TENANT]` Cho phép đại lý tự cấu hình bảng giá bán lẻ credits cho khách hàng của họ (`/tenant/pricing`).
  - `[EPIC-RELEASE]` Đóng gói phiên bản Production v1.0.0, thiết lập giám sát Datadog/Sentry và chạy thử nghiệm diện rộng.
