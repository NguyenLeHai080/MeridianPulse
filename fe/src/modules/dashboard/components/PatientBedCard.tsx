import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Patient } from '@/core/types/telemetry.types';
import { useTelemetryStore } from '@/store/telemetry.store';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Activity, Heart, User, Droplets, Gauge, ChevronRight } from 'lucide-react';

interface PatientBedCardProps {
  patient: Patient;
}

export const PatientBedCard: React.FC<PatientBedCardProps> = ({ patient }) => {
  const navigate = useNavigate();
  const setSelectedPatient = useTelemetryStore((state) => state.setSelectedPatient);

  const isCritical = patient.vitals.status === 'CRITICAL';
  const isWarning = patient.vitals.status === 'WARNING';

  const handleOpenTelemetry = () => {
    setSelectedPatient(patient.id);
    navigate('/telemetry');
  };

  return (
    <div
      className={`rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden ${
        isCritical
          ? 'bg-rose-950/20 border-rose-500/50 shadow-glow-rose'
          : isWarning
          ? 'bg-amber-950/20 border-amber-500/40'
          : 'bg-dark-900/80 border-white/10 hover:border-cyan-500/30'
      }`}
    >
      {/* Top Header: Bed and Status */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-mono font-bold text-white border border-white/10">
            ICU - {patient.bed_number}
          </span>
          <span className="text-sm font-semibold text-slate-200 truncate max-w-[150px] sm:max-w-[200px]">
            {patient.full_name}
          </span>
        </div>

        {isCritical ? (
          <Badge variant="critical" hasPulseDot>
            NGUY KỊCH
          </Badge>
        ) : isWarning ? (
          <Badge variant="warning" hasPulseDot>
            THEO DÕI
          </Badge>
        ) : (
          <Badge variant="stable">
            ỔN ĐỊNH
          </Badge>
        )}
      </div>

      {/* Patient Clinical Info */}
      <div className="text-xs text-slate-400 space-y-1 mb-4 pb-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3 text-slate-400" />
            {patient.gender}, {patient.age} tuổi
          </span>
          <span>•</span>
          <span className="truncate text-slate-300">
            {patient.doctor_in_charge}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 line-clamp-1 italic">
          Chẩn đoán: {patient.diagnosis}
        </p>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
        {/* Heart Rate */}
        <div className="p-2.5 rounded-xl bg-slate-800/60 border border-white/5 text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-1">
            <Heart className={`w-3.5 h-3.5 ${isCritical ? 'text-rose-400 animate-pulse' : 'text-rose-400'}`} />
            <span>Nhịp Tim</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-white">
            {patient.vitals.bpm}
            <span className="text-[10px] text-slate-400 font-normal ml-0.5">bpm</span>
          </div>
        </div>

        {/* SpO2 */}
        <div className="p-2.5 rounded-xl bg-slate-800/60 border border-white/5 text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-1">
            <Droplets className="w-3.5 h-3.5 text-cyan-400" />
            <span>SpO2</span>
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-cyan-300">
            {patient.vitals.spo2}%
          </div>
        </div>

        {/* Blood Pressure */}
        <div className="p-2.5 rounded-xl bg-slate-800/60 border border-white/5 text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-1">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span>Huyết Áp</span>
          </div>
          <div className="text-sm sm:text-base font-bold font-mono text-slate-200 mt-0.5">
            {patient.vitals.blood_pressure}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>WSS Live Stream</span>
        </div>

        <Button
          size="sm"
          variant={isCritical ? 'critical' : 'outline'}
          onClick={handleOpenTelemetry}
          className="text-xs"
        >
          Theo Dõi Điện Tâm Đồ <ChevronRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </div>
  );
};
