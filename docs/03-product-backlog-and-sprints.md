# Tài Liệu Nghiệp Vụ & Danh Mục Yêu Cầu Scrum (Product Backlog & Sprints) - MeridianPulse

Tài liệu này chứa toàn bộ định hướng nghiệp vụ (Business Requirements), danh mục các Epic cốt lõi, danh sách Product Backlog Items (PBI / User Stories) đi kèm mã định danh **Issue ID** và kế hoạch phân bổ các Sprint cho hệ thống **MeridianPulse**.

---

## 1. Tầm Nhìn Sản Phẩm (Product Vision)

> **"MeridianPulse là nền tảng số theo dõi, trực quan hóa và cảnh báo chỉ số sinh tồn (Vital Signs Telemetry) theo thời gian thực, hỗ trợ đội ngũ y bác sĩ, nhân viên chăm sóc sức khỏe và bệnh nhân giám sát nhịp tim, huyết áp, nồng độ oxy trong máu (SpO2) với độ chính xác cao và khả năng phản hồi tức thời."**

```text
               +-------------------------------------------------------+
               |             MeridianPulse Architecture                |
               +-------------------------------------------------------+
                                          |
          +-------------------------------+-------------------------------+
          |                               |                               |
          v                               v                               v
   [fe/ Web Client]              [be/ Core API & Socket]           [IoT / Devices]
- Bảng điều khiển sinh tồn      - RESTful APIs                    - Cảm biến nhịp tim
- Biểu đồ nhịp tim trực tiếp    - WebSocket Stream Engine         - Máy đo huyết áp
- Cảnh báo thị giác khẩn cấp    - Anomaly Detection Rule Engine   - Thiết bị đeo SpO2
```

---

## 2. Danh Mục Các Epic Nghiệp Vụ (Product Epics)

| Mã Epic | Tên Epic Nghiệp Vụ | Mô Tả Trọng Tâm |
| :--- | :--- | :--- |
| **`EPIC-01`** | **Core Platform & Dashboard Layout** | Xây dựng giao diện trang chủ, bố cục responsive, bảng điều khiển tổng quan các chỉ số sinh tồn. |
| **`EPIC-02`** | **Identity & Role-Based Access (IAM)** | Quản lý định danh người dùng: Bác sĩ điều trị (Doctor), Điều dưỡng (Nurse), Bệnh nhân (Patient), Quản trị viên (Admin). |
| **`EPIC-03`** | **Vital Signs Telemetry & Real-time Stream** | Động cơ thu nhận tín hiệu dữ liệu thời gian thực (BPM nhịp tim, SpO2, Huyết áp, Nhiệt độ cơ thể) qua WebSocket. |
| **`EPIC-04`** | **Anomaly Alerting & Emergency Notification** | Hệ thống phát hiện bất thường tự động, gửi cảnh báo đỏ tức thời qua Web Push, SMS, Audio Alert. |
| **`EPIC-05`** | **Clinical Records & Historical Analytics** | Báo cáo xu hướng nhịp tim, đồ thị phân tích ECG lịch sử, trích xuất dữ liệu PDF cho hồ sơ bệnh án. |

---

## 3. Danh Sách Product Backlog & User Stories Chi Tiết

Dưới đây là danh sách các User Stories được đánh mã **Issue ID** (`#MP-xx`). Mọi nhánh Git và Commit Message bắt buộc phải ánh xạ trực tiếp tới các Issue này.

### User Story #MP-01: Giao diện Bảng điều khiển Tổng quan (Homepage Dashboard)
- **Epic:** `EPIC-01 - Core Platform & Dashboard Layout`
- **Mã Issue:** `#MP-01`
- **Độ ưu tiên:** `Cao (P0 - High)`
- **Điểm ước lượng (Story Points):** `5`
- **Nhánh Git tương ứng:** `feat/MP-01-homepage-dashboard` (hoặc `feat/homepage`)
- **Mô tả nghiệp vụ:**
  > *Là một* Y bác sĩ hoặc Điều dưỡng viên trực ca,  
  > *Tôi muốn* truy cập một trang chủ trực quan hiển thị tổng quan các giường bệnh/bệnh nhân cùng nhịp tim trung bình, trạng thái kết nối thiết bị và danh sách cảnh báo mới nhất,  
  > *Để* nắm bắt tức thời tình trạng toàn bộ bệnh nhân trong khu vực điều trị chỉ bằng một ánh nhìn.
- **Tiêu chuẩn chấp nhận (Acceptance Criteria - Given/When/Then):**
  - **Scenario 1:** Hiển thị tổng quan các thẻ chỉ số chính
    - *Given* người dùng truy cập trang chủ `fe/index.html`,
    - *When* trang web tải hoàn tất,
    - *Then* hệ thống phải hiển thị 4 thẻ chỉ số nhanh: Nhịp tim trung bình (BPM), SpO2 trung bình (%), Số ca cần lưu ý khẩn cấp, và Tỷ lệ thiết bị đang kết nối trực tuyến.
  - **Scenario 2:** Biểu đồ sóng nhịp tim thời gian thực (Pulse Monitor Wave)
    - *Given* màn hình hiển thị bệnh nhân được chọn,
    - *When* có tín hiệu dữ liệu cập nhật,
    - *Then* biểu đồ sóng nhịp tim (ECG/Pulse Wave) phải vẽ chuyển động mượt mà với hiệu ứng đồ họa chuyên nghiệp.
  - **Scenario 3:** Thiết kế Responsive & Chế độ Màu y tế chuyên dụng
    - *Given* truy cập từ màn hình máy tính bàn hoặc máy tính bảng của khoa,
    - *When* thay đổi kích thước hiển thị,
    - *Then* giao diện tự động co giãn lưới (Grid) chuẩn mực, nền tối (Dark Medical HUD) giúp bác sĩ không mỏi mắt khi trực ca đêm.

---

### User Story #MP-02: Xác thực & Phân quyền Tài khoản Người dùng
- **Epic:** `EPIC-02 - Identity & Role-Based Access`
- **Mã Issue:** `#MP-02`
- **Độ ưu tiên:** `Cao (P0 - High)`
- **Điểm ước lượng (Story Points):** `8`
- **Nhánh Git tương ứng:** `feat/MP-02-auth-rbac`
- **Mô tả nghiệp vụ:**
  > *Là một* Quản trị viên hệ thống hoặc Bác sĩ,  
  > *Tôi muốn* đăng nhập bằng tài khoản bảo mật kèm cơ chế JWT token và phân quyền chặt chẽ theo vai trò,  
  > *Để* đảm bảo thông tin sức khỏe của bệnh nhân được bảo mật theo tiêu chuẩn HIPAA/y tế.
- **Tiêu chuẩn chấp nhận (Acceptance Criteria):**
  - **Scenario 1:** Đăng nhập hợp lệ
    - *Given* tài khoản bác sĩ hợp lệ,
    - *When* nhập email và mật khẩu đúng,
    - *Then* hệ thống trả về Access Token (hạn 15 phút) và Refresh Token (hạn 7 ngày), chuyển hướng vào Dashboard chuyên môn.
  - **Scenario 2:** Chặn truy cập trái phép
    - *Given* vai trò Bệnh nhân (Patient),
    - *When* cố tình truy cập vào URL cấu hình ngưỡng cảnh báo khoa phòng,
    - *Then* hệ thống chặn lại với thông báo lỗi `403 Forbidden`.

---

### User Story #MP-03: Kênh Truyền Dữ Liệu Sinh Tồn Thời Gian Thực (Telemetry Engine)
- **Epic:** `EPIC-03 - Vital Signs Telemetry`
- **Mã Issue:** `#MP-03`
- **Độ ưu tiên:** `Cao (P0 - High)`
- **Điểm ước lượng (Story Points):** `8`
- **Nhánh Git tương ứng:** `feat/MP-03-telemetry-engine`
- **Mô tả nghiệp vụ:**
  > *Là một* Kỹ sư phần mềm phát triển backend,  
  > *Tôi muốn* xây dựng kênh truyền song công WebSocket/gRPC giữa thiết bị đo lường sinh tồn và frontend dashboard,  
  > *Để* dữ liệu nhịp tim và huyết áp được truyền tải với độ trễ dưới 200ms.
- **Tiêu chuẩn chấp nhận (Acceptance Criteria):**
  - **Scenario 1:** Kết nối stream nhịp tim liên tục
    - *Given* thiết bị phát tín hiệu nhịp tim định kỳ 1 giây/lần,
    - *When* kênh WebSocket kết nối thành công,
    - *Then* frontend nhận được payload `{ patientId, bpm, spo2, timestamp }` và cập nhật biểu đồ không giật lag.
  - **Scenario 2:** Tự động khôi phục kết nối khi mất mạng
    - *Given* mạng chập chờn bị ngắt kết nối WebSocket,
    - *When* mạng ổn định trở lại,
    - *Then* client tự động kích hoạt cơ chế exponential backoff reconnect và tiếp tục vẽ biểu đồ.

---

### User Story #MP-04: Hệ Thống Cảnh Báo Ngưỡng Nguy Hiểm (Critical Anomaly Alerts)
- **Epic:** `EPIC-04 - Anomaly Alerting & Emergency Notification`
- **Mã Issue:** `#MP-04`
- **Độ ưu tiên:** `Trung bình (P1 - Medium)`
- **Điểm ước lượng (Story Points):** `5`
- **Nhánh Git tương ứng:** `feat/MP-04-alert-rules-engine`
- **Mô tả nghiệp vụ:**
  > *Là một* Bác sĩ trực cấp cứu,  
  > *Tôi muốn* nhận được tín hiệu chuông cảnh báo âm thanh và hiệu ứng nhấp nháy đỏ trên màn hình khi nhịp tim bệnh nhân vượt quá 120 BPM hoặc xuống dưới 50 BPM,  
  > *Để* kịp thời can thiệp cấp cứu trong vòng 60 giây đầu tiên.
- **Tiêu chuẩn chấp nhận (Acceptance Criteria):**
  - **Scenario 1:** Kích hoạt cảnh báo nhịp tim nguy kịch (Tachycardia)
    - *Given* bệnh nhân ID #104 có nhịp tim đo được là 135 BPM liên tục trong 10 giây,
    - *When* quy tắc ngưỡng cảnh báo quét qua,
    - *Then* banner đỏ khẩn cấp bật lên tại thẻ bệnh nhân và phát âm thanh cảnh báo tới bàn trực.

---

## 4. Kế Hoạch Phân Bổ Sprint (Sprint Backlogs)

### 🚀 Sprint 01: Thiết Lập Nền Tảng & Giao Diện Dashboard Tổng Quan
- **Thời gian:** 2 tuần (Tuần 1 & Tuần 2)
- **Sprint Goal:** Hoàn thiện khung kiến trúc Gitflow, tài liệu nghiệp vụ Scrum, giao diện Homepage Dashboard (`fe/`) với biểu đồ nhịp tim sống động và cấu trúc chuẩn cho Backend (`be/`).
- **Danh sách Issue ID trong Sprint 01:**
  1. `#MP-00`: Thiết lập Gitflow, Quy chuẩn Commit Issue ID, Bộ tài liệu Scrum (`docs/`). *(SP: 3)*
  2. `#MP-01`: Xây dựng giao diện Bảng điều khiển Homepage Dashboard (`fe/index.html`). *(SP: 5)*
  3. `#MP-02`: Thiết kế kiến trúc cấu trúc Backend RESTful skeleton (`be/`). *(SP: 3)*
- **Tổng Story Points cam kết:** `11 Points`
- **Nhánh kiểm thử Staging dự kiến:** `staging` (Release Candidate `RC-1.0.0`)

---

### 🩺 Sprint 02: Xác Thực Bảo Mật & Kênh Dữ Liệu Thời Gian Thực
- **Thời gian:** 2 tuần (Tuần 3 & Tuần 4)
- **Sprint Goal:** Tích hợp xác thực người dùng JWT và kết nối luồng dữ liệu thời gian thực WebSocket Telemetry.
- **Danh sách Issue ID trong Sprint 02:**
  1. `#MP-03`: Xây dựng module xác thực JWT Authentication & Role-based middleware (`be/auth/`). *(SP: 8)*
  2. `#MP-04`: Xây dựng engine WebSocket phát tín hiệu nhịp tim giả lập và client subscriber. *(SP: 8)*
- **Tổng Story Points cam kết:** `16 Points`

---

## 5. Bảng Đối Chiếu Mã Định Danh Issue & Lệnh Git Mẫu

| Issue ID | Loại (Type) | Nhánh Khởi Tạo Từ `dev` | Ví Dụ Commit Message Chuẩn |
| :--- | :--- | :--- | :--- |
| **`#MP-00`** | `docs` | `feat/MP-00-gitflow-scrum-docs` | `docs: setup gitflow and scrum business specifications #MP-00` |
| **`#MP-01`** | `feat` | `feat/MP-01-homepage` (hoặc `feat/homepage`) | `feat: add initial homepage dashboard layout #MP-01` |
| **`#MP-02`** | `feat` | `feat/MP-02-auth-backend` | `feat: implement jwt authentication skeleton #MP-02` |
| **`#MP-99`** | `hotfix` | `hotfix/MP-99-fix-pulse-stream` (từ `prod`) | `hotfix: resolve live telemetry pulse disconnection #MP-99` |
