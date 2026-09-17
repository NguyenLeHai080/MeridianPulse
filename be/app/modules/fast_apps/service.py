import uuid
from typing import List
from app.modules.auth.service import auth_service
from app.modules.fast_apps.schemas import (
    FastAppType,
    ProductTvcRequest,
    GachaKolsRequest,
    SeeDanceRequest,
    FastAppResponse
)


class FastAppsService:
    def __init__(self):
        self._gallery: List[FastAppResponse] = [
            FastAppResponse(
                id="tvc-001",
                app_type=FastAppType.PRODUCT_TVC,
                title="TVC Quảng Cáo Nước Hoa Chanel 3D Luxury",
                output_url="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-underwater-42999-large.mp4",
                thumbnail_url="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=500&q=80",
                credits_charged=15,
                created_at="Hôm nay"
            ),
            FastAppResponse(
                id="kol-001",
                app_type=FastAppType.GACHA_KOLS,
                title="Người Mẫu AI Châu Á - Đầm Dạ Hội Lụa Tơ Tằm",
                output_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
                thumbnail_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
                credits_charged=10,
                created_at="Hôm qua"
            ),
            FastAppResponse(
                id="dance-001",
                app_type=FastAppType.SEE_DANCE,
                title="AI Dance Vũ Đạo 'Magnetic' TikTok Trend",
                output_url="https://assets.mixkit.co/videos/preview/mixkit-young-woman-dancing-in-a-studio-41121-large.mp4",
                thumbnail_url="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80",
                credits_charged=20,
                created_at="2 ngày trước"
            )
        ]

    def create_product_tvc(self, user_email: str, req: ProductTvcRequest) -> FastAppResponse:
        auth_service.deduct_credits(user_email, 15)
        item = FastAppResponse(
            id=f"tvc-{uuid.uuid4().hex[:6]}",
            app_type=FastAppType.PRODUCT_TVC,
            title=f"TVC Quảng Cáo {req.product_name} ({req.style_theme})",
            output_url="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-underwater-42999-large.mp4",
            thumbnail_url="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=500&q=80",
            credits_charged=15,
            created_at="Vừa xong"
        )
        self._gallery.insert(0, item)
        return item

    def create_gacha_kols(self, user_email: str, req: GachaKolsRequest) -> FastAppResponse:
        auth_service.deduct_credits(user_email, 10)
        item = FastAppResponse(
            id=f"kol-{uuid.uuid4().hex[:6]}",
            app_type=FastAppType.GACHA_KOLS,
            title=f"Người Mẫu {req.model_ethnicity} ({req.clothing_prompt[:30]}...)",
            output_url="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
            thumbnail_url="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80",
            credits_charged=10,
            created_at="Vừa xong"
        )
        self._gallery.insert(0, item)
        return item

    def create_see_dance(self, user_email: str, req: SeeDanceRequest) -> FastAppResponse:
        auth_service.deduct_credits(user_email, 20)
        item = FastAppResponse(
            id=f"dance-{uuid.uuid4().hex[:6]}",
            app_type=FastAppType.SEE_DANCE,
            title=f"Vũ Điệu AI Nhịp Điệu (Template: {req.dance_template_id})",
            output_url="https://assets.mixkit.co/videos/preview/mixkit-young-woman-dancing-in-a-studio-41121-large.mp4",
            thumbnail_url="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80",
            credits_charged=20,
            created_at="Vừa xong"
        )
        self._gallery.insert(0, item)
        return item

    def get_gallery(self) -> List[FastAppResponse]:
        return self._gallery


fast_apps_service = FastAppsService()
