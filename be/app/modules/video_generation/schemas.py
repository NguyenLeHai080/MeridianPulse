from enum import Enum
from typing import Optional, List
from pydantic import BaseModel, Field


class VideoModelType(str, Enum):
    VEO_3 = "veo-3.1-pro"
    KLING_2 = "kling-v2.0-master"
    MINIMAX = "minimax-hailuo-fast"


class AspectRatio(str, Enum):
    LANDSCAPE = "16:9"
    PORTRAIT = "9:16"
    SQUARE = "1:1"


class JobStatus(str, Enum):
    QUEUED = "QUEUED"
    PROCESSING = "PROCESSING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"


class CreateVideoJobRequest(BaseModel):
    prompt: str = Field(..., min_length=3, max_length=1500)
    negative_prompt: Optional[str] = None
    model: VideoModelType = VideoModelType.VEO_3
    aspect_ratio: AspectRatio = AspectRatio.PORTRAIT
    duration_seconds: int = Field(5, ge=3, le=15)
    motion_strength: float = Field(5.0, ge=1.0, le=10.0)
    input_image_url: Optional[str] = None
    camera_motion: Optional[str] = "pan_left"


class VideoJobResponse(BaseModel):
    id: str
    user_email: str
    prompt: str
    model: str
    aspect_ratio: str
    duration_seconds: int
    status: JobStatus
    progress_percentage: int = 100
    video_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    credits_charged: int
    created_at: str
