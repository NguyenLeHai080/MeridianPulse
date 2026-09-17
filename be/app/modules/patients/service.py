"""Patients Service - MeridianPulse Backend
Manages ICU beds and clinical patient assignments.
"""

from typing import Dict, List, Optional
import uuid
from app.core.exceptions import NotFoundException, AppException
from app.modules.patients.schemas import Patient, PatientCreate, VitalSummary


class PatientService:
    def __init__(self):
        self._patients: Dict[str, Patient] = {}
        self._init_mock_beds()

    def _init_mock_beds(self):
        """Seed ICU ward patients matching dashboard telemetry monitors."""
        beds = [
            {
                "id": "p-101",
                "bed_number": "101",
                "full_name": "Nguyễn Văn An",
                "age": 45,
                "gender": "Nam",
                "diagnosis": "Theo dõi sau can thiệp đặt stent mạch vành",
                "doctor_in_charge": "BS.CKII Trần Minh Đức",
                "vitals": VitalSummary(bpm=72, spo2=99.0, blood_pressure="120/80", status="STABLE")
            },
            {
                "id": "p-102",
                "bed_number": "102",
                "full_name": "Trần Thị Mai",
                "age": 52,
                "gender": "Nữ",
                "diagnosis": "Suy tim độ II, theo dõi huyết áp lưu động",
                "doctor_in_charge": "BS.CKII Trần Minh Đức",
                "vitals": VitalSummary(bpm=84, spo2=97.5, blood_pressure="125/82", status="STABLE")
            },
            {
                "id": "p-103",
                "bed_number": "103",
                "full_name": "Lê Hoàng Nam",
                "age": 61,
                "gender": "Nam",
                "diagnosis": "Cơn nhịp nhanh kịch phát trên thất (Tachycardia)",
                "doctor_in_charge": "BS.CKII Trần Minh Đức",
                "vitals": VitalSummary(bpm=126, spo2=94.0, blood_pressure="145/95", status="CRITICAL")
            },
            {
                "id": "p-104",
                "bed_number": "104",
                "full_name": "Phạm Thu Hà",
                "age": 38,
                "gender": "Nữ",
                "diagnosis": "Rối loạn nhịp xoang nhẹ",
                "doctor_in_charge": "BS. Lê Thị Phương",
                "vitals": VitalSummary(bpm=68, spo2=99.0, blood_pressure="115/75", status="STABLE")
            },
        ]
        for b in beds:
            p = Patient(**b)
            self._patients[p.id] = p

    def get_all(self) -> List[Patient]:
        return list(self._patients.values())

    def get_by_id(self, patient_id: str) -> Patient:
        p = self._patients.get(patient_id)
        if not p:
            raise NotFoundException(f"Không tìm thấy bệnh nhân có mã {patient_id}")
        return p

    def create(self, data: PatientCreate) -> Patient:
        # Check if bed is already occupied
        existing = next((p for p in self._patients.values() if p.bed_number == data.bed_number), None)
        if existing:
            raise AppException(f"Giường {data.bed_number} hiện đã có bệnh nhân {existing.full_name}")

        new_id = f"p-{uuid.uuid4().hex[:6]}"
        p = Patient(
            id=new_id,
            bed_number=data.bed_number,
            full_name=data.full_name,
            age=data.age,
            gender=data.gender,
            diagnosis=data.diagnosis,
            doctor_in_charge=data.doctor_in_charge,
            is_monitored=True,
            vitals=VitalSummary(bpm=75, spo2=98.0, blood_pressure="120/80", status="STABLE")
        )
        self._patients[new_id] = p
        return p

    def update_vitals(self, patient_id: str, vitals: VitalSummary) -> Patient:
        p = self.get_by_id(patient_id)
        p.vitals = vitals
        return p


patient_service = PatientService()
