import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { Sparkles, Video, Share2, Zap } from 'lucide-react';
import { Badge } from '@/components/common/Badge';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Side: System Introduction & Security Highlights */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>PlenxAI Creator Platform 2.0</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Nền Tảng Sáng Tạo <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              Generative AI Video & Automation
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Tạo video điện ảnh với Google Veo 3.1 & Kling 2.0, sản xuất 3D Product TVC bán hàng, nhân bản người mẫu ảo Gacha KOLs và cào video TikTok không logo dịch ngược Prompt tự động.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Video className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white">Veo 3.1 & Kling 2.0</span>
              </div>
              <p className="text-[11px] text-slate-400">Tạo video từ Text & Image chất lượng 8K</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">TikTok Prompt Reverse</span>
              </div>
              <p className="text-[11px] text-slate-400">Dịch ngược Prompt từ video bắt trend</p>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>RunningHub ComfyUI Cloud</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Badge variant="cyan">Cloudflare R2 Zero-Egress</Badge>
            </div>
          </div>
        </div>

        {/* Right Side: Hardened Login Form */}
        <div className="lg:col-span-6 flex justify-center">
          <LoginForm />
        </div>
      </div>

      {/* Footer System Disclaimer */}
      <footer className="mt-8 text-center text-[11px] text-slate-400 z-10">
        © 2026 PlenxAI Technologies. All Rights Reserved. Protected by OWASP Anti-Intrusion Gateway.
      </footer>
    </div>
  );
};
