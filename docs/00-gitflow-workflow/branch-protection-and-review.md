# Hướng Dẫn Khóa Nhánh (Branch Protection) & Code Review

Tài liệu này hướng dẫn thiết lập cơ chế bảo vệ nhánh trên GitHub repository và quy chuẩn đánh giá mã nguồn (Pull Request Code Review) cho dự án **MeridianPulse**.

---

## 1. Mục Đích & Nguyên Tắc Bảo Vệ Nhánh

Hai nhánh sau **bắt buộc phải kích hoạt cơ chế Branch Protection Rule trên GitHub**:
1. **`prod`**: Tuyệt đối không cho phép direct push. Mọi thay đổi đều phải qua Pull Request với tối thiểu 2 người phê duyệt (Product Owner + Lead Engineer).
2. **`staging`**: Tuyệt đối không cho phép direct push. Mọi tính năng chuyển từ `dev` sang đều phải qua PR và có approval từ QA Lead.

---

## 2. Hướng Dẫn Cấu Hình Trên GitHub

1. Truy cập `https://github.com/NguyenLeHai080/MeridianPulse` ➔ **Settings** ➔ **Branches**.
2. Nhấp **Add branch protection rule**:
   - **Branch name pattern:** `prod`
   - [x] **Require a pull request before merging** (Yêu cầu tối thiểu 2 approvals).
   - [x] **Require status checks to pass before merging** (Linting, Tests).
   - [x] **Do not allow bypassing the above settings** (Áp dụng cho cả admin).
3. Thiết lập tương tự cho pattern `staging` với tối thiểu 1 approval.

---

## 3. Checklist Khi Tạo & Review Pull Request (PR)

- [ ] Tên nhánh đúng chuẩn: `feat/<issue_id>-<name>` hoặc `hotfix/<issue_id>-<name>`.
- [ ] Tất cả commit đều có mã Issue ID (`#MP-xx`).
- [ ] Đã điền đầy đủ mẫu PR Template tại [.github/pull_request_template.md](file:///e:/Projects/MeridianPulse/.github/pull_request_template.md).
- [ ] Đã giải quyết đúng các tiêu chí nghiệm thu (Acceptance Criteria) của User Story.
- [ ] Không để lộ thông tin nhạy cảm (JWT Secret, API Key, thông tin cá nhân bệnh nhân).
