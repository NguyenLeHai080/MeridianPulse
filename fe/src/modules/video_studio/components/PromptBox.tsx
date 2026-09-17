import React from 'react';
import { useVideoStudioStore } from '@/store/videoStudio.store';
import { Button } from '@/components/common/Button';
import { 
  Sparkles, 
  Film, 
  Smartphone, 
  Monitor, 
  Square, 
  Sliders, 
  Zap,
  Clock
} from 'lucide-react';
import { VideoModel, AspectRatio } from '@/core/types/plenx.types';

export const PromptBox: React.FC = () => {
  const {
    prompt,
    selectedModel,
    aspectRatio,
    durationSeconds,
    motionStrength,
    isGenerating,
    setPrompt,
    setSelectedModel,
    setAspectRatio,
    setDurationSeconds,
    setMotionStrength,
    enhancePromptWithAi,
    generateVideo,
  } = useVideoStudioStore();

  const models: { id: VideoModel; name: string; badge: string; cost: number; desc: string }[] = [
    {
      id: 'veo-3.1-pro',
      name: 'Google Veo 3.1 Pro',
      badge: 'CINEMATIC 8K',
      cost: 10,
      desc: 'Ánh sáng và độ phân giải điện ảnh đỉnh cao',
    },
    {
      id: 'kling-v2.0-master',
      name: 'Kling AI v2.0 Master',
      badge: 'TOP MOTION',
      cost: 15,
      desc: 'Tối ưu chuyển động nhân vật phức tạp',
    },
    {
      id: 'minimax-hailuo-fast',
      name: 'Minimax Hailuo Fast',
      badge: 'LIGHTNING',
      cost: 8,
      desc: 'Tốc độ render siêu tốc, chi phí tiết kiệm',
    },
  ];

  const ratios: { id: AspectRatio; label: string; icon: React.ElementType }[] = [
    { id: '9:16', label: '9:16 (TikTok/Reels)', icon: Smartphone },
    { id: '16:9', label: '16:9 (YouTube 4K)', icon: Monitor },
    { id: '1:1', label: '1:1 (Square Feed)', icon: Square },
  ];

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-dark-900/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-5">
      {/* Header with Title & Model Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-white flex items-center gap-2">
            <Film className="w-4 h-4 text-cyan-400" />
            Chọn Mô Hình AI Video (Upstream Engine):
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {models.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedModel(m.id)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedModel === m.id
                  ? 'bg-cyan-500/15 border-cyan-500/50 shadow-glow-cyan'
                  : 'bg-slate-800/60 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">{m.name}</span>
                <span className="text-[10px] font-mono text-amber-300 font-bold">
                  {m.cost} cr
                </span>
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-1">{m.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Textarea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-white flex items-center gap-1.5">
            <span>Mô Tả Cảnh Quay (Prompt):</span>
          </label>
          <button
            type="button"
            onClick={enhancePromptWithAi}
            className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Nâng Cấp Prompt Bằng AI
          </button>
        </div>

        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Nhập mô tả chi tiết: nhân vật, ánh sáng, góc máy, chuyển động..."
          className="w-full p-4 rounded-2xl bg-dark-950/80 border border-white/10 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
        />
      </div>

      {/* Generation Parameters: Aspect Ratio & Duration & Motion */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {/* Ratio */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-300">Tỷ Lệ Khung Hình:</span>
          <div className="grid grid-cols-3 gap-1.5">
            {ratios.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setAspectRatio(r.id)}
                  className={`p-2 rounded-xl flex flex-col items-center justify-center gap-1 text-xs font-medium border transition-all ${
                    aspectRatio === r.id
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                      : 'bg-slate-800/60 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-[10px]">{r.id}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-300">Thời Lượng Render:</span>
          <div className="grid grid-cols-2 gap-1.5">
            {[5, 10].map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setDurationSeconds(sec)}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-medium border transition-all ${
                  durationSeconds === sec
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-800/60 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{sec} Giây</span>
              </button>
            ))}
          </div>
        </div>

        {/* Motion Strength */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cường Độ Chuyển Động:</span>
            </span>
            <span className="font-mono text-cyan-400">{motionStrength.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="10.0"
            step="0.5"
            value={motionStrength}
            onChange={(e) => setMotionStrength(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 mt-2"
          />
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant="primary"
        size="lg"
        onClick={generateVideo}
        isLoading={isGenerating}
        className="w-full py-4 text-sm font-bold shadow-glow-cyan"
      >
        <Zap className="w-4 h-4 mr-2 text-amber-300" />
        Tạo Video Ngay Bằng AI (
        {selectedModel === 'kling-v2.0-master' ? 15 : selectedModel === 'veo-3.1-pro' ? 10 : 8} Credits)
      </Button>
    </div>
  );
};
