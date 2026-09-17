import React, { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Mic2, Volume2, Download, Zap } from 'lucide-react';

export const VoiceStudioPage: React.FC = () => {
  const deductCredits = useAuthStore((state) => state.deductCredits);

  const [voiceName, setVoiceName] = useState('Giọng MC Nữ Truyền Cảm (Hà Nội)');
  const [targetText, setTargetText] = useState(
    'Chào mừng bạn đến với nền tảng PlenxAI. Hệ thống tạo video và giọng đọc trí tuệ nhân tạo hàng đầu Việt Nam.'
  );
  const [speed, setSpeed] = useState(1.0);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<{ id: string; url: string } | null>({
    id: 'voice-sample-01',
    url: 'https://assets.mixkit.co/active_storage/sfx/2874/2874-preview.mp3',
  });

  const handleSynthesize = async () => {
    const success = deductCredits(5);
    if (!success) {
      alert('Số dư credits không đủ để tạo giọng đọc.');
      return;
    }
    setIsSynthesizing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setGeneratedAudio({
      id: `voice-${Date.now().toString(36)}`,
      url: 'https://assets.mixkit.co/active_storage/sfx/2874/2874-preview.mp3',
    });
    setIsSynthesizing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Mic2 className="w-6 h-6 text-cyan-400" />
            <span>Voice & Audio Studio (F5-TTS Voice Cloning)</span>
          </h1>
          <Badge variant="cyan" hasPulseDot>
            ZERO-SHOT CLONE
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Nhân bản giọng nói mẫu chỉ từ 5 giây âm thanh và tổng hợp văn bản thành giọng đọc cảm xúc chuẩn phòng thu
        </p>
      </div>

      {/* Voice Studio Configuration Box */}
      <div className="p-6 rounded-3xl bg-dark-900/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Chọn Mẫu Giọng Nhân Bản:
            </label>
            <select
              value={voiceName}
              onChange={(e) => setVoiceName(e.target.value)}
              className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            >
              <option>Giọng MC Nữ Truyền Cảm (Hà Nội)</option>
              <option>Giọng Nam Trầm Ấm Kể Chuyện Podcast (TP.HCM)</option>
              <option>Giọng Nữ Reviewer TikTok Năng Động (Gen Z)</option>
              <option>Tải Lên Mẫu Giọng Riêng Của Bạn (.wav, .mp3)</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>Tốc Độ Đọc:</span>
              <span className="font-mono text-cyan-400">{speed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.4"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 mt-2"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Văn Bản Cần Đọc:
          </label>
          <textarea
            rows={4}
            value={targetText}
            onChange={(e) => setTargetText(e.target.value)}
            className="w-full p-4 rounded-2xl bg-dark-950 border border-white/10 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 resize-none"
          />
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handleSynthesize}
          isLoading={isSynthesizing}
          className="w-full"
        >
          <Zap className="w-4 h-4 mr-1.5 text-amber-300" />
          Xuất Giọng Đọc AI (5 Credits)
        </Button>
      </div>

      {/* Audio Playback Card */}
      {generatedAudio && (
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{voiceName}</h3>
              <p className="text-xs text-slate-400 line-clamp-1">{targetText}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <audio controls src={generatedAudio.url} className="h-10 w-full sm:w-64" />
            <a
              href={generatedAudio.url}
              download="plenxai-voice.mp3"
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
