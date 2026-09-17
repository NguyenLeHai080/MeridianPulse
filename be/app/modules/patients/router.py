"""Patients Router - MeridianPulse Backend
Exposes /api/v1/patients endpoints.
"""

from typing import List
from fastapi import APIRouter, Depends, status
from app.core.dependencies import get_current_user, require_roles
from app.modules.auth.models import Role, User
from app.modules.patients.schemas import Patient, PatientCreate, PatientResponse, PatientListResponse
from app.modules.patients.service import patient_service

router = APIRouter(prefix="/patients", tags=["Patients & Beds Management"])


@router.get("", response_model=PatientListResponse, status_code=status.HTTP_200_OK)
async def list_patients(current_user: User = Depends(get_current_user)):
    """Lấy danh sách toàn bộ bệnh nhân đang theo dõi tại khu vực trực ca (Bác sĩ, Y tá, Admin)."""
    patients = patient_service.get_all()
    return PatientListResponse(success=True, total=len(patients), data=patients)


@router.get("/{patient_id}", response_model=PatientResponse, status_code=status.HTTP_200_OK)
async def get_patient_detail(patient_id: str, current_user: User = Depends(get_current_user)):
    """Lấy thông tin chi tiết một ca bệnh cụ thể theo mã ID."""
    p = patient_service.get_by_id(patient_id)
    return PatientResponse(success=True, data=p)


@router.post("", response_model=PatientResponse, status_code=status.HTTP_201_CREATED)
async def admit_patient(
    patient_data: PatientCreate,
    current_user: User = Depends(require_roles([Role.ADMIN, Role.DOCTOR]))
):
    """Tiếp nhận bệnh nhân mới vào giường bệnh khoa ICU (Yêu cầu quyền Bác sĩ hoặc Admin)."""
    p = patient_service.create(patient_data)
    return PatientResponse(success=True, data=p)
