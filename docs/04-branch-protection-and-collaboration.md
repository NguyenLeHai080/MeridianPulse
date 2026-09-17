# Hướng Dẫn Cấu Hình Khóa Nhánh (Branch Protection) & Quy Chuẩn Đánh Giá Code (Code Review)

Tài liệu này hướng dẫn thiết lập cơ chế bảo vệ nhánh trên GitHub repository và quy chuẩn đánh giá mã nguồn (Pull Request Code Review) cho dự án **MeridianPulse**.

---

## 1. Mục Đích & Nguyên Tắc Bảo Vệ Nhánh

Nhằm ngăn chặn việc vô tình hoặc cố ý đẩy code lỗi lên các môi trường quan trọng, hai nhánh sau **bắt buộc phải kích hoạt cơ chế Branch Protection Rule**:
1. **`prod`**: Tuyệt đối không cho phép direct push. Mọi thay đổi đều phải qua Pull Request với tối thiểu 2 người phê duyệt (Product Owner + Lead Engineer).
2. **`staging`**: Tuyệt đối không cho phép direct push. Mọi tính năng chuyển từ `dev` sang đều phải được kiểm tra qua PR.

---

## 2. Các Bước Cấu Hình Branch Protection Rules Trên GitHub

### Bước 1: Truy cập Cấu hình Repository
1. Mở trang dự án trên GitHub: `https://github.com/NguyenLeHai080/MeridianPulse`
2. Chọn tab **Settings** -> Mục **Branches** ở thanh menu bên trái.
3. Nhấp nút **Add branch protection rule**.

### Bước 2: Thiết lập quy tắc cho nhánh `prod`
- **Branch name pattern:** Điền `prod`
- Kích hoạt các tùy chọn sau:
  - [x] **Require a pull request before merging:**
    - *Required approvals:* Chọn `2` (hoặc tối thiểu `1` với team nhỏ).
    - [x] *Dismiss stale pull request approvals when new commits are pushed* (Tự động hủy approve cũ nếu dev push thêm commit mới).
    - [x] *Require review from Code Owners* (nếu có file `CODEOWNERS`).
  - [x] **Require status checks to pass before merging:**
    - [x] *Require branches to be up to date before merging*.
    - Chọn các job CI: Linting, Unit Testing, Security Audit.
  - [x] **Do not allow bypassing the above settings:** Áp dụng cả đối với Administrators để ngăn việc vô ý force push.
  - [x] **Restrict who can push to matching branches:** Chỉ định bot CI/CD hoặc Release Manager.
- Nhấp **Create / Save changes**.

### Bước 3: Thiết lập quy tắc tương tự cho nhánh `staging`
- **Branch name pattern:** Điền `staging`
- Yêu cầu tối thiểu `1` approval từ QA/QC Lead hoặc Developer trước khi merge `dev` vào `staging`.

---

## 3. Checklist Khi Tạo & Review Pull Request (PR)

### 3.1. Đối với Tác giả PR (Developer mở PR)
Trước khi gửi PR cho đồng đội review, tác giả cần kiểm tra:
- [ ] Tên nhánh tuân thủ định dạng: `feat/<issue_id>-<name>` hoặc `hotfix/<issue_id>-<name>`.
- [ ] Toàn bộ commit trong nhánh đều có mã Issue ID (VD: `#MP-01`).
- [ ] PR Template đã được điền đầy đủ (mục tiêu, phạm vi thay đổi, bằng chứng kiểm thử ảnh/video).
- [ ] Mã nguồn đã tự kiểm tra (Self-reviewed) tại tab "Files changed" để loại bỏ `console.log`, file rác, comment thừa.
- [ ] Không có xung đột (No merge conflicts) với nhánh gốc `dev`.

### 3.2. Đối với Người Đánh Giá (Reviewer)
Khi thực hiện review một PR:
- [ ] **Tính đúng đắn nghiệp vụ:** Mã nguồn có giải quyết đúng tiêu chuẩn chấp nhận (Acceptance Criteria) trong User Story của Issue ID tương ứng không?
- [ ] **Kiến trúc & Cấu trúc:** Mã nguồn có tuân thủ cấu trúc thư mục (`fe/` cho giao diện, `be/` cho nghiệp vụ backend)?
- [ ] **Bảo mật:** Không để lộ mật khẩu, API key, JWT secret, hoặc thông tin nhạy cảm của bệnh nhân trong commit.
- [ ] **Hiệu năng & Tối ưu:** Không tạo các vòng lặp vô tận, rò rỉ bộ nhớ (memory leaks) khi lắng nghe WebSocket nhịp tim.
- [ ] **Quyết định phê duyệt:**
  - Nếu cần chỉnh sửa: Chọn **Request changes** và ghi rõ dòng code cần tối ưu kèm giải pháp gợi ý.
  - Nếu đạt chất lượng: Chọn **Approve** và để lại lời khen ngợi (VD: "LGTM! Approved.").
