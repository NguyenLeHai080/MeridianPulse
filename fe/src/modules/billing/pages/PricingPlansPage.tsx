import React, { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { 
  CreditCard, 
  Coins, 
  Check, 
  Zap, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { PricingPlan, Transaction } from '@/core/types/plenx.types';

export const PricingPlansPage: React.FC = () => {
  const { user, addCredits } = useAuthStore();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const plans: PricingPlan[] = [
    {
      id: 'plan-starter',
      name: 'Gói Khởi Động (Starter)',
      price_vnd: '199,000 đ',
      credits_amount: 500,
      bonus_credits: 50,
      features: [
        '550 Credits tạo video & ảnh',
        'Hỗ trợ Google Veo 3.1 & Kling AI',
        'Độ phân giải Full HD 1080p',
        'Tốc độ hàng đợi tiêu chuẩn',
      ],
      is_popular: false,
    },
    {
      id: 'plan-creator',
      name: 'Gói Sáng Tạo Chuyên Nghiệp (Creator Pro)',
      price_vnd: '499,000 đ',
      credits_amount: 2500,
      bonus_credits: 500,
      features: [
        '3,000 Credits tạo video không giới hạn',
        'Ưu tiên hàng đợi VIP Siêu Tốc (Fast Queue)',
        'Mở khóa 3D Product TVC & Gacha KOLs',
        'Tải video 4K Ultra HD & 60 FPS',
        'Cào video TikTok không giới hạn',
      ],
      is_popular: true,
    },
    {
      id: 'plan-agency',
      name: 'Gói Doanh Nghiệp (Sovereign VIP)',
      price_vnd: '1,499,000 đ',
      credits_amount: 10000,
      bonus_credits: 3000,
      features: [
        '13,000 Credits tạo nội dung quy mô lớn',
        'Kênh xử lý GPU RunningHub ComfyUI riêng',
        'API Key tích hợp phần mềm riêng',
        'Hỗ trợ kỹ thuật 24/7 trực tiếp từ Lead AI',
      ],
      is_popular: false,
    },
  ];

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx-01',
      type: 'PURCHASE',
      description: 'Nạp gói Creator Pro (+3,000 credits)',
      amount: 3000,
      created_at: 'Hôm nay',
    },
    {
      id: 'tx-02',
      type: 'CONSUMPTION',
      description: 'Tạo Video Google Veo 3.1 8K (-10 credits)',
      amount: -10,
      created_at: '15 phút trước',
    },
    {
      id: 'tx-03',
      type: 'CONSUMPTION',
      description: 'Xuất TVC Nước hoa 3D E-Commerce (-15 credits)',
      amount: -15,
      created_at: '1 giờ trước',
    },
  ]);

  const handleBuy = (plan: PricingPlan) => {
    const total = plan.credits_amount + plan.bonus_credits;
    addCredits(total);

    const newTx: Transaction = {
      id: `tx-${Date.now().toString(36)}`,
      type: 'PURCHASE',
      description: `Mua thành công ${plan.name} (+${total.toLocaleString()} credits)`,
      amount: total,
      created_at: 'Vừa xong',
    };
    setTransactions([newTx, ...transactions]);

    setSuccessMessage(`Đã nạp thành công +${total.toLocaleString()} Credits vào tài khoản!`);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Coins className="w-6 h-6 text-amber-400" />
            <span>Bảng Giá Gói Credits & Thanh Toán</span>
          </h1>
          <Badge variant="cyan" hasPulseDot>
            TIẾT KIỆM ĐẾN 40%
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Nạp credits để mở khóa các mô hình video cao cấp Google Veo 3.1, Kling AI và Fast Apps E-Commerce
        </p>
      </div>

      {/* Current Balance Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-dark-900 border border-amber-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
            Số Dư Ví Credits Hiện Tại:
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-300">
              {user?.credit_balance.toLocaleString()}
            </span>
            <span className="text-sm font-semibold text-slate-300">Credits Khả Dụng</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Gói hiện tại: <b className="text-white">{user?.plan || 'Pro Creator'}</b> • Không bao giờ hết hạn
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="emerald" className="py-1 px-3">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            Bảo Mật Giao Dịch SSL
          </Badge>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-bold flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300 relative ${
              plan.is_popular
                ? 'bg-gradient-to-b from-violet-950/40 to-dark-900 border-cyan-500/60 shadow-glow-cyan md:-translate-y-2'
                : 'bg-dark-900/80 border-white/10 hover:border-white/30'
            }`}
          >
            {plan.is_popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold text-[10px] uppercase tracking-wider shadow-glow-cyan">
                  Phổ Biến Nhất
                </span>
              </div>
            )}

            <div>
              <div className="mb-4">
                <h3 className="text-base font-bold text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">
                    {plan.price_vnd}
                  </span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono font-bold">
                  <Zap className="w-3 h-3" />
                  <span>
                    {(plan.credits_amount + plan.bonus_credits).toLocaleString()} Credits
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
                {plan.features.map((f, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-slate-300">
                    <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant={plan.is_popular ? 'primary' : 'outline'}
              size="lg"
              onClick={() => handleBuy(plan)}
              className="w-full mt-6"
            >
              <CreditCard className="w-4 h-4 mr-1.5" />
              Nạp Gói Này Ngay
            </Button>
          </div>
        ))}
      </div>

      {/* Transaction History Ledger */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Nhật Ký Sử Dụng & Nạp Credits (Ledger):</span>
        </h2>

        <div className="rounded-2xl bg-dark-900/80 border border-white/10 overflow-hidden">
          <div className="divide-y divide-white/5">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      tx.type === 'PURCHASE'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{tx.description}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{tx.created_at}</span>
                  </div>
                </div>

                <div className="font-mono font-bold text-sm">
                  {tx.amount > 0 ? (
                    <span className="text-emerald-400">+{tx.amount.toLocaleString()} cr</span>
                  ) : (
                    <span className="text-slate-400">{tx.amount.toLocaleString()} cr</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
