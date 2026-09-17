import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAlertStore } from '@/store/alert.store';
import { AlertTriangle, X } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const alerts = useAlertStore((state) => state.alerts);
  const acknowledgeAlert = useAlertStore((state) => state.acknowledgeAlert);

  const activeCriticalAlert = alerts.find(
    (a) => a.severity === 'CRITICAL' && !a.is_acknowledged
  );

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Critical Alert Marquee Notification */}
      {activeCriticalAlert && (
        <div className="bg-rose-600/90 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between animate-pulse sticky top-0 z-40 shadow-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>
              CẢNH BÁO KHẨN CẤP: {activeCriticalAlert.title} - {activeCriticalAlert.description} (Giường {activeCriticalAlert.bed_number})
            </span>
          </div>
          <button
            onClick={() => acknowledgeAlert(activeCriticalAlert.id)}
            className="px-2 py-0.5 bg-black/30 hover:bg-black/50 rounded flex items-center gap-1 transition-colors text-[11px]"
          >
            <X className="w-3 h-3" /> Xác nhận đã xử lý
          </button>
        </div>
      )}

      {/* Top Header Navigation */}
      <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
