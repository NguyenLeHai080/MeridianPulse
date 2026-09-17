import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { 
  Sparkles, 
  Coins, 
  LogOut, 
  Menu, 
  PlusCircle 
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 bg-dark-900/90 border-b border-white/10 backdrop-blur-xl">
      {/* Brand & Mobile Hamburger */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 lg:hidden transition-colors"
            aria-label="Mở thanh điều hướng"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div
          onClick={() => navigate('/studio')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 shadow-glow-cyan group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white">
                Plenx<span className="text-cyan-400">AI</span>
              </span>
              <Badge variant="cyan" className="hidden sm:inline-flex text-[10px] py-0.5">
                STUDIO v2.0
              </Badge>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Generative AI Creator Platform</p>
          </div>
        </div>
      </div>

      {/* Center: System AI Engine Status */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/60 border border-white/5 text-xs text-slate-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-medium">Upstream AI:</span>
        <span className="text-cyan-300 font-mono">Google Veo 3.1 & Kling 2.0 Ready</span>
      </div>

      {/* Right: Credits Wallet & Profile */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            {/* Credit Balance Pill */}
            <div
              onClick={() => navigate('/billing')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-transparent border border-amber-500/30 hover:border-amber-500/60 cursor-pointer transition-all shadow-inner group"
              title="Nhấn để xem bảng giá và nạp thêm Credits"
            >
              <Coins className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <div className="text-xs">
                <span className="font-extrabold font-mono text-amber-300">
                  {user.credit_balance.toLocaleString()}
                </span>
                <span className="text-[10px] text-amber-400/80 ml-1 font-medium hidden sm:inline">
                  Credits
                </span>
              </div>
              <PlusCircle className="w-3.5 h-3.5 text-amber-400/80 group-hover:text-amber-300 ml-0.5" />
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <img
                src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={user.full_name}
                className="w-8 h-8 rounded-full border border-cyan-400/40 object-cover"
              />
              <div className="text-left hidden lg:block">
                <p className="text-xs font-semibold text-white leading-none truncate max-w-[130px]">
                  {user.full_name}
                </p>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                  {user.role}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                title="Đăng xuất"
                className="p-1.5 text-slate-400 hover:text-rose-400"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </>
        ) : (
          <Button size="sm" onClick={() => navigate('/login')}>
            Đăng Nhập
          </Button>
        )}
      </div>
    </header>
  );
};
