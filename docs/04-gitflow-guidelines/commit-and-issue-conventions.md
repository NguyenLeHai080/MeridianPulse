# Quy Chuẩn Commit Message & Liên Kết Issue ID

---

## 1. Cú Pháp Bắt Buộc

```text
<type>(<scope>): <mô tả ngắn gọn> #<id_issue>
```

- **Ví dụ hợp lệ:**
  - `feat: add homepage dashboard #MP-01`
  - `feat(auth): implement jwt refresh token logic #MP-02`
  - `fix: resolve live telemetry pulse disconnection #MP-99`
  - `docs: update master product backlog #MP-00`

---

## 2. Các Type Hợp Lệ

| Type | Ý Nghĩa | Ví Dụ |
| :--- | :--- | :--- |
| `feat` | Tính năng mới | `feat: add real-time ecg pulse monitor #MP-01` |
| `fix` | Sửa lỗi | `fix: resolve systolic pressure validation #MP-05` |
| `hotfix` | Vá lỗi khẩn cấp Production | `hotfix: fix critical pulse stream error #MP-99` |
| `docs` | Thêm/sửa tài liệu | `docs: update scrum sprint backlog #MP-00` |
| `refactor` | Tái cấu trúc mã nguồn | `refactor: modularize business specifications #MP-00` |
| `test` | Thêm/sửa kiểm thử | `test: add unit test for vital threshold validator #MP-04` |
| `chore` | Cấu hình build/dependencies | `chore: sync hotfix from staging to dev #MP-99` |

---

## 3. Git Hook Kiểm Tra Tự Động

Repository đã tích hợp sẵn script hook kiểm tra tại [.githooks/commit-msg](../../.githooks/commit-msg).  
Nếu commit message không có mã Issue ID (ví dụ: `add homepage layout`), Git sẽ **tự động từ chối commit** và in ra cảnh báo kèm mẫu cú pháp đúng.
