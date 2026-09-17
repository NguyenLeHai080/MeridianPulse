from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.modules.auth.models import User
from app.modules.voice_studio.schemas import VoiceCloneRequest, VoiceCloneResponse
from app.modules.voice_studio.service import voice_studio_service

router = APIRouter(prefix="/voice", tags=["Voice & Audio Studio"])


@router.post("/clone", response_model=VoiceCloneResponse)
def clone_and_synthesize(
    req: VoiceCloneRequest,
    current_user: User = Depends(get_current_user)
):
    return voice_studio_service.clone_voice(current_user.email, req)
