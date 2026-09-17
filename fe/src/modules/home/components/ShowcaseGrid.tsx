import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Play, ArrowRight } from 'lucide-react';

export interface ShowcaseCardData {
  id: string;
  title: string;
  description: string;
  category: 'VIDEO' | 'IMAGE';
  beforeImage: string;
  centerBadgeOrImage?: string;
  afterImage: string;
  videoPreviewUrl?: string;
  targetPath: string;
}

const SHOWCASE_CARDS: ShowcaseCardData[] = [
  {
    id: 'dance-video',
    title: 'AI Dance Video',
    description: 'Biến ảnh tĩnh thành video nhảy theo nhạc TikTok, vũ đạo chuyển động mềm mại tự nhiên',
    category: 'VIDEO',
    beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-dancing-in-a-studio-41121-large.mp4',
    targetPath: '/fast-apps',
  },
  {
    id: 'product-review',
    title: 'AI Review Sản phẩm',
    description: 'Tạo kịch bản review sản phẩm tự động, đọc lời thuyết minh và lồng ghép video b-roll hấp dẫn',
    category: 'VIDEO',
    beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    centerBadgeOrImage: 'https://images.unsplash.com/photo-1584990347449-399d8d641151?auto=format&fit=crop&w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-person-cooking-41554-large.mp4',
    targetPath: '/studio',
  },
  {
    id: 'fashion-selfie',
    title: 'AI Video Thời trang Selfie',
    description: 'Chụp ảnh sản phẩm và mặc thử trên mẫu ảo, tạo video selfie thời trang bắt mắt',
    category: 'VIDEO',
    beforeImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-looking-at-clothes-in-a-store-41549-large.mp4',
    targetPath: '/fast-apps',
  },
  {
    id: 'brand-commercial',
    title: 'AI Quảng Cáo Dịch vụ, Thương Hiệu',
    description: 'Tạo linh vật, biển quảng cáo 3D cho công ty, nhà hàng, quán cafe ấn tượng',
    category: 'VIDEO',
    beforeImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80',
    centerBadgeOrImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-underwater-42999-large.mp4',
    targetPath: '/fast-apps',
  },
  {
    id: 'mens-fashion',
    title: 'AI Aff Thời Trang Nam',
    description: 'Tạo video người mẫu nam mặc thử đồ thời trang dạo phố, thể thao nam tính',
    category: 'VIDEO',
    beforeImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    centerBadgeOrImage: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-walking-in-a-futuristic-tunnel-41544-large.mp4',
    targetPath: '/fast-apps',
  },
];

interface ShowcaseGridProps {
  filter: 'ALL' | 'VIDEO' | 'IMAGE';
  onOpenPreview?: (card: ShowcaseCardData) => void;
}

export const ShowcaseGrid: React.FC<ShowcaseGridProps> = ({ filter, onOpenPreview }) => {
  const navigate = useNavigate();

  const filteredCards = SHOWCASE_CARDS.filter((c) => {
    if (filter === 'ALL') return true;
    return c.category === filter;
  });

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="group rounded-3xl bg-[#0c111e]/90 border border-white/5 hover:border-fuchsia-500/40 p-5 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:shadow-glow-pink"
          >
            {/* Title with Sparkle Icon */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                {card.title}
              </h3>
            </div>

            {/* Visual Transformation Tri-Frame Display */}
            <div className="relative rounded-2xl overflow-hidden bg-black/60 p-2 mb-4 border border-white/5">
              <div className="grid grid-cols-3 gap-2 items-center">
                {/* Frame 1: Before Image */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={card.beforeImage}
                    alt="Before"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-slate-300">
                    Ảnh gốc
                  </span>
                </div>

                {/* Frame 2: Center Item / Transition Arrow */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                  {card.centerBadgeOrImage ? (
                    <img
                      src={card.centerBadgeOrImage}
                      alt="Center"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-fuchsia-600/30 border border-fuchsia-500/60 flex items-center justify-center text-fuchsia-300">
                      <Play className="w-4 h-4 ml-0.5" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                    <span className="text-white text-xs font-black">➔</span>
                  </div>
                </div>

                {/* Frame 3: After Result / Video Preview */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={card.afterImage}
                    alt="After"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Play Overlay Button */}
                  <button
                    type="button"
                    onClick={() => (onOpenPreview ? onOpenPreview(card) : navigate(card.targetPath))}
                    className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-fuchsia-600 text-white flex items-center justify-center shadow-glow-pink hover:scale-110 transition-transform"
                    title="Xem trước kết quả"
                  >
                    <Play className="w-4 h-4 ml-0.5" />
                  </button>
                  <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-fuchsia-600/90 text-[9px] font-mono text-white font-bold">
                    AI Video
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-400 text-center leading-relaxed mb-5 min-h-[36px]">
              {card.description}
            </p>

            {/* Centered Purple "Tạo ngay" Pill Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => navigate(card.targetPath)}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 hover:opacity-95 text-white font-extrabold text-xs shadow-glow-pink hover:scale-105 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tạo ngay</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
