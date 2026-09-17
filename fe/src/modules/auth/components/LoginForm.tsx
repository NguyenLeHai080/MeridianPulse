import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '../services/authService';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Badge } from '@/components/common/Badge';
import { Lock, ShieldAlert, Sparkles, ShieldCheck } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const loginSuccess = useAuthStore((state) => state.loginSuccess);

  const [email, setEmail] = useState('doctor@meridianpulse.health');
  const [password, setPassword] = useState('Doctor@123456');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Vui lòng điền đầy đủ Email và Mật khẩu.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const tokenResponse = await authService.login({ email, password });
      loginSuccess(tokenResponse);
      navigate('/dashboard');
    } catch {
      setErrorMsg('Đăng nhập không thành công. Kiểm tra lại thông tin xác thực.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMsg(null);
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-dark-900/90 border border-white/10 shadow-2xl backdrop-blur-xl">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white">Xác Thực Bác Sĩ & Nhân Viên</h2>
        <p className="mt-1 text-sm text-slate-400">
          Cổng truy cập hệ thống giám sát bệnh nhân ICU MeridianPulse
        </p>
      </div>

      {errorMsg && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
          <ShieldAlert className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Tài Khoản Email"
          type="email"
          placeholder="bacsi@meridianpulse.health"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <Input
          label="Mật Khẩu Cấp Độ Y Tế"
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full mt-2"
        >
          <Lock className="w-4 h-4" /> Đăng Nhập Hệ Thống
        </Button>
      </form>

      {/* Demo Fast-Fill Selector */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Chọn Tài Khoản Demo (Kiểm thử RBAC):
          </span>
          <Badge variant="cyan" className="text-[10px]">DEMO READY</Badge>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickFill('doctor@meridianpulse.health', 'Doctor@123456')}
            className="px-2.5 py-2 rounded-xl bg-slate-800/80 hover:bg-cyan-500/20 border border-white/5 hover:border-cyan-500/40 text-[11px] font-medium text-slate-200 transition-all text-center"
          >
            Bác Sĩ ICU
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('nurse@meridianpulse.health', 'Nurse@123456')}
            className="px-2.5 py-2 rounded-xl bg-slate-800/80 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/40 text-[11px] font-medium text-slate-200 transition-all text-center"
          >
            Điều Dưỡng
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('admin@meridianpulse.health', 'Admin@123456')}
            className="px-2.5 py-2 rounded-xl bg-slate-800/80 hover:bg-purple-500/20 border border-white/5 hover:border-purple-500/40 text-[11px] font-medium text-slate-200 transition-all text-center"
          >
            Quản Trị Viên
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Bảo vệ chống Brute-force & PBKDF2 Hashing (600k rounds)</span>
      </div>
    </div>
  );
};
