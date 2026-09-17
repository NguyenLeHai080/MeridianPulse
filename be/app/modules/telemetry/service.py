"""Telemetry Service - MeridianPulse Backend
Calculates vital sign streams and live waveform telemetry.
"""

import math
import time
from typing import List
from app.modules.patients.service import patient_service
from app.modules.telemetry.schemas import TelemetryFrame, TelemetrySnapshotResponse


class TelemetryService:
    def __init__(self):
        self._step = 0

    def generate_snapshot(self, ward_id: str = "ICU-01") -> TelemetrySnapshotResponse:
        now_ms = int(time.time() * 1000)
        self._step += 1
        
        patients = patient_service.get_all()
        frames: List[TelemetryFrame] = []
        
        for p in patients:
            # Simulate real-time ECG QRS wave voltage
            cycle = (self._step + int(p.bed_number)) % 50
            voltage = 0.0
            if cycle == 10:
                voltage = 0.2   # P wave
            elif cycle == 18:
                voltage = -0.3  # Q dip
            elif cycle == 20:
                voltage = 1.8   # R peak
            elif cycle == 22:
                voltage = -0.5  # S drop
            elif cycle == 28:
                voltage = 0.35  # T wave
            else:
                voltage = math.sin(self._step * 0.1) * 0.05  # baseline noise

            frames.append(TelemetryFrame(
                patient_id=p.id,
                bed_number=p.bed_number,
                timestamp_ms=now_ms,
                bpm=p.vitals.bpm,
                spo2=p.vitals.spo2,
                blood_pressure=p.vitals.blood_pressure,
                ecg_voltage=round(voltage, 3),
                status=p.vitals.status
            ))

        return TelemetrySnapshotResponse(
            success=True,
            ward_id=ward_id,
            timestamp_ms=now_ms,
            data=frames
        )


telemetry_service = TelemetryService()
