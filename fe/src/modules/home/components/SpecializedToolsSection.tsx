import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scissors, 
  PenTool, 
  Image, 
  ShoppingBag, 
  Film, 
  UserCheck, 
  Mic, 
  Utensils, 
  Music, 
  Code2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ToolItem {
  id: string;
  name: string;
  desc: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  path: string;
}

export const SpecializedToolsSection: React.FC = () => {
  const navigate = useNavigate();

  const tools: ToolItem[] = [
    {
      id: 'tool-bg-remover',
      name: 'Tách nền thông minh',
      desc: 'Tách nền sản phẩm và người chỉ trong 1 giây',
      icon: Scissors,
      iconColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      path: '/fast-apps',
    },
    {
      id: 'tool-ai-script',
      name: 'Viết kịch bản AI',
      desc: 'Tự động viết kịch bản quảng cáo, review, kịch bản ngắn',
      icon: PenTool,
      iconColor: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      path: '/tiktok-tools',
    },
    {
      id: 'tool-restore-image',
      name: 'Vẽ lại ảnh cũ',
      desc: 'Phục hồi ảnh cũ, làm nét ảnh mờ độ phân giải cao',
      icon: Image,
      iconColor: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      path: '/studio',
    },
    {
      id: 'tool-product-creator',
      name: 'AI Product Creator',
      desc: 'Biến 1 ảnh tĩnh thành video quảng cáo sản phẩm 3D',
      icon: ShoppingBag,
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      path: '/fast-apps',
    },
    {
      id: 'tool-ai-storyboard',
      name: 'AI Storyboard',
      desc: 'Dàn dựng phân cảnh kịch bản minh họa chuyên nghiệp',
      icon: Film,
      iconColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      path: '/studio',
    },
    {
      id: 'tool-faceid-swap',
      name: 'Ghép mặt FaceID',
      desc: 'Hoán đổi khuôn mặt chính xác từng milimet vào video',
      icon: UserCheck,
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      path: '/fast-apps',
    },
    {
      id: 'tool-noise-reduction',
      name: 'Khử tạp âm & Giọng đọc',
      desc: 'Lọc tạp âm, lồng tiếng thuyết minh studio nhiều giọng',
      icon: Mic,
      iconColor: 'text-fuchsia-400',
      bgColor: 'bg-fuchsia-500/10',
      path: '/voice',
    },
    {
      id: 'tool-food-creator',
      name: 'Food Creator',
      desc: 'Tạo ảnh món ăn nhà hàng Michelin bốc khói ngon mắt',
      icon: Utensils,
      iconColor: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      path: '/fast-apps',
    },
    {
      id: 'tool-magic-audio',
      name: 'Magic Audio',
      desc: 'Tự động tạo nhạc nền theo cảm xúc video',
      icon: Music,
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      path: '/voice',
    },
    {
      id: 'tool-app-builder',
      name: 'App Builder',
      desc: 'Tạo giao diện ứng dụng di động, website chỉ bằng câu lệnh',
      icon: Code2,
      iconColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      path: '/studio',
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Top Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-[11px] font-semibold text-purple-300">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>Hệ sinh thái AI</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Công cụ AI chuyên biệt
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Hơn 12 công cụ chuyên dụng giúp bạn sáng tạo không giới hạn
        </p>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              onClick={() => navigate(tool.path)}
              className="p-4 rounded-2xl bg-[#0d1322] border border-white/5 hover:border-fuchsia-500/40 hover:bg-[#11182c] transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className={`w-9 h-9 rounded-xl ${tool.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-4 h-4 ${tool.iconColor}`} />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-100 mb-1 group-hover:text-fuchsia-300 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => navigate('/studio')}
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 transition-colors"
        >
          <span>Xem tất cả công cụ</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
