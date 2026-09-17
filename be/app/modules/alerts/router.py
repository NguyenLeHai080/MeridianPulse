"""Alerts Router - MeridianPulse Backend
Exposes /api/v1/alerts endpoints.
"""

from fastapi import APIRouter, Depends, status
from app.core.dependencies import get_current_user
from app.core.exceptions import NotFoundException
from app.modules.auth.models import User
from app.modules.alerts.schemas import AlertItem, AlertListResponse
from app.modules.alerts.service import alert_service

router = APIRouter(prefix="/alerts", tags=["Emergency Clinical Alerts"])


@router.get("", response_model=AlertListResponse, status_code=status.HTTP_200_OK)
async def list_active_alerts(current_user: User = Depends(get_current_user)):
    """Lấy danh sách các cảnh báo lâm sàng khẩn cấp đang kích hoạt tại khoa."""
    alerts = alert_service.get_active_alerts()
    return AlertListResponse(success=True, total=len(alerts), data=alerts)


@router.post("/{alert_id}/acknowledge", response_model=AlertItem, status_code=status.HTTP_200_OK)
async def acknowledge_alert(alert_id: str, current_user: User = Depends(get_current_user)):
    """Bác sĩ/Y tá xác nhận đã xử lý hoặc tắt chuông cảnh báo (Acknowledge)."""
    alert = alert_service.acknowledge_alert(alert_id)
    if not alert:
        raise NotFoundException(f"Không tìm thấy cảnh báo {alert_id}")
    return alert
