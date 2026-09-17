from enum import Enum
from typing import Optional, List
from pydantic import BaseModel, Field


class FastAppType(str, Enum):
    PRODUCT_TVC = "PRODUCT_TVC"
    GACHA_KOLS = "GACHA_KOLS"
    SEE_DANCE = "SEE_DANCE"


class ProductTvcRequest(BaseModel):
    product_image_url: str = Field(..., description="Link or base64 of the product photo")
    product_name: str = Field(..., min_length=2)
    style_theme: str = Field("Luxury Gold & Black Studio", description="3D scene lighting style")
    motion_type: str = Field("360 Orbit Cinematic", description="Camera movement")


class GachaKolsRequest(BaseModel):
    model_ethnicity: str = Field("Asian Fashion Model", description="Model appearance preset")
    garment_image_url: Optional[str] = None
    clothing_prompt: str = Field(..., min_length=3)
    aspect_ratio: str = "9:16"


class SeeDanceRequest(BaseModel):
    portrait_image_url: str = Field(..., description="Full-body portrait photo")
    dance_template_id: str = Field(..., description="Dance choreography ID")


class FastAppResponse(BaseModel):
    id: str
    app_type: FastAppType
    title: str
    output_url: str
    thumbnail_url: str
    credits_charged: int
    created_at: str
