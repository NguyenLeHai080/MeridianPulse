import React, { useState } from 'react';
import { useAlertStore } from '@/store/alert.store';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { AlertTriangle, CheckCircle, Clock, Check, BellOff, BellRing, Filter } from 'lucide-react';

export const AlertsHistoryPage: React.FC = () => {
  const { alerts, isMuted, acknowledgeAlert, toggleMute } = useAlertStore();
  const [filter, setFilter] = useState<'ALL' | 'UNRESOLVED' | 'RESOLVED'>('ALL');

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'UNRESOLVED') return !alert.is_acknowledged;
    if (filter === 'RESOLVED') return alert.is_acknowledged;
    return true;
  });

  const unackCount = alerts.filter((a) => !a.is_acknowledged).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Nhật Ký Cảnh Báo Lâm Sàng (Clinical Alerts & Incidents)
            </h1>
            {unackCount > 0 && (
              <Badge variant="critical" hasPulseDot>
                {unackCount} CHƯA XỬ LÝ
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Theo dõi các sự cố bất thường về nhịp tim, tụt huyết áp và quá ngưỡng sinh tồn ICU
          </p>
        </div>

        {/* Mute and Control */}
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={toggleMute}
            className="text-xs"
          >
            {isMuted ? (
              <>
                <BellOff className="w-4 h-4 mr-1 text-rose-400" /> Đang Tắt Chuông
              </>
            ) : (
              <>
                <BellRing className="w-4 h-4 mr-1 text-emerald-400" /> Chuông Báo Đang Bật
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-2 rounded-xl bg-dark-900/60 border border-white/10 w-fit">
        <Filter className="w-4 h-4 text-slate-400 ml-2" />
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            filter === 'ALL'
              ? 'bg-cyan-500 text-white shadow-glow-cyan'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Tất Cả ({alerts.length})
        </button>
        <button
          onClick={() => setFilter('UNRESOLVED')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            filter === 'UNRESOLVED'
              ? 'bg-rose-500 text-white shadow-glow-rose'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Chưa Xử Lý ({unackCount})
        </button>
        <button
          onClick={() => setFilter('RESOLVED')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            filter === 'RESOLVED'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Đã Xác Nhận ({alerts.length - unackCount})
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => {
            const isCritical = alert.severity === 'CRITICAL';
            return (
              <div
                key={alert.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  !alert.is_acknowledged
                    ? isCritical
                      ? 'bg-rose-950/20 border-rose-500/50 shadow-glow-rose'
                      : 'bg-amber-950/20 border-amber-500/40'
                    : 'bg-dark-900/60 border-white/10 opacity-70'
                }`}
              >
                {/* Left: Info */}
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl mt-0.5 ${
                      isCritical
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-xs font-mono font-bold text-white border border-white/10">
                        Giường {alert.bed_number}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {alert.patient_name}
                      </span>
                      {isCritical ? (
                        <Badge variant="critical">NGUY CẤP</Badge>
                      ) : (
                        <Badge variant="warning">CẢNH BÁO</Badge>
                      )}
                      {alert.is_acknowledged && (
                        <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Đã xác nhận xử lý
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-semibold text-slate-200">{alert.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{alert.description}</p>

                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400 font-mono">
                      <span>Giá trị ghi nhận: <b className="text-white">{alert.value_recorded}</b></span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 sm:self-center">
                  {!alert.is_acknowledged ? (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="text-xs w-full sm:w-auto"
                    >
                      <Check className="w-3.5 h-3.5 mr-1" /> Xác Nhận Tiếp Nhận
                    </Button>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Hoàn tất xử lý</span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center rounded-2xl bg-dark-900/40 border border-white/5">
            <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm text-slate-300 font-medium">Không có cảnh báo lâm sàng nào theo bộ lọc.</p>
            <p className="text-xs text-slate-400 mt-1">Tất cả bệnh nhân đang được giám sát an toàn.</p>
          </div>
        )}
      </div>
    </div>
  );
};
