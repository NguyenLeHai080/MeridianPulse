# Bộ Hồ Sơ Kiến Trúc & Kế Hoạch Xây Dựng Nền Tảng Generative AI Creator (Tương Đương PlenxAI 100%)

Bộ tài liệu này chứa toàn bộ bản thiết kế hệ thống (Architectural Blueprint), đặc tả tính năng kỹ thuật, mô hình kinh tế Credits/Nhượng quyền và lộ trình phát triển Scrum 8 Sprints chi tiết để xây dựng một nền tảng tạo sinh nội dung AI hoàn chỉnh.

---

## 📑 Danh Mục Hồ Sơ Bản Vẽ Kỹ Thuật

| Thứ Tự | Tài Liệu Chi Tiết | Trọng Tâm Nghiệp Vụ & Kỹ Thuật |
| :---: | :--- | :--- |
| **01** | [01-system-architecture.md](01-system-architecture.md) | **Kiến Trúc Kỹ Thuật & Hạ Tầng:** Sơ đồ C4 Container, giải quyết 3 bài toán nghẽn cổ chai (Tích hợp Upstream AI, Hàng đợi BullMQ/Redis, Hệ thống Proxy Farm & Giải Captcha tự động). |
| **02** | [02-core-features-spec.md](02-core-features-spec.md) | **Đặc Tả Tính Năng Cốt Lõi:** Video Studio (Veo 3, Kling Motion, Motion Brush), Dance Studio, Bộ Fast Apps E-commerce (Product TVC, Gacha KOLs, Food Creator, Interior Design), Voice Clone và TikTok/Reels Scraper. |
| **03** | [03-business-and-monetization.md](03-business-and-monetization.md) | **Mô Hình Kinh Doanh & Tài Chính:** Công thức định giá Credits đảm bảo biên lợi nhuận > 60%, các gói thuê bao MRR, sàn giao dịch Marketplace chia sẻ doanh thu 80/20, và mô hình nhượng quyền đại lý B2B (Franchise White-label). |
| **04** | [04-admin-operations.md](04-admin-operations.md) | **Cẩm Nang Vận Hành Trang Quản Trị (/admin):** Quản lý Service Models, Pool Manager xoay vòng token, Proxy Manager, bộ lọc kiểm duyệt nội dung nhạy cảm tự động (NSFW review) và cổng đối soát thanh toán. |
| **05** | [05-scrum-implementation-roadmap.md](05-scrum-implementation-roadmap.md) | **Lộ Trình Phát Triển Thực Tế (8 Sprints):** Kế hoạch hành động 4 tháng chia làm 4 giai đoạn rõ ràng từ MVP đến nền tảng nhượng quyền quy mô lớn. |

---

## 🎯 3 Yếu Tố Quyết Định Thành Bại Khi Xây Dựng Nền Tảng Này
1. **Kiểm soát chi phí hạ tầng:** Bắt buộc dùng Cloudflare R2 (không tốn phí băng thông tải video) và kết hợp ComfyUI RunningHub cho các tính năng e-commerce để giảm 70% chi phí so với gọi API thương mại thuần túy.
2. **Cơ chế hàng đợi bất đồng bộ (Queue):** Không bao giờ để người dùng chờ HTTP response trực tiếp. Mọi tác vụ video/ảnh phải qua BullMQ + WebSocket event.
3. **Mô hình kinh doanh B2B Franchise:** Doanh thu bền vững nhất không chỉ đến từ người dùng lẻ B2C nạp tiền mà đến từ việc bán giải pháp trọn gói (White-label) cho các Marketing Agency và Studio truyền thông.
