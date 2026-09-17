"""Telemetry Schemas - MeridianPulse Backend"""

from typing import List, Optional
from pydantic import BaseModel, Field


class TelemetryFrame(BaseModel):
    patient_id: str
    bed_number: str
    timestamp_ms: int
    bpm: int
    spo2: float
    blood_pressure: str
    ecg_voltage: float = Field(..., description="ECG millivolts reading for waveform chart")
    status: str = "STABLE"


class TelemetrySnapshotResponse(BaseModel):
    success: bool = True
    ward_id: str
    timestamp_ms: int
    data: List[TelemetryFrame]
