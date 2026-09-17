from fastapi import APIRouter
from app.modules.tiktok_tools.schemas import TikTokScrapeRequest, TikTokScrapeResponse
from app.modules.tiktok_tools.service import tiktok_tools_service

router = APIRouter(prefix="/tiktok", tags=["TikTok & Social Tools"])


@router.post("/scrape", response_model=TikTokScrapeResponse)
def scrape_tiktok_video(req: TikTokScrapeRequest):
    """Download no-watermark TikTok video and extract AI prompt via Vision AI."""
    return tiktok_tools_service.scrape_and_reverse_prompt(req)
