import React from 'react';
import { Cpu } from 'lucide-react';

interface ModelBadge {
  name: string;
  tag: string;
  badgeVariant?: 'cyan' | 'pink' | 'purple' | 'amber' | 'emerald';
}

export const AiModelsSection: React.FC = () => {
  const models: ModelBadge[] = [
    { name: 'Google Veo 3.1', tag: 'Cinematic 8K', badgeVariant: 'cyan' },
    { name: 'Kling AI v2.0', tag: 'Top Motion', badgeVariant: 'purple' },
    { name: 'Minimax Hailuo', tag: 'Fast Lightning', badgeVariant: 'amber' },
    { name: 'Sora OpenAI', tag: 'Next-Gen VIP', badgeVariant: 'pink' },
    { name: 'Flux 1.1 Pro', tag: 'Top LoRA', badgeVariant: 'emerald' },
    { name: 'Midjourney v6.1', tag: 'Photoreal', badgeVariant: 'purple' },
    { name: 'Runway Gen-3', tag: 'Studio Pro', badgeVariant: 'cyan' },
    { name: 'Pika 2.0', tag: 'Creative', badgeVariant: 'pink' },
    { name: 'SDXL Lightning', tag: 'Free Speed', badgeVariant: 'amber' },
    { name: 'F5-TTS Voice', tag: 'Zero-Shot', badgeVariant: 'emerald' },
    { name: 'RunningHub ComfyUI', tag: 'Cloud GPU', badgeVariant: 'cyan' },
  ];

  return (
    <section id="models" className="max-w-5xl mx-auto px-4 py-12 text-center">
      {/* Title & Subtitle */}
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
        AI Models hàng đầu
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-8">
        Tích hợp các mô hình AI tiên tiến nhất hiện nay để tạo ra sản phẩm chất lượng cao.
      </p>

      {/* Model Badges Grid */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {models.map((m, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0f1524] border border-white/10 hover:border-fuchsia-500/40 transition-all hover:scale-105 shadow-md"
          >
            <Cpu className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-semibold text-slate-200">{m.name}</span>
            <span className="px-1.5 py-0.5 rounded bg-fuchsia-500/15 border border-fuchsia-500/30 text-[10px] font-mono text-fuchsia-300 font-bold">
              {m.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
