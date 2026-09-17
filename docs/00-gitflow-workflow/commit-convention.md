# Quy Chuẩn Commit Message Đi Kèm Issue ID

Mọi commit đẩy lên repository **bắt buộc phải tuân thủ chuẩn Conventional Commits và có mã Issue ID** để tự động liên kết với hệ thống Scrum/Jira/GitHub Issues.

---

## 1. Cú Pháp Bắt Buộc

```text
<type>(<scope>): <mô tả ngắn gọn bằng thể chủ động> #<id_issue>

[Tùy chọn: Body - Mô tả chi tiết lý do và giải pháp kỹ thuật]

[Tùy chọn: Footer - BREAKING CHANGE hoặc Tham chiếu chéo]
```

---

## 2. Danh Sách Các Type Hợp Lệ

| Type | Ý Nghĩa Sử Dụng | Ví Dụ |
| :--- | :--- | :--- |
| `feat` | Thêm tính năng mới cho người dùng | `feat: add live ECG pulse chart #MP-01` |
| `fix` | Sửa lỗi hệ thống | `fix: resolve systolic blood pressure validation #MP-05` |
| `hotfix` | Vá lỗi khẩn cấp trên Production | `hotfix: resolve live telemetry pulse disconnection #MP-99` |
| `docs` | Thêm hoặc sửa tài liệu kỹ thuật | `docs: update sprint backlog story points #MP-00` |
| `style` | Định dạng code (whitespace, format) không đổi logic | `style: format css grid styles in dashboard #MP-01` |
| `refactor` | Tái cấu trúc code (không đổi tính năng, không sửa bug) | `refactor: extract websocket reconnection hook #MP-03` |
| `test` | Thêm hoặc sửa Unit / Integration tests | `test: add unit test for patient vitals validator #MP-02` |
| `chore` | Cập nhật cấu hình build, CI/CD, dependencies | `chore: configure git commit hook validator #MP-00` |

---

## 3. Git Hook Kiểm Tra Tự Động

Repository đã tích hợp sẵn script hook kiểm tra tại [.githooks/commit-msg](file:///e:/Projects/MeridianPulse/.githooks/commit-msg).  
Nếu commit message không có mã Issue ID (ví dụ: `add homepage layout`), Git sẽ **tự động từ chối commit** và in ra cảnh báo kèm mẫu cú pháp đúng.
