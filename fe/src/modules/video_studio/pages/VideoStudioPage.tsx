import React from 'react';
import { PromptBox } from '../components/PromptBox';
import { VideoGallery } from '../components/VideoGallery';
import { Badge } from '@/components/common/Badge';
import { Video, Zap } from 'lucide-react';

export const VideoStudioPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <Video className="w-6 h-6 text-cyan-400" />
              <span>AI Video Studio 3.1</span>
            </h1>
            <Badge variant="cyan" hasPulseDot>
              MULTI-MODEL
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Khởi tạo video điện ảnh độ phân giải cao từ Text hoặc Image với Google Veo 3.1 & Kling AI v2.0
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/5 text-xs text-slate-400 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Tốc độ render: <b className="text-white">~30s / video</b></span>
          </div>
        </div>
      </div>

      {/* Main Studio Prompt Section */}
      <PromptBox />

      {/* Video Generation Gallery */}
      <VideoGallery />
    </div>
  );
};
