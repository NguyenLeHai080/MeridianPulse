import uuid
from datetime import datetime
from typing import Dict, List, Optional
from app.core.exceptions import AppException
from app.modules.auth.service import auth_service
from app.modules.video_generation.schemas import (
    CreateVideoJobRequest,
    VideoJobResponse,
    JobStatus,
    VideoModelType
)


class VideoGenerationService:
    def __init__(self):
        self._jobs: Dict[str, VideoJobResponse] = {}
        self._seed_gallery_showcase()

    def _seed_gallery_showcase(self):
        """Seed realistic showcase video outputs matching PlenxAI showcase."""
        sample_jobs = [
            VideoJobResponse(
                id="vid-showcase-01",
                user_email="creator@plenxai.com",
                prompt="Cyberpunk neon city alley in futuristic Neo Tokyo, rain reflections, glowing cyan holograms, cinematic 8k photorealistic",
                model=VideoModelType.VEO_3.value,
                aspect_ratio="9:16",
                duration_seconds=5,
                status=JobStatus.COMPLETED,
                progress_percentage=100,
                video_url="https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-traffic-at-night-41541-large.mp4",
                thumbnail_url="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
                credits_charged=10,
                created_at="10 phút trước"
            ),
            VideoJobResponse(
                id="vid-showcase-02",
                user_email="creator@plenxai.com",
                prompt="Luxury perfume crystal bottle rising from dark water surface, golden liquid splashes, slow motion 120fps macro shot",
                model=VideoModelType.KLING_2.value,
                aspect_ratio="9:16",
                duration_seconds=5,
                status=JobStatus.COMPLETED,
                progress_percentage=100,
                video_url="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-underwater-42999-large.mp4",
                thumbnail_url="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
                credits_charged=15,
                created_at="25 phút trước"
            ),
            VideoJobResponse(
                id="vid-showcase-03",
                user_email="creator@plenxai.com",
                prompt="Hyperrealistic anime girl with glowing purple eyes in cherry blossom wind, highly detailed dynamic motion",
                model=VideoModelType.MINIMAX.value,
                aspect_ratio="16:9",
                duration_seconds=5,
                status=JobStatus.COMPLETED,
                progress_percentage=100,
                video_url="https://assets.mixkit.co/videos/preview/mixkit-wind-blowing-the-leaves-of-a-tree-41551-large.mp4",
                thumbnail_url="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
                credits_charged=8,
                created_at="1 giờ trước"
            )
        ]
        for job in sample_jobs:
            self._jobs[job.id] = job

    def calculate_cost(self, model: VideoModelType, duration_sec: int) -> int:
        rate = 2
        if model == VideoModelType.KLING_2:
            rate = 3
        elif model == VideoModelType.MINIMAX:
            rate = 2
        return rate * duration_sec

    def submit_job(self, user_email: str, req: CreateVideoJobRequest) -> VideoJobResponse:
        cost = self.calculate_cost(req.model, req.duration_seconds)
        # Deduct credits from user wallet
        auth_service.deduct_credits(user_email, cost)

        job_id = f"vid-{uuid.uuid4().hex[:8]}"
        job = VideoJobResponse(
            id=job_id,
            user_email=user_email,
            prompt=req.prompt,
            model=req.model.value,
            aspect_ratio=req.aspect_ratio.value,
            duration_seconds=req.duration_seconds,
            status=JobStatus.COMPLETED,  # Instant render simulation for responsive testing
            progress_percentage=100,
            video_url="https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-traffic-at-night-41541-large.mp4",
            thumbnail_url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
            credits_charged=cost,
            created_at="Vừa xong"
        )
        self._jobs[job_id] = job
        return job

    def get_all_jobs(self) -> List[VideoJobResponse]:
        return list(self._jobs.values())

    def get_user_jobs(self, user_email: str) -> List[VideoJobResponse]:
        return [j for j in self._jobs.values() if j.user_email == user_email or j.user_email == "creator@plenxai.com"]

    def get_job_by_id(self, job_id: str) -> Optional[VideoJobResponse]:
        return self._jobs.get(job_id)


video_service = VideoGenerationService()
