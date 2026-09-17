import uuid
from app.modules.auth.service import auth_service
from app.modules.voice_studio.schemas import VoiceCloneRequest, VoiceCloneResponse


class VoiceStudioService:
    def clone_voice(self, user_email: str, req: VoiceCloneRequest) -> VoiceCloneResponse:
        auth_service.deduct_credits(user_email, 5)
        return VoiceCloneResponse(
            id=f"voice-{uuid.uuid4().hex[:6]}",
            voice_name=req.voice_name,
            audio_url="https://assets.mixkit.co/active_storage/sfx/2874/2874-preview.mp3",
            duration_seconds=8.5,
            credits_charged=5,
            created_at="Vừa xong"
        )


voice_studio_service = VoiceStudioService()
