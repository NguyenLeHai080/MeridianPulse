from typing import List, Optional
from pydantic import BaseModel, Field


class TikTokScrapeRequest(BaseModel):
    video_url: str = Field(..., description="Link to TikTok or Instagram Reels video")


class TikTokScrapeResponse(BaseModel):
    id: str
    original_url: str
    author_name: str
    author_avatar: str
    title: str
    like_count: str
    comment_count: str
    share_count: str
    no_watermark_video_url: str
    thumbnail_url: str
    # AI Vision Reverse Engineering Insights
    vision_script_analysis: str
    suggested_veo_prompt: str
    suggested_kling_prompt: str
    music_title: str
