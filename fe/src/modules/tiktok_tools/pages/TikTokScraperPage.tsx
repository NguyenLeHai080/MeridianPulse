import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTikTokStore } from '@/store/tiktok.store';
import { useVideoStudioStore } from '@/store/videoStudio.store';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { 
  Share2, 
  Search, 
  Sparkles, 
  Copy, 
  Check, 
  Heart, 
  MessageCircle, 
  Send
} from 'lucide-react';

export const TikTokScraperPage: React.FC = () => {
  const navigate = useNavigate();
  const { videoUrl, isScraping, scrapedResult, scrapeAndReversePrompt } = useTikTokStore();
  const setStudioPrompt = useVideoStudioStore((state) => state.setPrompt);

  const [inputUrl, setInputUrl] = useState(videoUrl);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl) return;
    await scrapeAndReversePrompt(inputUrl);
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleReplicateInStudio = (prompt: string) => {
    setStudioPrompt(prompt);
    navigate('/studio');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Share2 className="w-6 h-6 text-cyan-400" />
            <span>TikTok / Reels Scraper & AI Vision Reverse Prompt</span>
          </h1>
          <Badge variant="cyan" hasPulseDot>
            NO-WATERMARK
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Dán link TikTok bất kỳ để tải video không dính logo và để Vision AI dịch ngược prompt chuẩn xác
        </p>
      </div>

      {/* Input URL Form */}
      <form onSubmit={handleScrape} className="p-6 rounded-3xl bg-dark-900/90 border border-white/10 shadow-2xl backdrop-blur-xl">
        <label className="text-sm font-bold text-white block mb-2">
          Dán Đường Dẫn Video TikTok hoặc Instagram Reels:
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              required
              placeholder="https://www.tiktok.com/@user/video/72819284729182"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-dark-950 border border-white/10 rounded-2xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isScraping}
            className="w-full sm:w-auto px-6 py-3.5 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 mr-1.5" />
            Bóc Tách Kịch Bản & Dịch Prompt
          </Button>
        </div>
      </form>

      {/* Scraped Result Card */}
      {scrapedResult && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-3xl bg-dark-900/80 border border-white/10 shadow-2xl backdrop-blur-xl">
          {/* Left: Video Player & Stats (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden bg-black aspect-[9/14] border border-white/10 relative shadow-2xl">
              <video
                src={scrapedResult.no_watermark_video_url}
                controls
                loop
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>

            {/* Author and Social Engagement Stats */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={scrapedResult.author_avatar}
                  alt={scrapedResult.author_name}
                  className="w-10 h-10 rounded-full border border-cyan-400"
                />
                <div>
                  <h3 className="text-xs font-bold text-white">{scrapedResult.author_name}</h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{scrapedResult.title}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-center text-xs">
                <div className="flex items-center justify-center gap-1 text-rose-400 font-mono font-bold">
                  <Heart className="w-3.5 h-3.5" />
                  <span>{scrapedResult.like_count}</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-cyan-400 font-mono font-bold">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{scrapedResult.comment_count}</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-amber-400 font-mono font-bold">
                  <Send className="w-3.5 h-3.5" />
                  <span>{scrapedResult.share_count}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: AI Vision Breakdown & Reversible Prompts (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Vision AI Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Phân Tích Khung Hình & Kỹ Thuật Quay (Vision AI Breakdown):
                </span>
                <Badge variant="cyan" className="text-[10px]">GEMINI 1.5 PRO</Badge>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {scrapedResult.vision_script_analysis}
              </p>
              <div className="text-[11px] text-slate-400 font-mono pt-1">
                Âm nhạc: <b>{scrapedResult.music_title}</b>
              </div>
            </div>

            {/* Prompt Option 1: Google Veo 3.1 */}
            <div className="p-4 rounded-2xl bg-dark-950 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Prompt Tối Ưu Cho Google Veo 3.1:</span>
                <Badge variant="cyan" className="text-[10px]">CINEMATIC 8K</Badge>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900/60 p-3 rounded-xl border border-white/5">
                {scrapedResult.suggested_veo_prompt}
              </p>
              <div className="flex items-center justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(scrapedResult.suggested_veo_prompt, 'veo')}
                >
                  {copiedType === 'veo' ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                  {copiedType === 'veo' ? 'Đã Chép!' : 'Sao Chép'}
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleReplicateInStudio(scrapedResult.suggested_veo_prompt)}
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  Tạo Bản Tái Sinh Ngay
                </Button>
              </div>
            </div>

            {/* Prompt Option 2: Kling AI 2.0 */}
            <div className="p-4 rounded-2xl bg-dark-950 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Prompt Tối Ưu Cho Kling AI v2.0 Master:</span>
                <Badge variant="warning" className="text-[10px]">DYNAMIC MOTION</Badge>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900/60 p-3 rounded-xl border border-white/5">
                {scrapedResult.suggested_kling_prompt}
              </p>
              <div className="flex items-center justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(scrapedResult.suggested_kling_prompt, 'kling')}
                >
                  {copiedType === 'kling' ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                  {copiedType === 'kling' ? 'Đã Chép!' : 'Sao Chép'}
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleReplicateInStudio(scrapedResult.suggested_kling_prompt)}
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  Tạo Bản Tái Sinh Ngay
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
