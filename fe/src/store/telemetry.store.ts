import { create } from 'zustand';
import { Patient, VitalSummary } from '@/core/types/telemetry.types';

interface TelemetryStoreState {
  patients: Patient[];
  selectedPatientId: string;
  isStreaming: boolean;
  setPatients: (patients: Patient[]) => void;
  updatePatientVital: (patientId: string, vitals: VitalSummary) => void;
  setSelectedPatient: (id: string) => void;
  toggleStreaming: () => void;
}

const INITIAL_MOCK_PATIENTS: Patient[] = [
  {
    id: 'p-101',
    bed_number: '101',
    full_name: 'Nguyễn Văn An',
    age: 45,
    gender: 'Nam',
    diagnosis: 'Theo dõi sau can thiệp đặt stent mạch vành',
    doctor_in_charge: 'BS.CKII Trần Minh Đức',
    is_monitored: true,
    vitals: { bpm: 72, spo2: 99.0, blood_pressure: '120/80', status: 'STABLE' },
  },
  {
    id: 'p-102',
    bed_number: '102',
    full_name: 'Trần Thị Mai',
    age: 52,
    gender: 'Nữ',
    diagnosis: 'Suy tim độ II, theo dõi huyết áp lưu động',
    doctor_in_charge: 'BS.CKII Trần Minh Đức',
    is_monitored: true,
    vitals: { bpm: 84, spo2: 97.5, blood_pressure: '125/82', status: 'STABLE' },
  },
  {
    id: 'p-103',
    bed_number: '103',
    full_name: 'Lê Hoàng Nam',
    age: 61,
    gender: 'Nam',
    diagnosis: 'Cơn nhịp nhanh kịch phát trên thất (Tachycardia)',
    doctor_in_charge: 'BS.CKII Trần Minh Đức',
    is_monitored: true,
    vitals: { bpm: 126, spo2: 94.0, blood_pressure: '145/95', status: 'CRITICAL' },
  },
  {
    id: 'p-104',
    bed_number: '104',
    full_name: 'Phạm Thu Hà',
    age: 38,
    gender: 'Nữ',
    diagnosis: 'Rối loạn nhịp xoang nhẹ',
    doctor_in_charge: 'BS. Lê Thị Phương',
    is_monitored: true,
    vitals: { bpm: 68, spo2: 99.0, blood_pressure: '115/75', status: 'STABLE' },
  },
];

export const useTelemetryStore = create<TelemetryStoreState>((set) => ({
  patients: INITIAL_MOCK_PATIENTS,
  selectedPatientId: 'p-101',
  isStreaming: true,

  setPatients: (patients) => set({ patients }),

  updatePatientVital: (patientId, vitals) =>
    set((state) => ({
      patients: state.patients.map((p) =>
        p.id === patientId ? { ...p, vitals } : p
      ),
    })),

  setSelectedPatient: (id) => set({ selectedPatientId: id }),

  toggleStreaming: () => set((state) => ({ isStreaming: !state.isStreaming })),
}));
