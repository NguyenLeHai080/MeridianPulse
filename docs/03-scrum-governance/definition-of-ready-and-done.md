# Tiêu Chuẩn Sẵn Sàng (DoR) và Tiêu Chuẩn Hoàn Thành (DoD)

---

## 1. Definition of Ready (DoR) - Tiêu Chuẩn Đưa Vào Sprint

Một User Story chỉ được phép kéo vào Sprint Backlog khi thỏa mãn đầy đủ các điều kiện:

- [x] **Cấu trúc chuẩn:** Được viết theo mẫu `As a [Role], I want [Feature], So that [Benefit]`.
- [x] **Tiêu chuẩn chấp nhận:** Có kịch bản kiểm thử rõ ràng theo định dạng `Given - When - Then`.
- [x] **UI/UX:** Có thiết kế giao diện hoặc wireframe đối với task Frontend.
- [x] **Làm rõ kỹ thuật:** Đã được PO và Tech Lead thống nhất phạm vi và kiến trúc.
- [x] **Ước lượng độ phức tạp:** Đã chấm điểm Story Points (tối đa 8 điểm/story; nếu 13 điểm thì phải tách nhỏ).
- [x] **Mã định danh:** Đã tạo mã **Issue ID** (`#MP-xx`) trên hệ thống quản lý task.

---

## 2. Definition of Done (DoD) - Tiêu Chuẩn Hoàn Thành

Một User Story chỉ được chuyển sang cột **DONE** khi:

- [x] **Mã nguồn:** Đã lập trình hoàn chỉnh và tuân thủ Coding Standards dự án.
- [x] **Kiểm thử:** Đã viết Unit Tests và toàn bộ tests chạy thành công 100%.
- [x] **Quy chuẩn commit:** Toàn bộ commit message đều có mã Issue ID hợp lệ (`feat: ... #MP-xx`).
- [x] **Code Review:** Pull Request mở vào nhánh `dev` và có tối thiểu 1 Tech Lead / Peer Reviewer **Approved**.
- [x] **Tích hợp sạch:** Nhánh `dev` merge thành công, không có xung đột (Clean Merge).
- [x] **Kiểm thử môi trường:** Đã deploy và kiểm thử QA/QC thành công trên môi trường **Staging**.
- [x] **Tài liệu:** Đã cập nhật tài liệu kỹ thuật, Swagger API hoặc hướng dẫn sử dụng nếu có thay đổi.
