# Quy Trình Xử Lý Sự Cố Khẩn Cấp & Đồng Bộ 3 Chiều (Hotfix Workflow)

Khi phát sinh lỗi nghiêm trọng ảnh hưởng trực tiếp đến người dùng trên Production (gián đoạn tín hiệu nhịp tim, sập kết nối WebSocket, rò rỉ dữ liệu y tế):

```text
               +--------------------------------------------------------+
               |                       [prod]                           |
               +---------------------------+----------------------------+
                                           | (Tạo nhánh khẩn cấp)
                                           v
                             +---------------------------+
                             | hotfix/fix_pulse_stream   | (Sửa lỗi & Kiểm thử)
                             +-------------+-------------+
                                           |
                   +-----------------------+-----------------------+
                   | (PR & Merge)          | (Sync)                | (Sync)
                   v                       v                       v
               +-------+              +---------+              +-------+
               | prod  |              | staging |              |  dev  |
               +-------+              +---------+              +-------+
```

---

## 1. Các Bước Thực Hiện Chi Tiết

### Bước 1: Rẽ nhánh hotfix từ `prod`
```bash
git switch prod
git pull origin prod
git switch -c hotfix/MP-99-fix-pulse-stream
```

### Bước 2: Sửa lỗi và commit kèm Issue ID
```bash
git commit -am "fix: resolve telemetry pulse alert threshold error #MP-99"
```

### Bước 3: Mở PR vào `prod` và phê duyệt khẩn cấp
- Đẩy nhánh lên GitHub: `git push -u origin hotfix/MP-99-fix-pulse-stream`
- Mở PR từ nhánh hotfix vào **`prod`**.
- Lead Engineer phê duyệt và thực hiện merge vào `prod`. Đánh tag phiên bản vá lỗi (VD: `v1.0.1`).

### Bước 4: Bắt buộc đồng bộ 3 chiều (3-Way Synchronization)
*Lưu ý quan trọng:* Lỗi đã sửa trên `prod` phải được đồng bộ ngay lập tức vào `staging` và `dev` để tránh việc đợt release tiếp theo ghi đè lại bug cũ!

```bash
# 1. Đồng bộ vào staging
git switch staging
git pull origin staging
git merge prod -m "Merge branch 'prod' into staging (Sync hotfix #MP-99)"
git push origin staging

# 2. Đồng bộ vào dev
git switch dev
git pull origin dev
git merge staging -m "Merge branch 'staging' into dev (Sync hotfix #MP-99)"
git push origin dev
```

### Bước 5: Dọn dẹp nhánh
```bash
git branch -d hotfix/MP-99-fix-pulse-stream
git push origin --delete hotfix/MP-99-fix-pulse-stream
```
