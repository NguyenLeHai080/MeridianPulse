# Ma Trận Tích Hợp Kỹ Thuật (Scrum-to-Gitflow Matrix)

Bảng đối chiếu chuẩn hóa sự tương ứng giữa các thực thể trong Scrum và các thành phần trong hệ thống Gitflow của dự án **MeridianPulse**:

---

| Thực Thể Scrum | Thành Phần Git / GitHub | Quy Ước Đặt Tên & Cú Pháp Chuẩn |
| :--- | :--- | :--- |
| **Product Backlog Item** | GitHub Issue / User Story | Mã định danh: `#MP-01`, `#MP-02`, `#MP-03` |
| **Nhánh Tính Năng (Task)** | Git Branch từ `dev` | `feat/MP-01-homepage-dashboard`<br>`feat/MP-02-auth-rbac` |
| **Commit Của Developer** | Git Commit Message | `feat: implement vital pulse chart component #MP-01`<br>`fix: correct systolic pressure validation #MP-05` |
| **Đánh Giá & Phê Duyệt** | Pull Request vào `dev` | Tiêu đề: `[#MP-01] Xây dựng Homepage Dashboard`<br>Nội dung có: `Closes #MP-01` |
| **Đóng Gói Kiểm Thử (QA)** | Merge PR `dev` -> `staging` | Tiêu đề: `Release Candidate RC-Sprint-01 Build #01` |
| **Phát Hành Sprint (Demo OK)** | Merge PR `staging` -> `prod` | Git Tag phiên bản: `v1.0.0`, `v1.1.0` |
| **Sự Cố Khẩn Cấp (Hotfix)** | Git Branch từ `prod` | `hotfix/MP-99-telemetry-disconnect`<br>Commit: `hotfix: fix socket disconnect #MP-99` |

---

## Luồng Chuyển Đổi Trạng Thái Trên Bảng Sprint (Kanban / Sprint Board)

```text
[Backlog] ──► [To Do] ──► [In Progress] ──► [Code Review / PR] ──► [QA / Staging] ──► [Done]
```

1. **To Do ➔ In Progress:** Developer tự gán Issue `#MP-xx`, tạo nhánh `feat/MP-xx` từ `dev`.
2. **In Progress ➔ Code Review:** Push code, mở PR vào `dev`, đính kèm link PR vào Issue.
3. **Code Review ➔ QA / Staging:** PR được approve và merge vào `dev`. Deploy lên `staging` để QA kiểm thử.
4. **QA / Staging ➔ Done:** QA xác nhận pass tiêu chí nghiệm thu. PO nghiệm thu đóng Issue.
