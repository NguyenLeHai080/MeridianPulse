# Vai Trò & Các Sự Kiện Scrum (Roles & Ceremonies)

Tài liệu này chuẩn hóa cơ cấu tổ chức đội ngũ và cách thức vận hành 4 sự kiện chính trong một chu kỳ Sprint 2 tuần tại dự án **MeridianPulse**.

---

## 1. Cơ Cấu Tổ Chức Đội Ngũ Scrum (Scrum Team Roles)

```text
+-------------------+      +--------------------+      +--------------------+
|   Product Owner   | <--> |    Scrum Master    | <--> |  Development Team  |
| (Nghiệp vụ & PO)  |      | (Quy trình & Agile)|      | (FE, BE, QA/QC, DE)|
+-------------------+      +--------------------+      +--------------------+
```

1. **Product Owner (PO):**
   - Quản lý và chịu trách nhiệm tối thượng về **Product Backlog**.
   - Định nghĩa Sprint Goal và làm rõ tiêu chuẩn chấp nhận cho từng User Story.
   - Nghiệm thu tính năng dựa trên Definition of Done.
2. **Scrum Master (SM):**
   - Đảm bảo toàn đội tuân thủ nguyên tắc Scrum và quy trình Gitflow.
   - Hỗ trợ gỡ bỏ blockers kỹ thuật và tối ưu vận tốc (velocity) của nhóm.
   - Điều phối các sự kiện Scrum đảm bảo đúng thời lượng (time-box).
3. **Development Team (Nhóm phát triển liên chức năng):**
   - Gồm Frontend (`fe/`), Backend (`be/`), QA/QC Engineer, DevOps.
   - Tự quản (self-organizing), ước lượng độ phức tạp bằng Planning Poker (Fibonacci: 1, 2, 3, 5, 8).
   - Trực tiếp viết code, viết tests, mở PR và bảo đảm chất lượng.

---

## 2. Bốn Sự Kiện Scrum Chuẩn Trong Chu Kỳ 2 Tuần

### 2.1. Sprint Planning (Đầu Sprint - 2 tiếng)
- PO trình bày mục tiêu Sprint và các PBI ưu tiên cao nhất.
- Nhóm phát triển thảo luận kỹ thuật, chốt danh sách cam kết đưa vào **Sprint Backlog**.
- Gán mã **Issue ID** (`#MP-xx`) cho từng nhiệm vụ.

### 2.2. Daily Scrum (Hàng ngày - 15 phút)
Tập trung trả lời 3 câu hỏi:
1. *Hôm qua tôi đã làm gì giúp đội đạt Sprint Goal?* (Commit / PR nào?)
2. *Hôm nay tôi sẽ làm gì?* (Nhánh `feat/MP-xx` nào?)
3. *Có khó khăn, blocker kỹ thuật nào không?*

### 2.3. Sprint Review & Demo (Cuối Sprint - 1 tiếng)
- Nhóm demo trực tiếp các tính năng đã hoàn thành trên môi trường **Staging**.
- PO và stakeholders đánh giá mức độ đạt yêu cầu và quyết định phát hành lên **Prod**.

### 2.4. Sprint Retrospective (Cuối Sprint - 45 phút)
- Đánh giá: *Điều gì đã làm tốt? Điều gì cần cải tiến? Hành động cụ thể cho Sprint tới.*
