import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';

export const CtaBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <div className="relative rounded-3xl p-8 sm:p-12 text-center overflow-hidden bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-600 shadow-glow-pink">
        {/* Decorative ambient flare */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-xl mx-auto">
          {/* Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold text-white shadow-sm">
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            <span>Miễn phí trải nghiệm</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sẵn sàng sáng tạo?
          </h2>

          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            Tham gia cùng hàng nghìn nhà sáng tạo nội dung đang sử dụng PlenX AI mỗi ngày.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/studio')}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm shadow-2xl hover:scale-105 transition-all"
            >
              <span>Khám phá ngay</span>
              <ArrowRight className="w-4 h-4 text-fuchsia-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
