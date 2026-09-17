import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiveTelemetry } from '@/hooks/useLiveTelemetry';
import { KpiSummaryGrid } from '../components/KpiSummaryGrid';
import { PatientBedGrid } from '../components/PatientBedGrid';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Activity, Play, Pause, ExternalLink } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { isStreaming, toggleStreaming } = useLiveTelemetry();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Trung Tâm Giám Sát ICU (Intensive Care Unit)
            </h1>
            <Badge variant="cyan" hasPulseDot>
              REALTIME
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Dữ liệu sinh hiệu tập trung từ 04 buồng bệnh cấp cứu - Cập nhật liên tục 24/7
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <Button
            variant={isStreaming ? 'outline' : 'primary'}
            size="sm"
            onClick={toggleStreaming}
            className="text-xs"
          >
            {isStreaming ? (
              <>
                <Pause className="w-3.5 h-3.5 mr-1" /> Tạm Dừng Stream
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 mr-1" /> Tiếp Tục Stream
              </>
            )}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/telemetry')}
            className="text-xs"
          >
            <Activity className="w-3.5 h-3.5 mr-1" /> Mở ECG Fullscreen
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <KpiSummaryGrid />

      {/* Patient Beds Overview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-white tracking-tight">
            Danh Sách Buồng Bệnh Cấp Cứu
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Giao thức: HL7 / FHIR IoT Stream
          </span>
        </div>
        <PatientBedGrid />
      </div>
    </div>
  );
};
