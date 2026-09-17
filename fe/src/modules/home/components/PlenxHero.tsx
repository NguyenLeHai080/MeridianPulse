import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Coins, Flame, Crown, Zap } from 'lucide-react';

interface PlenxHeroProps {
  filter: 'ALL' | 'VIDEO' | 'IMAGE';
  onFilterChange: (f: 'ALL' | 'VIDEO' | 'IMAGE') => void;
}

export const PlenxHero: React.FC<PlenxHeroProps> = ({ filter, onFilterChange }) => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-10 pb-8 sm:pt-14 sm:pb-12 text-center px-4 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-fuchsia-600/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-5">
        {/* Top Release Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16122a] border border-purple-500/40 text-xs text-purple-300 shadow-glow-purple">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span className="font-medium">Phiên bản See Dance 3.1 &amp; Model 7.0 ra mắt</span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          AI Creative{' '}
          <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Studio
          </span>
        </h1>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {/* Green Button: Tạo ảnh MIỄN PHÍ */}
          <button
            type="button"
            onClick={() => navigate('/studio')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs sm:text-sm shadow-glow-green hover:scale-105 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Tạo ảnh MIỄN PHÍ</span>
          </button>

          {/* Cyan Button: Tạo Video chỉ 200đ / video */}
          <button
            type="button"
            onClick={() => navigate('/studio')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs sm:text-sm shadow-glow-cyan hover:scale-105 transition-all"
          >
            <Coins className="w-4 h-4" />
            <span>Tạo Video chỉ 200đ / video</span>
          </button>
        </div>

        {/* Sub Feature Badge Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs font-medium">
          {/* Hot Products */}
          <button
            type="button"
            onClick={() => navigate('/fast-apps')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 hover:bg-amber-500/20 transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Sản phẩm hot nhất tuần này &gt;</span>
          </button>

          {/* 3D Demo */}
          <button
            type="button"
            onClick={() => navigate('/fast-apps')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-fuchsia-950/40 border border-fuchsia-500/30 text-fuchsia-300 hover:bg-fuchsia-900/40 transition-colors"
          >
            <Crown className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>Xem demo 3D - Khử tạp âm</span>
          </button>

          {/* Free 10 video */}
          <button
            type="button"
            onClick={() => navigate('/studio')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-white/10 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Miễn phí 10 lượt tạo video</span>
          </button>
        </div>

        {/* Filter Tabs (Tất cả, Video, Ảnh) */}
        <div className="pt-4 flex justify-center">
          <div className="inline-flex items-center p-1 rounded-full bg-slate-900 border border-white/10">
            <button
              type="button"
              onClick={() => onFilterChange('ALL')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === 'ALL'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white shadow-glow-pink'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tất cả
            </button>
            <button
              type="button"
              onClick={() => onFilterChange('VIDEO')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === 'VIDEO'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white shadow-glow-pink'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Video
            </button>
            <button
              type="button"
              onClick={() => onFilterChange('IMAGE')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === 'IMAGE'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white shadow-glow-pink'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ảnh
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
