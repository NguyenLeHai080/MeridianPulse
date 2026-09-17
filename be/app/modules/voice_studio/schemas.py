from typing import Optional
from pydantic import BaseModel, Field


class VoiceCloneRequest(BaseModel):
    voice_name: str = Field(..., min_length=2)
    sample_audio_url: str = Field(..., description="5-15s sample voice audio")
    target_text: str = Field(..., min_length=3)
    speed: float = Field(1.0, ge=0.5, le=2.0)


class VoiceCloneResponse(BaseModel):
    id: str
    voice_name: str
    audio_url: str
    duration_seconds: float
    credits_charged: int
    created_at: str
