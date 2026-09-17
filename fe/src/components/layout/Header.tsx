import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Activity, LogOut, ShieldCheck, User as UserIcon, Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('vi-VN') + ' ICT');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-dark-900/90 border-b border-white/10 backdrop-blur-lg">
      {/* Brand & Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 lg:hidden transition-colors"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-glow-cyan">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-white">MeridianPulse</span>
            <Badge variant="cyan" className="hidden sm:inline-flex text-[10px]">
              v1.0.0 CORE
            </Badge>
          </div>
          <p className="text-xs text-slate-400">Clinical Vital Telemetry System</p>
        </div>
      </div>

      {/* Center Status Indicators */}
      <div className="hidden md:flex items-center gap-4">
        <Badge variant="stable" hasPulseDot>
          TELEMETRY ONLINE
        </Badge>
        <span className="font-mono text-xs text-slate-400">{timeStr}</span>
      </div>

      {/* User Session & Logout */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-slate-200">{user.full_name}</p>
              <div className="flex items-center justify-end gap-1">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                  {user.role}
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/15 flex items-center justify-center text-slate-300">
              <UserIcon className="w-5 h-5" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              title="Đăng xuất khỏi hệ thống"
              className="text-slate-400 hover:text-rose-400 p-2"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button size="sm" onClick={() => (window.location.href = '/login')}>
            Đăng Nhập
          </Button>
        )}
      </div>
    </header>
  );
};
