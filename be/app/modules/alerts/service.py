"""Alerts Service - MeridianPulse Backend
Scans clinical rules and manages triage alerts for ICU staff.
"""

from datetime import datetime, timezone
from typing import Dict, List, Optional
import uuid
from app.modules.alerts.schemas import AlertItem


class AlertService:
    def __init__(self):
        self._alerts: Dict[str, AlertItem] = {}
        self._seed_active_alerts()

    def _seed_active_alerts(self):
        # Bed 103 current active tachycardia alert
        alert = AlertItem(
            id="alt-001",
            patient_id="p-103",
            bed_number="103",
            patient_name="Lê Hoàng Nam",
            severity="CRITICAL",
            title="Cảnh Báo Nhịp Nhanh Kịch Phát (Tachycardia)",
            description="Nhịp tim bệnh nhân vượt ngưỡng an toàn liên tục (> 120 BPM)",
            value_recorded="126 BPM",
            is_acknowledged=False,
            timestamp=datetime.now(timezone.utc)
        )
        self._alerts[alert.id] = alert

    def get_active_alerts(self) -> List[AlertItem]:
        return sorted(self._alerts.values(), key=lambda a: a.timestamp, reverse=True)

    def acknowledge_alert(self, alert_id: str) -> Optional[AlertItem]:
        if alert_id in self._alerts:
            self._alerts[alert_id].is_acknowledged = True
            return self._alerts[alert_id]
        return None


alert_service = AlertService()
