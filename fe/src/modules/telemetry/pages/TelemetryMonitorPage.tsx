import React, { useState } from 'react';
import { useLiveTelemetry } from '@/hooks/useLiveTelemetry';
import { useAlertStore } from '@/store/alert.store';
import { EcgCanvas } from '../components/EcgCanvas';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { 
  Heart, 
  Droplets, 
  Gauge, 
  Wind, 
  Thermometer, 
  Volume2, 
  VolumeX, 
  AlertCircle,
  FileCheck,
  ShieldCheck
} from 'lucide-react';

export const TelemetryMonitorPage: React.FC = () => {
  const { patients, selectedPatient, setSelectedPatient } = useLiveTelemetry();
  const { isMuted, toggleMute } = useAlertStore();
  const [recordedSuccess, setRecordedSuccess] = useState(false);

  const isCritical = selectedPatient?.vitals.status === 'CRITICAL';

  const handleRecordSnapshot = () => {
    setRecordedSuccess(true);
    setTimeout(() => setRecordedSuccess(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Patient Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-white/10">
        {patients.map((p) => {
          const isSelected = p.id === selectedPatient?.id;
          const isPatientCritical = p.vitals.status === 'CRITICAL';

          return (
            <button
              key={p.id}
              onClick={() => setSelectedPatient(p.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-cyan-500 text-white shadow-glow-cyan'
                  : 'bg-dark-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/5'
              }`}
            >
              <span>Giường {p.bed_number}</span>
              <span className="font-normal opacity-90 truncate max-w-[120px]">
                {p.full_name}
              </span>
              {isPatientCritical && (
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Patient Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-dark-900/80 border border-white/10 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-xs font-mono font-bold text-cyan-400 border border-cyan-500/20">
              ICU - {selectedPatient?.bed_number}
            </span>
            <h2 className="text-lg font-bold text-white">{selectedPatient?.full_name}</h2>
            {isCritical ? (
              <Badge variant="critical" hasPulseDot>
                NGUY KỊCH
              </Badge>
            ) : (
              <Badge variant="stable">ỔN ĐỊNH</Badge>
            )}
          </div>
          <p className="text-xs text-slate-400">
            {selectedPatient?.gender}, {selectedPatient?.age} tuổi • Chẩn đoán: {selectedPatient?.diagnosis} • Bác sĩ phụ trách: {selectedPatient?.doctor_in_charge}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleMute}
            className="text-slate-400 hover:text-white"
            title={isMuted ? 'Bật âm thanh cảnh báo' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </Button>

          <Button
            size="sm"
            variant={recordedSuccess ? 'emerald' : 'outline'}
            onClick={handleRecordSnapshot}
            className="text-xs"
          >
            <FileCheck className="w-3.5 h-3.5 mr-1" />
            {recordedSuccess ? 'Đã Lưu Bản Đo!' : 'Ghi Đo 10 Giây'}
          </Button>
        </div>
      </div>

      {/* Central Telemetry HUD Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left / Center: ECG Canvas Waveform (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Main Lead II Waveform */}
          <div className="h-72 sm:h-80 relative rounded-2xl bg-dark-950 p-2 border border-white/10 shadow-2xl">
            <EcgCanvas
              bpm={selectedPatient?.vitals.bpm || 75}
              isCritical={isCritical}
              leadName="CHUYỂN ĐẠO II (Lead II) • 25mm/s 10mm/mV • Filter: 0.05-150Hz"
            />
          </div>

          {/* Secondary Lead / Pleth Waveform */}
          <div className="h-44 relative rounded-2xl bg-dark-950 p-2 border border-white/10 shadow-2xl">
            <EcgCanvas
              bpm={selectedPatient?.vitals.bpm || 75}
              isCritical={false}
              leadName="CHUYỂN ĐẠO V1 (Lead V1) • Phân tích ST-Segment & Phức bộ QRS"
            />
          </div>
        </div>

        {/* Right: Digital Real-Time Readouts HUD (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          {/* Heart Rate */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              isCritical
                ? 'bg-rose-950/30 border-rose-500/60 shadow-glow-rose'
                : 'bg-dark-900/80 border-white/10'
            }`}
          >
            <div className="flex items-center justify-between mb-1 text-slate-400">
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <Heart className={`w-4 h-4 ${isCritical ? 'text-rose-400 animate-ping' : 'text-rose-400'}`} />
                <span>NHỊP TIM (HR)</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">NGƯỠNG: 60 - 100</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
                {selectedPatient?.vitals.bpm}
              </span>
              <span className="text-sm font-semibold text-slate-400">BPM</span>
            </div>
            {isCritical && (
              <p className="mt-2 text-[11px] text-rose-300 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Nhịp nhanh thất kịch phát (Tachycardia)!</span>
              </p>
            )}
          </div>

          {/* SpO2 */}
          <div className="p-4 rounded-2xl bg-dark-900/80 border border-white/10">
            <div className="flex items-center justify-between mb-1 text-slate-400">
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <span>ĐỘ BÃOHÒA OXY (SpO2)</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">NGƯỠNG: &gt; 95%</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-cyan-300 tracking-tight">
                {selectedPatient?.vitals.spo2}
              </span>
              <span className="text-sm font-semibold text-slate-400">%</span>
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="p-4 rounded-2xl bg-dark-900/80 border border-white/10">
            <div className="flex items-center justify-between mb-1 text-slate-400">
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <Gauge className="w-4 h-4 text-amber-400" />
                <span>HUYẾT ÁP KHÔNG XÂM LẤN (NIBP)</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">mmHg</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-300 tracking-tight">
                {selectedPatient?.vitals.blood_pressure}
              </span>
              <span className="text-xs font-medium text-slate-400">SYS / DIA</span>
            </div>
          </div>

          {/* Secondary Vitals (Resp + Temp) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-dark-900/80 border border-white/10">
              <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-1">
                <Wind className="w-3.5 h-3.5 text-teal-400" />
                <span>Nhịp Thở</span>
              </div>
              <div className="text-xl font-bold font-mono text-white">
                18 <span className="text-[10px] text-slate-400">rpm</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-dark-900/80 border border-white/10">
              <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-1">
                <Thermometer className="w-3.5 h-3.5 text-orange-400" />
                <span>Thân Nhiệt</span>
              </div>
              <div className="text-xl font-bold font-mono text-white">
                37.1 <span className="text-[10px] text-slate-400">°C</span>
              </div>
            </div>
          </div>

          {/* Security & Device Connection */}
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>TLS WSS Encrypted</span>
            </span>
            <span>Lead II Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
