import React, { useState } from 'react';
import { useVideoStudioStore } from '@/store/videoStudio.store';
import { VideoJob } from '@/core/types/plenx.types';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { Play, Copy, Download, Sparkles, Check, Film } from 'lucide-react';

export const VideoGallery: React.FC = () => {
  const jobs = useVideoStudioStore((state) => state.jobs);
  const setPrompt = useVideoStudioStore((state) => state.setPrompt);

  const [activeVideo, setActiveVideo] = useState<VideoJob | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyPrompt = (job: VideoJob) => {
    navigator.clipboard.writeText(job.prompt);
    setCopiedId(job.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRemix = (job: VideoJob) => {
    setPrompt(job.prompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Film className="w-4 h-4 text-cyan-400" />
          <span>Thư Viện Video Đã Tạo (Generation History):</span>
        </h2>
        <span className="text-xs text-slate-400 font-mono">
          Tổng cộng: {jobs.length} video
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="group rounded-2xl bg-dark-900/80 border border-white/10 overflow-hidden hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            {/* Thumbnail with Overlay Play */}
            <div className="relative aspect-video bg-slate-950 overflow-hidden">
              <img
                src={job.thumbnail_url}
                alt={job.prompt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Play Button */}
              <button
                type="button"
                onClick={() => setActiveVideo(job)}
                className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-cyan-500/90 text-white flex items-center justify-center shadow-glow-cyan hover:scale-110 transition-transform"
                title="Xem trước video"
              >
                <Play className="w-5 h-5 ml-0.5" />
              </button>

              {/* Badges on Thumbnail */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-white/10">
                  {job.aspect_ratio}
                </span>
                <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-amber-300 border border-white/10">
                  {job.duration_seconds}s
                </span>
              </div>

              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-slate-300">
                <Badge variant="cyan" className="text-[9px] py-0">
                  {job.model}
                </Badge>
                <span className="font-mono text-[10px] text-slate-400">{job.created_at}</span>
              </div>
            </div>

            {/* Video Prompt & Actions */}
            <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                {job.prompt}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyPrompt(job)}
                  className="text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
                  title="Sao chép câu lệnh Prompt"
                >
                  {copiedId === job.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemix(job)}
                    className="text-[11px] py-1 px-2 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    <Sparkles className="w-3 h-3 mr-1" /> Tái tạo
                  </Button>

                  <a
                    href={job.video_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Tải video MP4"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <Modal
          isOpen={true}
          onClose={() => setActiveVideo(null)}
          title={`Chi Tiết Video (${activeVideo.model})`}
          size="lg"
        >
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
              <video
                src={activeVideo.video_url}
                controls
                autoPlay
                loop
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Prompt Đầy Đủ:</span>
                <span className="font-mono text-amber-300 font-bold">
                  {activeVideo.credits_charged} Credits
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {activeVideo.prompt}
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyPrompt(activeVideo)}
              >
                <Copy className="w-3.5 h-3.5 mr-1" />
                {copiedId === activeVideo.id ? 'Đã Sao Chép!' : 'Sao Chép Prompt'}
              </Button>
              <a
                href={activeVideo.video_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl text-xs font-semibold text-white shadow-glow-cyan"
              >
                <Download className="w-3.5 h-3.5 mr-1" /> Tải Video Về Máy
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
