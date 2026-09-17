import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { Activity, ShieldCheck, Zap, HeartPulse } from 'lucide-react';
import { Badge } from '@/components/common/Badge';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Side: System Introduction & Security Highlights */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>MeridianPulse Clinical Architecture 2.0</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Nền Tảng Giám Sát <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Chỉ Số Sinh Tồn ICU
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Hệ thống phân tích sóng điện tâm đồ (ECG) thời gian thực, đo lường SpO2, huyết áp và tự động kích hoạt cảnh báo sốc nhiễm khuẩn lâm sàng theo chuẩn y tế.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white">60 FPS Telemetry</span>
              </div>
              <p className="text-[11px] text-slate-400">Stream dữ liệu ECG mượt mà qua WebSocket</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Zero-Trust RBAC</span>
              </div>
              <p className="text-[11px] text-slate-400">Phân quyền Doctor, Nurse, Admin nghiêm ngặt</p>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span>HL7 / FHIR Compatible</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Badge variant="cyan">ISO 27001 Ready</Badge>
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
        © 2026 MeridianPulse Medical Systems. All Rights Reserved. Protected by OWASP Hardened Security Layer.
      </footer>
    </div>
  );
};
