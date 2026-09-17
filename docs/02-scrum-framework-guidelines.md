# Hướng Dẫn Vận Hành Khung Scrum & Tích Hợp Gitflow Dự Án MeridianPulse

Tài liệu này chuẩn hóa quy trình phát triển phần mềm theo phương pháp Agile/Scrum áp dụng cho toàn bộ dự án **MeridianPulse**, đồng thời hướng dẫn tích hợp chặt chẽ giữa các sự kiện Scrum với luồng mã nguồn Gitflow.

---

## 1. Cơ Cấu Tổ Chức Đội Ngũ Scrum (Scrum Team Roles)

```text
+-------------------+      +--------------------+      +--------------------+
|   Product Owner   | <--> |    Scrum Master    | <--> |  Development Team  |
| (Nghiệp vụ & PO)  |      | (Quy trình & Agile)|      | (FE, BE, QA/QC, DE)|
+-------------------+      +--------------------+      +--------------------+
```

1. **Product Owner (PO):**
   - Định nghĩa Product Vision và mục tiêu dự án (Sprint Goal).
   - Quản lý và sắp xếp thứ tự ưu tiên của **Product Backlog**.
   - Quyết định nghiệm thu User Story (Acceptance) dựa trên Definition of Done.
2. **Scrum Master (SM):**
   - Đảm bảo toàn đội tuân thủ quy trình Scrum và Gitflow.
   - Loại bỏ rào cản (impediments), tối ưu hóa velocity của sprint.
   - Điều phối các buổi họp Scrum.
3. **Development Team (Cross-functional):**
   - Gồm Frontend Engineer (`fe/`), Backend Engineer (`be/`), QA/QC Engineer, DevOps.
   - Ước lượng độ phức tạp (Story Points bằng Planning Poker).
   - Chịu trách nhiệm trực tiếp viết mã nguồn, viết test, mở PR và bảo đảm chất lượng.

---

## 2. Chu Kỳ Sprint & Các Sự Kiện Scrum (Scrum Events)

Dự án áp dụng chu kỳ Sprint tiêu chuẩn **2 tuần (10 ngày làm việc)**.

```text
[Sprint Planning] 
      |
      v
[Sprint Backlog Active] ---> [Daily Scrum 15'] ---> [Phát triển: feat/* -> dev]
      |
      v (Ngày cuối Sprint)
[Sprint Review / Demo on Staging] 
      |
      v
[Sprint Retrospective]
```

### 2.1. Sprint Planning (Đầu Sprint - 2 đến 3 tiếng)
- PO trình bày các User Story có độ ưu tiên cao nhất trong Product Backlog.
- Đội ngũ thảo luận yêu cầu nghiệp vụ, tiêu chuẩn chấp nhận (Acceptance Criteria).
- Đội ngũ chấm điểm Story Points (theo dãy Fibonacci: 1, 2, 3, 5, 8, 13).
- Phân rã User Story thành các Technical Tasks cụ thể và gắn mã **Issue ID** (`#MP-xx`).

### 2.2. Daily Scrum (Hàng ngày - 15 phút)
Từng thành viên trả lời 3 câu hỏi:
1. *Hôm qua tôi đã làm gì để giúp đội đạt được Sprint Goal?* (Commit & PR nào đã mở/merge?)
2. *Hôm nay tôi sẽ làm gì?* (Đang làm nhánh `feat/MP-xx` nào?)
3. *Tôi có gặp khó khăn/vướng mắc nào không?* (Blocker kỹ thuật, conflict Git, đợi review PR?)

### 2.3. Sprint Review & Demo (Cuối Sprint - 1 tiếng)
- Đội ngũ demo các tính năng đã hoàn thành trực tiếp trên môi trường **Staging**.
- PO và stakeholders đánh giá mức độ đáp ứng yêu cầu và quyết định phát hành (Release lên **Prod**).

### 2.4. Sprint Retrospective (Cuối Sprint - 45 phút)
- Tổng kết Sprint: *Điều gì đã làm tốt? Điều gì chưa tốt? Hành động cải tiến (Action Items) cho Sprint tiếp theo?*
- Đánh giá chất lượng code, tỷ lệ merge conflicts, thời gian review PR.

---

## 3. Tiêu Chuẩn Sẵn Sàng (DoR) và Tiêu Chuẩn Hoàn Thành (DoD)

### 3.1. Definition of Ready (DoR) - Điều kiện để User Story được đưa vào Sprint
Một User Story chỉ được kéo vào Sprint Backlog khi thỏa mãn:
- [x] Được viết theo đúng cấu trúc: `As a [Role], I want [Feature], So that [Benefit]`.
- [x] Có Tiêu chuẩn chấp nhận (Acceptance Criteria) rõ ràng theo định dạng Given-When-Then.
- [x] Đã có thiết kế UI/UX hoặc wireframe (đối với tính năng frontend).
- [x] Đã được PO và Tech Lead làm rõ ràng về mặt nghiệp vụ & kiến trúc.
- [x] Đã được team ước lượng Story Points (không vượt quá 8 điểm; nếu 13 điểm thì phải phân tách).
- [x] Đã được tạo Issue ID trên hệ thống quản lý task (GitHub Issues / Jira).

### 3.2. Definition of Done (DoD) - Điều kiện để hoàn thành User Story
Một User Story chỉ được chuyển sang cột **DONE** khi:
- [x] Mã nguồn đã hoàn thành và tuân thủ Coding Conventions.
- [x] Đã có Unit Tests và toàn bộ tests chạy thành công (Pass 100%).
- [x] Pull Request (PR) được mở vào nhánh `dev`, có kèm liên kết mã Issue ID.
- [x] Tối thiểu 1 thành viên (Peer Reviewer) hoặc Tech Lead đã Review và **Approve**.
- [x] Nhánh `dev` đã được merge sạch sẽ (không conflict).
- [x] Mã nguồn đã được triển khai và kiểm thử QA thành công trên môi trường **Staging**.
- [x] Tài liệu API / Swagger / User Guide đã được cập nhật nếu có thay đổi.

---

## 4. Ma Trận Tích Hợp Giữa Scrum và Gitflow (Scrum-to-Gitflow Mapping)

| Thành phần Scrum | Thực Thể Git / GitHub | Quy Ước Đặt Tên & Cú Pháp |
| :--- | :--- | :--- |
| **Product Backlog Item** | GitHub Issue / User Story | `#MP-01`, `#MP-02`, `#MP-03` |
| **Nhánh Tính Năng (Task)** | Git Branch từ `dev` | `feat/MP-01-homepage-dashboard`<br>`feat/MP-02-auth-jwt` |
| **Commit của Developer** | Git Commit Message | `feat: implement vital pulse chart component #MP-01`<br>`fix: correct systolic pressure validation #MP-05` |
| **Đánh Giá & Phê Duyệt** | Pull Request vào `dev` | Tiêu đề: `[#MP-01] Xây dựng Homepage Dashboard`<br>Nội dung có: `Closes #MP-01` |
| **Đóng Gói Kiểm Thử (QA)** | Merge PR `dev` -> `staging` | Tiêu đề: `Release Candidate RC-Sprint-01` |
| **Sprint Release (Demo OK)** | Merge PR `staging` -> `prod` | Git Tag: `v1.0.0`, `v1.1.0` |
| **Xử Lý Sự Cố Khẩn Cấp** | Git Branch từ `prod` | `hotfix/MP-99-telemetry-disconnect`<br>Commit: `hotfix: fix socket disconnect #MP-99` |

---

## 5. Quy Trình Phối Hợp Trạng Thái Bảng Scrum (Kanban / Sprint Board)

```text
[Backlog] ---> [To Do] ---> [In Progress] ---> [Code Review / PR] ---> [QA / Staging] ---> [Done]
```

1. **To Do -> In Progress:** Developer tự gán tên mình vào Issue `#MP-xx`, tạo nhánh `feat/MP-xx` từ `dev`.
2. **In Progress -> Code Review:** Push code, mở PR vào `dev`, đính kèm link PR vào Issue.
3. **Code Review -> QA / Staging:** PR được approve và merge vào `dev`. Khi đóng gói bản build, deploy lên `staging`. QA kiểm thử theo Acceptance Criteria.
4. **QA / Staging -> Done:** QA xác nhận pass tiêu chí nghiệm thu. PO duyệt nghiệm thu. Issue tự động đóng lại.
