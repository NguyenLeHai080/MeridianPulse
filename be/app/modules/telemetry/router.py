"""Telemetry Router - MeridianPulse Backend
Exposes /api/v1/telemetry and WebSocket stream endpoints.
"""

import asyncio
from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, status
from app.core.dependencies import get_current_user
from app.modules.auth.models import User
from app.modules.telemetry.schemas import TelemetrySnapshotResponse
from app.modules.telemetry.service import telemetry_service
from app.modules.telemetry.ws_manager import ws_manager

router = APIRouter(prefix="/telemetry", tags=["Real-time Vital Telemetry"])


@router.get("/snapshot", response_model=TelemetrySnapshotResponse, status_code=status.HTTP_200_OK)
async def get_telemetry_snapshot(ward_id: str = "ICU-01", current_user: User = Depends(get_current_user)):
    """Lấy snapshot tức thời các chỉ số sinh tồn của toàn bộ giường bệnh tại khoa."""
    return telemetry_service.generate_snapshot(ward_id)


@router.websocket("/ws")
async def telemetry_websocket_endpoint(websocket: WebSocket, ward_id: str = "ICU-01"):
    """Kênh truyền song công WebSocket phát trực tiếp tín hiệu nhịp tim và điện tâm đồ mỗi giây."""
    await ws_manager.connect(websocket, channel=ward_id)
    try:
        while True:
            # Generate and stream frame
            frame_data = telemetry_service.generate_snapshot(ward_id).model_dump()
            await websocket.send_json(frame_data)
            await asyncio.sleep(1.0)
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket, channel=ward_id)
    except Exception:
        ws_manager.disconnect(websocket, channel=ward_id)
