import React from 'react';
import { useAdminStore } from '@/store/admin.store';
import { Badge } from '@/components/common/Badge';
import { 
  Shield, 
  Server, 
  Cpu, 
  Key, 
  RefreshCw 
} from 'lucide-react';

export const AdminConsolePage: React.FC = () => {
  const { proxies, upstreamAccounts, runningHubApps, toggleProxy, refreshLatency } = useAdminStore();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <Shield className="w-6 h-6 text-amber-400" />
              <span>PlenxAI Admin Operations & Infrastructure Console</span>
            </h1>
            <Badge variant="warning">ADMIN ONLY</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Quản trị trang trại Proxy xoay vòng, Quản lý Token Pool nhà cung cấp và Kết nối RunningHub ComfyUI
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-dark-900 border border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Tổng Số Creators</span>
          <span className="text-2xl font-bold font-mono text-white">1,284</span>
          <span className="text-[10px] text-emerald-400 block mt-1">+14% tuần này</span>
        </div>

        <div className="p-4 rounded-2xl bg-dark-900 border border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Video Đã Sinh Ra</span>
          <span className="text-2xl font-bold font-mono text-cyan-300">18,490</span>
          <span className="text-[10px] text-cyan-400 block mt-1">Veo 3.1 & Kling 2.0</span>
        </div>

        <div className="p-4 rounded-2xl bg-dark-900 border border-white/10">
          <span className="text-xs text-slate-400 block mb-1">Proxy Farm Nodes</span>
          <span className="text-2xl font-bold font-mono text-emerald-400">5 / 5 Alive</span>
          <span className="text-[10px] text-slate-400 block mt-1">Độ trễ trung bình: 77ms</span>
        </div>

        <div className="p-4 rounded-2xl bg-dark-900 border border-white/10">
          <span className="text-xs text-slate-400 block mb-1">RunningHub Workflows</span>
          <span className="text-2xl font-bold font-mono text-purple-300">3 Ready</span>
          <span className="text-[10px] text-purple-400 block mt-1">ComfyUI Cloud GPU</span>
        </div>
      </div>

      {/* Section 1: Rotating Proxy Farm Manager */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <span>Trang Trại Proxy Xoay Vòng (Residential / Datacenter Proxy Farm):</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">Tự động Anti-Detection & Bypassing</span>
        </div>

        <div className="rounded-2xl bg-dark-900/80 border border-white/10 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-mono text-[10px] border-b border-white/5">
              <tr>
                <th className="py-3 px-4">Node ID</th>
                <th className="py-3 px-4">Địa Chỉ IP & Port</th>
                <th className="py-3 px-4">Giao Thức</th>
                <th className="py-3 px-4">Vị Trí Quốc Gia</th>
                <th className="py-3 px-4">Độ Trễ (Ping)</th>
                <th className="py-3 px-4">Tỷ Lệ Sống</th>
                <th className="py-3 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {proxies.map((px) => (
                <tr key={px.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{px.id}</td>
                  <td className="py-3 px-4 text-cyan-300">
                    {px.ip_address}:{px.port}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {px.protocol}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-sans text-slate-300">{px.location}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-bold ${
                        px.latency_ms < 50
                          ? 'text-emerald-400'
                          : px.latency_ms < 100
                          ? 'text-amber-400'
                          : 'text-slate-300'
                      }`}
                    >
                      {px.latency_ms} ms
                    </span>
                  </td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">{px.success_rate}%</td>
                  <td className="py-3 px-4 text-right font-sans">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => refreshLatency(px.id)}
                        className="p-1 rounded text-slate-400 hover:text-white"
                        title="Kiểm tra lại độ trễ"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleProxy(px.id)}
                        className={`px-2 py-1 rounded text-[11px] font-bold ${
                          px.is_alive
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {px.is_alive ? 'Hoạt động' : 'Tạm dừng'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Upstream Account & Token Pool */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Key className="w-4 h-4 text-cyan-400" />
          <span>Hồ Tài Khoản & Token Nhà Cung Cấp (Upstream Account Pool):</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upstreamAccounts.map((acc) => (
            <div key={acc.id} className="p-4 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{acc.provider}</span>
                <Badge variant="emerald" className="text-[10px]">
                  {acc.session_status}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 font-mono truncate">{acc.account_email}</p>
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                <span className="text-slate-400">Số dư Upstream:</span>
                <span className="font-mono text-amber-300 font-bold">
                  {acc.credits_remaining.toLocaleString()} credits
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: RunningHub ComfyUI Cloud Workflows */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>Quy Trình ComfyUI Kết Nối Qua RunningHub Bridge:</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {runningHubApps.map((app) => (
            <div key={app.id} className="p-4 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{app.name}</span>
                <Badge variant="cyan" className="text-[10px]">
                  {app.status}
                </Badge>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">ID: {app.comfy_app_id}</p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Số Node: {app.node_count}</span>
                <span>Thời gian: ~{app.avg_execution_sec}s</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
