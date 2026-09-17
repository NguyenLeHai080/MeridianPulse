# Đặc Tả Tính Năng Cốt Lõi Nền Tảng AI Creator (Core Features Specification)

Tài liệu này đặc tả chi tiết các phân hệ tính năng người dùng (Studios & Fast Apps) cần xây dựng để đạt năng lực tương đương 100% nền tảng **PlenxAI**.

---

## 1. Phân Hệ AI Video Studio (Trọng Tâm Của Nền Tảng)

### 1.1. Trình Tạo Video Đa Mô Hình (Multi-Model Video Generator)
* **Các chế độ đầu vào:**
  - **Text-to-Video (T2V):** Sinh video từ câu lệnh văn bản mô tả bối cảnh, ánh sáng, góc máy.
  - **Image-to-Video (I2V):** Đưa vào ảnh tĩnh (nhân vật, sản phẩm), AI tạo chuyển động tự nhiên.
* **Hỗ trợ đa model:**
  - `Google Veo 3 / 3.1`: Chất lượng điện ảnh 1080p, bối cảnh vật lý chân thực.
  - `Kling AI (v1.5 / v2.0)`: Tối ưu cho chuyển động phức tạp của con người và võ thuật.
  - `Minimax / Hailuo`: Tốc độ sinh siêu nhanh, chi phí credits thấp hơn.
* **Điều khiển chuyển động nâng cao (Motion Control):**
  - **Camera Motion:** Zoom in/out, Pan left/right, Tilt up/down, Roll, Orbit quay vòng.
  - **Motion Brush (Bút vẽ chuyển động):** Cho phép người dùng tô cọ lên vùng mong muốn (ví dụ: chỉ tô lên dòng nước chảy hoặc mái tóc bay) và đặt hướng vector chuyển động.

### 1.2. AI Dance Studio (`/apps/see-dance-studio`)
* **Nguyên lý hoạt động:** Nhận diện khung xương chuyển động (Pose Estimation / OpenPose hoặc AnimateDiff).
* **Luồng người dùng:**
  1. Người dùng chọn một bài nhảy mẫu từ thư viện (See Dance Templates).
  2. Tải lên ảnh chân dung toàn thân của chính mình hoặc nhân vật AI.
  3. Hệ thống render video nhân vật nhảy theo đúng vũ đạo và khớp nhịp điệu bài nhạc.

---

## 2. Phân Hệ Fast Apps & E-Commerce Creator (Bộ Công Cụ Cho Nhà Bán Hàng)

Nhóm công cụ này là "con gà đẻ trứng vàng" giúp thu hút các chủ shop online, nhãn hàng thời trang và agency quảng cáo:

| Tên Ứng Dụng Nhanh | Mục Đích Sử Dụng | Công Nghệ AI Sử Dụng |
| :--- | :--- | :--- |
| **Product TVC (`/apps/product-tvc`)** | Tải lên 1 ảnh chai nước hoa/đôi giày ➔ AI tự động ghép vào bối cảnh 3D sang trọng và quay video quảng cáo 5s. | ComfyUI Inpaint + Kling I2V |
| **Gacha KOLs (`/admin/apps/gacha-kols`)** | Tạo người mẫu AI mang nét mặt châu Á/Âu mặc trang phục của shop ➔ Tiết kiệm chi phí thuê mẫu ảnh thật. | Flux LoRA + FaceID / IP-Adapter |
| **Food Creator** | Chụp ảnh món ăn thô ➔ AI biến thành đĩa thức ăn phong cách nhà hàng Michelin bốc khói nghi ngút. | Stable Diffusion Inpainting |
| **Interior Design** | Chụp căn phòng trống hoặc nhà cũ ➔ AI dàn dựng lại theo phong cách Bắc Âu, Tối giản, Hiện đại. | ControlNet Depth & Segments |
| **Storyboard Studio** | Nhập kịch bản phân cảnh ➔ AI vẽ chuỗi tranh minh họa (Shot 1, Shot 2, Shot 3) cho đạo diễn. | LLM kịch bản + Flux Consistency |

---

## 3. Phân Hệ Voice & Audio Studio

1. **Nhân Bản Giọng Nói (Voice Cloning - `/voice/clone`):**
   - Tải lên đoạn ghi âm giọng nói mẫu từ 5 đến 15 giây.
   - Hệ thống trích xuất vector âm sắc (Voice Embedding) bằng mô hình F5-TTS hoặc CosyVoice.
   - Nhập văn bản bất kỳ để tạo giọng đọc tự nhiên, giữ nguyên ngữ điệu gốc.
2. **Biến Đổi Giọng Nói (Voice Changer - `/voice/changer`):**
   - Tải file âm thanh lên và chuyển thành giọng trẻ em, người già, giọng trầm MC hoặc robot.
3. **Music Studio (`/apps/music-studio`):**
   - Nhập thể loại nhạc (Pop, EDM, Lo-fi, Cinematic) và chủ đề lời bài hát ➔ Sinh bài hát hoàn chỉnh gồm beat và vocal.

---

## 4. Phân Hệ Social Scraper & Reverse Engineering (Cào Video TikTok / Reels)

PlenxAI sở hữu tính năng cào nội dung từ TikTok và Instagram (`/tiktok/video`, `/tiktok/batch`):
* **Bài toán nghiệp vụ:** Người làm sáng tạo nội dung muốn "bắt trend" video đang thịnh hành.
* **Quy trình hoạt động:**
  1. Người dùng dán link video TikTok hoặc Instagram Reels.
  2. Hệ thống tải video gốc không dính watermark (No-watermark video).
  3. Đưa khung hình vào **Vision LLM (Gemini 1.5 Flash / GPT-4o)** để phân tích:
     - Tóm tắt kịch bản video.
     - Tự động dịch ngược thành câu lệnh Prompt tối ưu (Reverse Prompting).
  4. Đưa prompt vừa tạo sang Video Studio để tái tạo phiên bản AI mới mang phong cách của người dùng chỉ bằng 1 cú nhấp chuột.
