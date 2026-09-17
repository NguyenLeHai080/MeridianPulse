# Chiến Lược Phân Phối Nhánh (Branching Strategy)

Dự án **MeridianPulse** áp dụng mô hình Gitflow gồm 3 nhánh dài hạn (Long-lived branches) và 2 nhóm nhánh nhiệm vụ ngắn hạn (Task branches).

---

## 1. Ba Nhánh Dài Hạn (Main Branches)

| Tên Nhánh | Môi Trường Triển Khai | Mục Đích & Quyền Hạn | Cơ Chế Cập Nhật |
| :--- | :--- | :--- | :--- |
| **`prod`** | Production | Chứa mã nguồn thực thi ổn định cao nhất (99.99%). Bị khóa push trực tiếp. | Chỉ nhận merge từ **`staging`** sau khi UAT được phê duyệt, hoặc từ **`hotfix/*`** khi có sự cố khẩn cấp. Yêu cầu tối thiểu 2 approvals. |
| **`staging`** | Staging / QA / UAT | Môi trường kiểm thử chất lượng, test tích hợp, và demo cho Product Owner duyệt. | Nhận merge từ **`dev`** khi đóng gói bản build kiểm thử cuối Sprint, hoặc nhận sync từ **`prod`** sau hotfix. |
| **`dev`** | Development | Không gian làm việc chung của Developer. Nơi tổng hợp mã nguồn của tất cả tính năng trong Sprint. | Chỉ nhận mã nguồn thông qua **Pull Request (PR)** từ các nhánh `feat/*`. Nghiêm cấm push trực tiếp. |

---

## 2. Các Nhánh Hỗ Trợ Tạm Thời (Temporary Task Branches)

| Nhánh | Nhánh Gốc (Base) | Nhánh Đích (Merge Into) | Định Dạng Tên | Vòng Đời |
| :--- | :--- | :--- | :--- | :--- |
| **Feature** | `dev` | `dev` | `feat/<issue_id>-<feature_name>` hoặc `feat/<feature_name>`<br>*Ví dụ:* `feat/MP-01-homepage`, `feat/login_page` | Xóa nhánh remote sau khi merge thành công vào `dev`. |
| **Hotfix** | `prod` | `prod` (rồi sync `staging`, `dev`) | `hotfix/<issue_id>-<hotfix_name>` hoặc `hotfix/<hotfix_name>`<br>*Ví dụ:* `hotfix/MP-99-fix_pulse_stream` | Xóa nhánh remote sau khi đã merge vào `prod` và đồng bộ xong. |

---

## 3. Quy Tắc Chuyển Giao Môi Trường (Promotion Lifecycle)

```text
[feat/*] ---> (PR) ---> [dev] ---> (QA Build) ---> [staging] ---> (UAT & Demo OK) ---> [prod]
```

1. **Phát triển tính năng:** Developer tạo nhánh `feat/MP-xx` từ `dev`, hoàn thành tính năng, mở PR vào `dev`.
2. **Đóng gói kiểm thử:** Cuối Sprint, merge `dev` vào `staging` để đội ngũ QA/QC và Product Owner nghiệm thu.
3. **Phát hành Production:** Khi toàn bộ Acceptance Criteria pass, merge `staging` vào `prod` và tạo Git Tag (Ví dụ: `v1.0.0`).
