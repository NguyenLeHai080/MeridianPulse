import React from 'react';
import { useTelemetryStore } from '@/store/telemetry.store';
import { Activity, AlertTriangle, BedDouble, CheckCircle2, HeartPulse } from 'lucide-react';

export const KpiSummaryGrid: React.FC = () => {
  const patients = useTelemetryStore((state) => state.patients);

  const totalPatients = patients.length;
  const stableCount = patients.filter((p) => p.vitals.status === 'STABLE').length;
  const criticalCount = patients.filter((p) => p.vitals.status === 'CRITICAL').length;
  const warningCount = patients.filter((p) => p.vitals.status === 'WARNING').length;

  const avgBpm =
    totalPatients > 0
      ? Math.round(patients.reduce((acc, p) => acc + p.vitals.bpm, 0) / totalPatients)
      : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {/* Total Monitored Beds */}
      <div className="p-4 rounded-2xl bg-dark-900/80 border border-white/10 backdrop-blur-md relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">Giường ICU Đang Giám Sát</span>
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
            <BedDouble className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-white">{totalPatients}</span>
          <span className="text-xs text-slate-400 font-mono">/ 04 Đang kích hoạt</span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-cyan-400 font-medium">
          <Activity className="w-3 h-3 animate-pulse" />
          <span>Stream dữ liệu 100% online</span>
        </div>
      </div>

      {/* Stable Patients */}
      <div className="p-4 rounded-2xl bg-dark-900/80 border border-white/10 backdrop-blur-md relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">Chỉ Số Ổn Định (Normal)</span>
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{stableCount}</span>
          <span className="text-xs text-slate-400">Bệnh nhân</span>
        </div>
        <div className="mt-2 text-[11px] text-emerald-400/90 font-medium">
          Dấu hiệu sinh tồn trong ngưỡng
        </div>
      </div>

      {/* Critical Patients */}
      <div className="p-4 rounded-2xl bg-dark-900/80 border border-white/10 backdrop-blur-md relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">Cần Bác Sĩ Xử Lý Gấp</span>
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
            <AlertTriangle className="w-4 h-4 animate-bounce" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-rose-400">{criticalCount}</span>
          <span className="text-xs text-slate-400">Nguy kịch ({warningCount} cảnh báo)</span>
        </div>
        <div className="mt-2 text-[11px] text-rose-400 font-medium flex items-center gap-1">
          <span>Giường 103: Rối loạn nhịp</span>
        </div>
      </div>

      {/* Average Unit Heart Rate */}
      <div className="p-4 rounded-2xl bg-dark-900/80 border border-white/10 backdrop-blur-md relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">Nhịp Tim Trung Bình Khoa</span>
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
            <HeartPulse className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-white">{avgBpm}</span>
          <span className="text-xs text-slate-400 font-mono">BPM</span>
        </div>
        <div className="mt-2 text-[11px] text-purple-400 font-medium">
          Phân bố nhịp tim bình quân
        </div>
      </div>
    </div>
  );
};
