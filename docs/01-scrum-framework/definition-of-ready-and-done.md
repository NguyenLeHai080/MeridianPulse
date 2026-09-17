# Tiêu Chuẩn Sẵn Sàng (DoR) và Tiêu Chuẩn Hoàn Thành (DoD)

---

## 1. Definition of Ready (DoR) - Điều Kiện Kéo Vào Sprint

Một User Story chỉ được phép đưa vào Sprint Backlog khi thỏa mãn đầy đủ các điều kiện:

- [x] Được viết đúng cấu trúc tiêu chuẩn: `As a [Role], I want [Feature], So that [Benefit]`.
- [x] Có Tiêu chuẩn chấp nhận (Acceptance Criteria) cụ thể theo định dạng `Given - When - Then`.
- [x] Có thiết kế giao diện UI/UX hoặc wireframe (với task frontend).
- [x] Đã được PO và Tech Lead làm rõ yêu cầu nghiệp vụ và kiến trúc kỹ thuật.
- [x] Đã được ước lượng Story Points (tối đa 8 điểm/story).
- [x] Đã được tạo mã **Issue ID** (`#MP-xx`) trên hệ thống quản lý công việc.

---

## 2. Definition of Done (DoD) - Điều Kiện Hoàn Thành

Một User Story chỉ được chuyển sang trạng thái **DONE** khi:

- [x] Mã nguồn đã hoàn thành và tuân thủ Coding Conventions dự án.
- [x] Đã viết Unit Tests và toàn bộ tests chạy thành công 100%.
- [x] Toàn bộ commit message đều có mã Issue ID (`feat: ... #MP-xx`).
- [x] Pull Request được mở vào nhánh `dev` và có tối thiểu 1 Tech Lead / Peer Reviewer phê duyệt (**Approved**).
- [x] Nhánh `dev` được merge thành công, không có xung đột (Clean merge).
- [x] Mã nguồn đã được triển khai và kiểm thử QA/QC thành công trên môi trường **Staging**.
- [x] Tài liệu nghiệp vụ, tài liệu API đã được cập nhật tương ứng.
