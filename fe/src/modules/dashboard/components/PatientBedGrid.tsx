import React, { useState } from 'react';
import { useTelemetryStore } from '@/store/telemetry.store';
import { PatientBedCard } from './PatientBedCard';
import { VitalStatus } from '@/core/types/telemetry.types';
import { Search, Filter, Layers } from 'lucide-react';

export const PatientBedGrid: React.FC = () => {
  const patients = useTelemetryStore((state) => state.patients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | VitalStatus>('ALL');

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.bed_number.includes(searchTerm) ||
      p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      statusFilter === 'ALL' || p.vitals.status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      {/* Control Bar: Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-dark-900/60 border border-white/10 backdrop-blur-md">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên bệnh nhân, số giường (101-104), chẩn đoán..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-white/10 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <div className="hidden sm:flex items-center gap-1 text-slate-400 text-xs mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Lọc:</span>
          </div>

          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              statusFilter === 'ALL'
                ? 'bg-cyan-500 text-white shadow-glow-cyan'
                : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            Tất Cả ({patients.length})
          </button>

          <button
            onClick={() => setStatusFilter('STABLE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              statusFilter === 'STABLE'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            Ổn Định
          </button>

          <button
            onClick={() => setStatusFilter('WARNING')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              statusFilter === 'WARNING'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            Cảnh Báo
          </button>

          <button
            onClick={() => setStatusFilter('CRITICAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              statusFilter === 'CRITICAL'
                ? 'bg-rose-600 text-white'
                : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            Nguy Kịch
          </button>
        </div>
      </div>

      {/* Grid of Bed Cards */}
      {filteredPatients.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredPatients.map((patient) => (
            <PatientBedCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center rounded-2xl bg-dark-900/40 border border-white/5">
          <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-400">Không tìm thấy bệnh nhân phù hợp với điều kiện tìm kiếm.</p>
        </div>
      )}
    </div>
  );
};
