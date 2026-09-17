import { create } from 'zustand';
import { TikTokScrapedResult } from '@/core/types/plenx.types';

interface TikTokState {
  videoUrl: string;
  isScraping: boolean;
  scrapedResult: TikTokScrapedResult | null;
  setVideoUrl: (url: string) => void;
  scrapeAndReversePrompt: (url: string) => Promise<boolean>;
}

const DEFAULT_MOCK_RESULT: TikTokScrapedResult = {
  id: 'tt-mock-01',
  original_url: 'https://www.tiktok.com/@creator/video/739182391283',
  author_name: '@trendsetter.ai',
  author_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  title: 'Biến hình phong cách Anime Cyberpunk 2077 cực ngầu #trend #ai #transformation',
  like_count: '1.2M',
  comment_count: '14.8K',
  share_count: '88.2K',
  no_watermark_video_url: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-traffic-at-night-41541-large.mp4',
  thumbnail_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
  vision_script_analysis: 'Video sử dụng hiệu ứng Fast Zoom Cut kết hợp ánh sáng Neon tím/cyan. Nhân vật đứng yên tại vị trí trung tâm, bối cảnh chuyển dịch nhanh từ đường phố thực tế sang thế giới giả tưởng cyberpunk.',
  suggested_veo_prompt: 'Cinematic 8k video of a futuristic traveler standing in rain, neon glowing cybernetic city reflections, dynamic motion zoom in, ultra-realistic textures, 24fps',
  suggested_kling_prompt: 'Hyper-detailed anime motion transformation, neon aura burst, high contrast cinematic lighting, fluid martial-arts posture with wind blowing jacket',
  music_title: 'Original Sound - Cyberpunk Phonk Remix (128 BPM)',
};

export const useTikTokStore = create<TikTokState>((set) => ({
  videoUrl: 'https://www.tiktok.com/@cyberpunk.ai/video/729182049182',
  isScraping: false,
  scrapedResult: DEFAULT_MOCK_RESULT,

  setVideoUrl: (videoUrl) => set({ videoUrl }),

  scrapeAndReversePrompt: async (url) => {
    set({ isScraping: true, videoUrl: url });
    await new Promise((r) => setTimeout(r, 1800));
    set({
      scrapedResult: {
        ...DEFAULT_MOCK_RESULT,
        original_url: url,
        id: `tt-${Date.now().toString(36)}`,
      },
      isScraping: false,
    });
    return true;
  },
}));
