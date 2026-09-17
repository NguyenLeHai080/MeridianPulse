export type VitalStatus = 'STABLE' | 'WARNING' | 'CRITICAL';

export interface VitalSummary {
  bpm: number;
  spo2: number;
  blood_pressure: string;
  status: VitalStatus;
}

export interface Patient {
  id: string;
  bed_number: string;
  full_name: string;
  age: number;
  gender: string;
  diagnosis: string;
  doctor_in_charge: string;
  is_monitored: boolean;
  vitals: VitalSummary;
}

export interface TelemetryFrame {
  patient_id: string;
  bed_number: string;
  timestamp_ms: number;
  bpm: number;
  spo2: number;
  blood_pressure: string;
  ecg_voltage: number;
  status: VitalStatus;
}

export interface AlertItem {
  id: string;
  patient_id: string;
  bed_number: string;
  patient_name: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  description: string;
  value_recorded: string;
  is_acknowledged: boolean;
  timestamp: string;
}
