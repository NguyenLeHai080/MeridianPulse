# Vai Trò & Các Sự Kiện Scrum (Roles & Ceremonies)

---

## 1. Cơ Cấu Tổ Chức Đội Ngũ Scrum

```text
+-------------------+      +--------------------+      +--------------------+
|   Product Owner   | <--> |    Scrum Master    | <--> |  Development Team  |
| (Nghiệp vụ & PO)  |      | (Quy trình & Agile)|      | (FE, BE, QA/QC, DE)|
+-------------------+      +--------------------+      +--------------------+
```

1. **Product Owner (PO):**
   - Chịu trách nhiệm về Product Vision và giá trị nghiệp vụ của MeridianPulse.
   - Quản lý và ưu tiên các hạng mục trong **Product Backlog**.
   - Quyết định nghiệm thu User Story dựa trên tiêu chí chấp nhận và DoD.
2. **Scrum Master (SM):**
   - Bảo đảm đội ngũ vận hành đúng nguyên tắc Agile và Gitflow.
   - Loại bỏ các trở ngại (blockers kỹ thuật, môi trường, xung đột code).
   - Điều phối và tối ưu hóa thời lượng các phiên họp Scrum.
3. **Development Team:**
   - Đội ngũ liên chức năng: Frontend (`fe/`), Backend (`be/`), QA/QC, DevOps.
   - Ước lượng độ phức tạp (Planning Poker Story Points).
   - Trực tiếp viết mã nguồn, viết kiểm thử, mở Pull Request và chịu trách nhiệm về chất lượng sản phẩm.

---

## 2. Bốn Sự Kiện Scrum Tiêu Chuẩn Trong Chu Kỳ 2 Tuần

### 2.1. Sprint Planning (Đầu Sprint - 2 đến 3 tiếng)
- PO trình bày mục tiêu Sprint (Sprint Goal) và các User Story ưu tiên cao.
- Dev Team phân rã User Story thành các task kỹ thuật và gán mã **Issue ID** (`#MP-xx`).
- Chấm điểm Story Points theo dãy Fibonacci (1, 2, 3, 5, 8). Nếu task > 8 điểm, bắt buộc phân rã thêm.

### 2.2. Daily Scrum (Hàng ngày - 15 phút)
Tập trung vào 3 câu hỏi:
1. *Hôm qua tôi đã làm gì để tiến gần đến Sprint Goal?* (Commit/PR nào đã hoàn thành?)
2. *Hôm nay tôi sẽ làm gì?* (Nhánh `feat/MP-xx` nào đang phát triển?)
3. *Có trở ngại nào đang cản trở tiến độ không?*

### 2.3. Sprint Review & Demo (Cuối Sprint - 1 tiếng)
- Đội ngũ demo trực tiếp các tính năng đã hoàn thành trên môi trường **Staging**.
- PO và stakeholders đánh giá mức độ đạt yêu cầu và duyệt phát hành lên **Prod**.

### 2.4. Sprint Retrospective (Cuối Sprint - 45 phút)
- Thảo luận: Điều gì đã làm tốt? Điều gì cần cải thiện? Hành động cụ thể cho Sprint tiếp theo.
- Đánh giá chất lượng code, thời gian review PR và tỷ lệ conflict.
