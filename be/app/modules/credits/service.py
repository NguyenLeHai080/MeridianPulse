import uuid
from typing import List
from app.modules.auth.service import auth_service
from app.modules.credits.schemas import PricingPlan, TransactionItem, CreditBalanceResponse


class CreditsService:
    def __init__(self):
        self._plans: List[PricingPlan] = [
            PricingPlan(
                id="plan-starter",
                name="Gói Khởi Động (Starter)",
                price_vnd="199,000 đ",
                credits_amount=500,
                bonus_credits=50,
                features=[
                    "550 Credits tạo video & ảnh",
                    "Hỗ trợ Veo 3 & Kling AI",
                    "Độ phân giải Full HD 1080p",
                    "Tốc độ hàng đợi tiêu chuẩn"
                ],
                is_popular=False
            ),
            PricingPlan(
                id="plan-creator",
                name="Gói Sáng Tạo Chuyên Nghiệp (Creator Pro)",
                price_vnd="499,000 đ",
                credits_amount=2500,
                bonus_credits=500,
                features=[
                    "3,000 Credits tạo video không giới hạn",
                    "Ưu tiên hàng đợi VIP Siêu Tốc (Fast Queue)",
                    "Mở khóa 3D Product TVC & Gacha KOLs",
                    "Tải video 4K Ultra HD & 60 FPS",
                    "Cào video TikTok không giới hạn"
                ],
                is_popular=True
            ),
            PricingPlan(
                id="plan-agency",
                name="Gói Doanh Nghiệp & Agency (Sovereign VIP)",
                price_vnd="1,499,000 đ",
                credits_amount=10000,
                bonus_credits=3000,
                features=[
                    "13,000 Credits tạo nội dung quy mô lớn",
                    "Kênh xử lý GPU RunningHub ComfyUI riêng",
                    "API Key tích hợp vào phần mềm riêng",
                    "Hỗ trợ kỹ thuật 24/7 trực tiếp"
                ],
                is_popular=False
            )
        ]

        self._transactions: List[TransactionItem] = [
            TransactionItem(
                id="tx-01",
                type="PURCHASE",
                description="Nạp gói Creator Pro (+3,000 credits)",
                amount=3000,
                created_at="Hôm nay"
            ),
            TransactionItem(
                id="tx-02",
                type="CONSUMPTION",
                description="Tạo Video Google Veo 3.1 8K (-10 credits)",
                amount=-10,
                created_at="15 phút trước"
            ),
            TransactionItem(
                id="tx-03",
                type="CONSUMPTION",
                description="Xuất TVC Nước hoa 3D E-Commerce (-15 credits)",
                amount=-15,
                created_at="1 giờ trước"
            )
        ]

    def get_plans(self) -> List[PricingPlan]:
        return self._plans

    def get_balance(self, user_email: str) -> CreditBalanceResponse:
        user = auth_service.get_user_by_email(user_email)
        return CreditBalanceResponse(
            user_email=user_email,
            credit_balance=user.credit_balance if user else 150,
            plan=user.plan if user else "Starter Free"
        )

    def buy_plan(self, user_email: str, plan_id: str) -> CreditBalanceResponse:
        plan = next((p for p in self._plans if p.id == plan_id), self._plans[1])
        total_credits = plan.credits_amount + plan.bonus_credits
        new_balance = auth_service.add_credits(user_email, total_credits)
        
        tx = TransactionItem(
            id=f"tx-{uuid.uuid4().hex[:6]}",
            type="PURCHASE",
            description=f"Mua thành công {plan.name} (+{total_credits:,} credits)",
            amount=total_credits,
            created_at="Vừa xong"
        )
        self._transactions.insert(0, tx)
        
        user = auth_service.get_user_by_email(user_email)
        return CreditBalanceResponse(
            user_email=user_email,
            credit_balance=new_balance,
            plan=user.plan if user else "Pro Creator"
        )

    def get_transactions(self) -> List[TransactionItem]:
        return self._transactions


credits_service = CreditsService()
