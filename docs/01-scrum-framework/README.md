# Khung Vận Hành Scrum Dự Án MeridianPulse

Thư mục này định nghĩa các nguyên tắc Agile/Scrum, cơ cấu tổ chức đội ngũ, chu kỳ các sự kiện Sprint và tiêu chuẩn chất lượng áp dụng cho toàn bộ dự án **MeridianPulse**.

---

## 📑 Danh Mục Tài Liệu Khung Scrum

| Tài Liệu | Nội Dung Chính |
| :--- | :--- |
| [roles-and-ceremonies.md](roles-and-ceremonies.md) | Cơ cấu 3 vai trò Scrum (PO, SM, Dev Team), quy trình 4 sự kiện Sprint 2 tuần (Planning, Daily, Review, Retro). |
| [definition-of-ready-and-done.md](definition-of-ready-and-done.md) | Bộ tiêu chuẩn Sẵn sàng (Definition of Ready - DoR) và Hoàn thành (Definition of Done - DoD). |
| [git-scrum-integration-matrix.md](git-scrum-integration-matrix.md) | Ma trận liên kết kỹ thuật giữa Scrum Board (Backlog, Issue ID) và Gitflow (Branch, PR, Tag). |

---

## 🔄 Chu Kỳ Sprint 2 Tuần (10 Ngày Làm Việc)

```text
[Sprint Planning - Ngày 1]
           │
           ▼
[Phát triển Tính năng] ── (Daily Scrum 15' hàng ngày) ──► [Mở PR vào dev]
           │
           ▼ (Cuối Sprint)
[Sprint Review & Demo trên Staging - Ngày 10]
           │
           ▼
[Sprint Retrospective - Ngày 10] ──► [Lập kế hoạch Sprint tiếp theo]
```
