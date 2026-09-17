from typing import List
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.modules.auth.models import User
from app.modules.video_generation.schemas import CreateVideoJobRequest, VideoJobResponse
from app.modules.video_generation.service import video_service

router = APIRouter(prefix="/video", tags=["AI Video Studio"])


@router.post("/generate", response_model=VideoJobResponse)
def generate_video(
    req: CreateVideoJobRequest,
    current_user: User = Depends(get_current_user)
):
    """Submit a text-to-video or image-to-video generation job."""
    return video_service.submit_job(current_user.email, req)


@router.get("/jobs", response_model=List[VideoJobResponse])
def get_my_video_jobs(
    current_user: User = Depends(get_current_user)
):
    """Retrieve all video jobs belonging to the active user."""
    return video_service.get_user_jobs(current_user.email)


@router.get("/gallery", response_model=List[VideoJobResponse])
def get_public_gallery():
    """Retrieve community showcase creations."""
    return video_service.get_all_jobs()
