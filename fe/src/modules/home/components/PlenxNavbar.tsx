import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { 
  Sparkles, 
  Video, 
  Shirt, 
  Flame, 
  BookOpen, 
  Smartphone, 
  Coins, 
  Plus, 
  LogOut
} from 'lucide-react';

export const PlenxNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070b14]/90 backdrop-blur-md border-b border-white/5 px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Logo & Main Nav Links */}
        <div className="flex items-center gap-8">
          {/* PlenX Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            {/* PlenX Flower / Asterisk Icon */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 flex items-center justify-center shadow-glow-pink">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              Plen<span className="text-fuchsia-400">X</span>
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <Link
              to="/studio"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Studio</span>
            </Link>

            <Link
              to="/studio"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Video className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tạo Video</span>
            </Link>

            <Link
              to="/fast-apps"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Shirt className="w-3.5 h-3.5 text-pink-400" />
              <span>Thời Trang AI</span>
            </Link>

            <Link
              to="/fast-apps"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>AI See Dance</span>
            </Link>

            <a
              href="#models"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hướng dẫn</span>
            </a>
          </nav>
        </div>

        {/* Right: Download App, Credits Balance, User Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Download App Button */}
          <button
            type="button"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 transition-colors"
          >
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tải ứng dụng</span>
          </button>

          {/* Credits Counter Pill */}
          <div
            onClick={() => navigate('/billing')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 hover:border-amber-500/60 cursor-pointer transition-all shadow-inner"
          >
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-bold font-mono text-amber-300">
              {user ? user.credit_balance.toLocaleString() : '100'}
            </span>
            <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-colors ml-0.5">
              <Plus className="w-3 h-3" />
            </div>
          </div>

          {/* User Session Profile / Login */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <img
                src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={user.full_name}
                className="w-7 h-7 rounded-full border border-fuchsia-500/40 object-cover"
              />
              <span className="text-xs font-semibold text-slate-200 hidden md:inline truncate max-w-[120px]">
                {user.full_name}
              </span>
              <button
                type="button"
                onClick={logout}
                title="Đăng xuất"
                className="p-1 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white text-xs font-bold shadow-glow-pink hover:opacity-95 transition-opacity"
            >
              Đăng Nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
