import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Video, 
  ShoppingBag, 
  Mic2, 
  Share2, 
  CreditCard, 
  Shield, 
  Cpu, 
  X
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { Badge } from '@/components/common/Badge';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === 'ADMIN';

  const menuGroups = [
    {
      title: 'AI Studios',
      items: [
        {
          to: '/studio',
          label: 'AI Video Studio',
          desc: 'Veo 3.1 & Kling 2.0 T2V/I2V',
          icon: Video,
          badge: 'HOT',
        },
        {
          to: '/fast-apps',
          label: 'Fast Apps Studio',
          desc: 'Product TVC 3D & Gacha KOLs',
          icon: ShoppingBag,
        },
        {
          to: '/voice',
          label: 'Voice & Audio Studio',
          desc: 'Nhân bản giọng nói F5-TTS',
          icon: Mic2,
        },
      ],
    },
    {
      title: 'Social & Creator Tools',
      items: [
        {
          to: '/tiktok-tools',
          label: 'TikTok Prompt Tool',
          desc: 'Tải không logo & dịch ngược Prompt',
          icon: Share2,
          badge: 'NEW',
        },
      ],
    },
    {
      title: 'Tài Chính & Quản Trị',
      items: [
        {
          to: '/billing',
          label: 'Mua Thêm Credits',
          desc: 'Bảng giá gói & lịch sử nạp',
          icon: CreditCard,
        },
        ...(isAdmin
          ? [
              {
                to: '/admin',
                label: 'Admin Operations',
                desc: 'Proxy Farm & RunningHub Pool',
                icon: Shield,
                badge: 'ADMIN',
              },
            ]
          : []),
      ],
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
        {/* Navigation Sections */}
        <div className="overflow-y-auto py-5 px-3.5 space-y-6">
          {/* Mobile close button */}
          <div className="flex items-center justify-between px-2 pb-2 border-b border-white/10 lg:hidden">
            <span className="text-sm font-bold text-white">Menu PlenxAI</span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {menuGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <p className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {group.title}
              </p>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                          isActive
                            ? 'bg-violet-600/20 text-cyan-300 font-semibold border border-cyan-500/30 shadow-inner'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-slate-800/80 group-hover:bg-slate-700 transition-colors">
                          <Icon className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm tracking-tight">{item.label}</div>
                          <div className="text-[10px] text-slate-400 font-normal truncate max-w-[135px]">
                            {item.desc}
                          </div>
                        </div>
                      </div>

                      {item.badge && (
                        <Badge
                          variant={item.badge === 'HOT' ? 'critical' : item.badge === 'ADMIN' ? 'warning' : 'cyan'}
                          className="text-[10px] px-1.5 py-0.2"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom Card: Upstream GPU Engine Status */}
        <div className="p-3.5 m-3 rounded-2xl bg-gradient-to-br from-slate-900 via-dark-900 to-indigo-950/40 border border-white/10 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-slate-200">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Hạ Tầng GPU Ngầm</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-2.5">
            Kết nối RunningHub ComfyUI Cloud & Cloudflare R2 Zero-Egress Storage.
          </p>
          <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono pt-2 border-t border-white/5">
            <span>Cluster: ASIA-SG01</span>
            <span>Latency: 28ms</span>
          </div>
        </div>
      </aside>
    </>
  );
};
