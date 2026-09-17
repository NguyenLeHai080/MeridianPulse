import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  AlertTriangle, 
  Layers,
  X
} from 'lucide-react';
import { useAlertStore } from '@/store/alert.store';
import { Badge } from '@/components/common/Badge';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const alerts = useAlertStore((state) => state.alerts);
  const unacknowledgedCount = alerts.filter((a) => !a.is_acknowledged).length;

  const navItems = [
    {
      to: '/dashboard',
      label: 'ICU Overview',
      sublabel: 'Tổng quan buồng bệnh',
      icon: LayoutDashboard,
    },
    {
      to: '/telemetry',
      label: 'Live Telemetry',
      sublabel: 'Đồ thị ECG thời gian thực',
      icon: Activity,
    },
    {
      to: '/alerts',
      label: 'Alerts & Incidents',
      sublabel: 'Cảnh báo lâm sàng',
      icon: AlertTriangle,
      badge: unacknowledgedCount > 0 ? unacknowledgedCount : undefined,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 bg-dark-900 border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header (Mobile close button) */}
        <div>
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 lg:hidden">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-white tracking-wide">Meridian Nav</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List */}
          <div className="px-4 py-6">
            <p className="px-3 mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Phân Hệ Lâm Sàng (ICU)
            </p>
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? 'bg-cyan-500/10 text-cyan-300 font-semibold border border-cyan-500/30 shadow-inner'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-800/80 group-hover:bg-slate-700/80 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm tracking-tight">{item.label}</div>
                        <div className="text-[11px] text-slate-400 font-normal">
                          {item.sublabel}
                        </div>
                      </div>
                    </div>

                    {item.badge !== undefined && (
                      <Badge variant="critical" className="text-xs px-2 py-0.5">
                        {item.badge}
                      </Badge>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer: System Status */}
        <div className="p-4 m-4 rounded-2xl bg-slate-900/80 border border-white/10 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-slate-300">Bảo mật hệ thống</span>
            <Badge variant="emerald" className="text-[10px]">
              OWASP READY
            </Badge>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed mb-3">
            Toàn bộ luồng kết nối API và WebSocket được mã hóa chuẩn TLS/WSS và bảo vệ bởi Rate Limiting.
          </p>
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-white/5">
            <span>Sprint 02</span>
            <span>Module-Driven v1</span>
          </div>
        </div>
      </aside>
    </>
  );
};
