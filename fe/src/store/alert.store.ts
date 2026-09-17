import { create } from 'zustand';
import { AlertItem } from '@/core/types/telemetry.types';

interface AlertStoreState {
  alerts: AlertItem[];
  isMuted: boolean;
  acknowledgeAlert: (id: string) => void;
  toggleMute: () => void;
}

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-001',
    patient_id: 'p-103',
    bed_number: '103',
    patient_name: 'Lê Hoàng Nam',
    severity: 'CRITICAL',
    title: 'Cảnh Báo Nhịp Nhanh Kịch Phát (Tachycardia)',
    description: 'Nhịp tim bệnh nhân vượt ngưỡng an toàn liên tục (> 120 BPM)',
    value_recorded: '126 BPM',
    is_acknowledged: false,
    timestamp: 'Vừa xong',
  },
];

export const useAlertStore = create<AlertStoreState>((set) => ({
  alerts: INITIAL_ALERTS,
  isMuted: false,

  acknowledgeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id ? { ...a, is_acknowledged: true } : a
      ),
    })),

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
}));
