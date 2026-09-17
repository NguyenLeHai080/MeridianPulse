import React from 'react';
import { 
  Sparkles, 
  Video, 
  Sliders, 
  PiggyBank, 
  ShieldCheck, 
  Users 
} from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const benefits = [
    {
      title: 'Text to Image',
      desc: 'Mô tả ý tưởng bằng văn bản, AI sẽ vẽ tranh chân thực, siêu thực',
      icon: Sparkles,
      iconColor: 'text-fuchsia-400',
      bgColor: 'bg-fuchsia-500/10',
    },
    {
      title: 'AI Video Generation',
      desc: 'Tạo video chuyển động mượt mà từ ảnh hoặc kịch bản',
      icon: Video,
      iconColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
    },
    {
      title: 'AI Motion',
      desc: 'Điều khiển camera zoom, pan, tilt và quỹ đạo linh hoạt',
      icon: Sliders,
      iconColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
    },
    {
      title: 'Tiết kiệm',
      desc: 'Tiết kiệm hơn 90% chi phí so với thuê studio và người mẫu thật',
      icon: PiggyBank,
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    {
      title: 'Bảo mật',
      desc: 'Dữ liệu và kịch bản riêng tư, không chia sẻ với bên thứ ba',
      icon: ShieldCheck,
      iconColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
    },
    {
      title: 'Cộng đồng',
      desc: 'Hơn 50,000 creators tham gia chia sẻ kinh nghiệm kiếm tiền',
      icon: Users,
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Tại sao chọn PlenX AI?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Nền tảng giúp bạn tiết kiệm 90% thời gian và chi phí sáng tạo
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {benefits.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0c111e] border border-white/5 hover:border-fuchsia-500/30 transition-all shadow-md"
            >
              <div className={`w-9 h-9 rounded-xl ${b.bgColor} flex items-center justify-center mb-3`}>
                <Icon className={`w-4 h-4 ${b.iconColor}`} />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{b.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
