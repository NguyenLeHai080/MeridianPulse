"""Patients Schemas - MeridianPulse Backend"""

from typing import List, Optional
from pydantic import BaseModel, Field


class VitalSummary(BaseModel):
    bpm: int = Field(..., example=74)
    spo2: float = Field(..., example=98.5)
    blood_pressure: str = Field(..., example="120/80")
    status: str = Field(..., example="STABLE")  # STABLE, WARNING, CRITICAL


class Patient(BaseModel):
    id: str
    bed_number: str
    full_name: str
    age: int
    gender: str
    diagnosis: str
    doctor_in_charge: str
    is_monitored: bool = True
    vitals: VitalSummary


class PatientCreate(BaseModel):
    bed_number: str
    full_name: str
    age: int
    gender: str
    diagnosis: str
    doctor_in_charge: str


class PatientResponse(BaseModel):
    success: bool = True
    data: Patient


class PatientListResponse(BaseModel):
    success: bool = True
    total: int
    data: List[Patient]
