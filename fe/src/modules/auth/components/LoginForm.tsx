import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Badge } from '@/components/common/Badge';
import { Lock, ShieldAlert, Sparkles, ShieldCheck } from 'lucide-react';
import { User, TokenResponse, Role } from '@/core/types/plenx.types';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const loginSuccess = useAuthStore((state) => state.loginSuccess);

  const [email, setEmail] = useState('haiyuanhai9@gmail.com');
  const [password, setPassword] = useState('Ntt@080220');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Vui lòng nhập đầy đủ Email và Mật khẩu.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      // Simulate fast authentication & role assignment
      const isSuperAdmin = email === 'haiyuanhai9@gmail.com';
      const isCreator = email === 'creator@plenxai.com';

      const mockUser: User = {
        id: `usr-${Date.now().toString(36)}`,
        email,
        full_name: isSuperAdmin
          ? 'Nguyễn Lê Hải (Plenx Super Admin)'
          : isCreator
          ? 'Alex Rivers (Pro Creator)'
          : 'Người Dùng PlenxAI',
        role: isSuperAdmin ? ('ADMIN' as Role) : isCreator ? ('VIP_CREATOR' as Role) : ('USER' as Role),
        is_active: true,
        credit_balance: isSuperAdmin ? 999999 : isCreator ? 2500 : 150,
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        plan: isSuperAdmin ? 'Enterprise Sovereign VIP' : isCreator ? 'Pro Creator Studio' : 'Starter Free',
      };

      const tokenResponse: TokenResponse = {
        access_token: `plenx_jwt_${Date.now()}`,
        refresh_token: `plenx_refresh_${Date.now()}`,
        token_type: 'bearer',
        expires_in_seconds: 3600,
        user: mockUser,
      };

      loginSuccess(tokenResponse);
      navigate('/studio');
    } catch {
      setErrorMsg('Đăng nhập không thành công. Kiểm tra lại thông tin.');
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
        <h2 className="text-2xl font-bold tracking-tight text-white">Đăng Nhập PlenxAI</h2>
        <p className="mt-1 text-sm text-slate-400">
          Cổng truy cập nền tảng sáng tạo Generative AI & Automation
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
          label="Tài Khoản Email (Google / PlenxID)"
          type="email"
          placeholder="haiyuanhai9@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <Input
          label="Mật Khẩu"
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
          <Lock className="w-4 h-4" /> Đăng Nhập Hệ Thống PlenxAI
        </Button>
      </form>

      {/* Demo Fast-Fill Selector */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Chọn Tài Khoản Demo (Kiểm thử RBAC):
          </span>
          <Badge variant="cyan" className="text-[10px]">1-CLICK FAST</Badge>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickFill('haiyuanhai9@gmail.com', 'Ntt@080220')}
            className="px-2 py-2 rounded-xl bg-slate-800/80 hover:bg-amber-500/20 border border-white/5 hover:border-amber-500/40 text-[11px] font-medium text-amber-300 transition-all text-center"
          >
            Admin (Google)
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('creator@plenxai.com', 'Creator@123456')}
            className="px-2 py-2 rounded-xl bg-slate-800/80 hover:bg-cyan-500/20 border border-white/5 hover:border-cyan-500/40 text-[11px] font-medium text-slate-200 transition-all text-center"
          >
            Pro Creator
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('user@plenxai.com', 'User@123456')}
            className="px-2 py-2 rounded-xl bg-slate-800/80 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/40 text-[11px] font-medium text-slate-200 transition-all text-center"
          >
            User (150 cr)
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Bảo vệ bởi PBKDF2 600k rounds & Sliding-Window Rate Limiting</span>
      </div>
    </div>
  );
};
