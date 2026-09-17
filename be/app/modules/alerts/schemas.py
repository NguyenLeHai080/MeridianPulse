"""Alerts Schemas - MeridianPulse Backend"""

from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


class AlertSeverity(str):
    CRITICAL = "CRITICAL"
    WARNING = "WARNING"
    INFO = "INFO"


class AlertItem(BaseModel):
    id: str
    patient_id: str
    bed_number: str
    patient_name: str
    severity: str  # CRITICAL, WARNING, INFO
    title: str
    description: str
    value_recorded: str
    is_acknowledged: bool = False
    timestamp: datetime


class AlertListResponse(BaseModel):
    success: bool = True
    total: int
    data: List[AlertItem]
