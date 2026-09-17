import { create } from 'zustand';
import { VideoJob, VideoModel, AspectRatio } from '@/core/types/plenx.types';
import { useAuthStore } from './auth.store';

interface VideoStudioState {
  prompt: string;
  negativePrompt: string;
  selectedModel: VideoModel;
  aspectRatio: AspectRatio;
  durationSeconds: number;
  motionStrength: number;
  isGenerating: boolean;
  jobs: VideoJob[];
  setPrompt: (p: string) => void;
  setNegativePrompt: (np: string) => void;
  setSelectedModel: (m: VideoModel) => void;
  setAspectRatio: (ar: AspectRatio) => void;
  setDurationSeconds: (d: number) => void;
  setMotionStrength: (ms: number) => void;
  enhancePromptWithAi: () => void;
  generateVideo: () => Promise<boolean>;
}

const INITIAL_SHOWCASE_JOBS: VideoJob[] = [
  {
    id: 'vid-01',
    user_email: 'haiyuanhai9@gmail.com',
    prompt: 'Cinematic cyberpunk alleyway in Neo-Tokyo with rain reflections, glowing cyan neon signs, ultra-detailed 8k photorealistic',
    model: 'veo-3.1-pro',
    aspect_ratio: '9:16',
    duration_seconds: 5,
    status: 'COMPLETED',
    progress_percentage: 100,
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-traffic-at-night-41541-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    credits_charged: 10,
    created_at: '10 phút trước',
  },
  {
    id: 'vid-02',
    user_email: 'haiyuanhai9@gmail.com',
    prompt: 'Luxury perfume crystal bottle rising from water surface, slow-motion golden liquid vortex splashes, cinematic lighting',
    model: 'kling-v2.0-master',
    aspect_ratio: '9:16',
    duration_seconds: 5,
    status: 'COMPLETED',
    progress_percentage: 100,
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-underwater-42999-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    credits_charged: 15,
    created_at: '25 phút trước',
  },
  {
    id: 'vid-03',
    user_email: 'creator@plenxai.com',
    prompt: 'Hyperrealistic anime girl in cherry blossom wind, glowing purple eyes, dynamic camera rotation, 60fps fluid motion',
    model: 'minimax-hailuo-fast',
    aspect_ratio: '16:9',
    duration_seconds: 5,
    status: 'COMPLETED',
    progress_percentage: 100,
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-wind-blowing-the-leaves-of-a-tree-41551-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    credits_charged: 8,
    created_at: '1 giờ trước',
  },
];

export const useVideoStudioStore = create<VideoStudioState>((set, get) => ({
  prompt: 'A futuristic floating glass cyber-car gliding across purple neon clouds at sunset, 8k cinematic lighting, ultra-fluid motion',
  negativePrompt: 'blurry, low quality, distorted anatomy, text watermark, flicker',
  selectedModel: 'veo-3.1-pro',
  aspectRatio: '9:16',
  durationSeconds: 5,
  motionStrength: 6.5,
  isGenerating: false,
  jobs: INITIAL_SHOWCASE_JOBS,

  setPrompt: (prompt) => set({ prompt }),
  setNegativePrompt: (negativePrompt) => set({ negativePrompt }),
  setSelectedModel: (selectedModel) => set({ selectedModel }),
  setAspectRatio: (aspectRatio) => set({ aspectRatio }),
  setDurationSeconds: (durationSeconds) => set({ durationSeconds }),
  setMotionStrength: (motionStrength) => set({ motionStrength }),

  enhancePromptWithAi: () => {
    const current = get().prompt;
    const enhancements = [
      ', cinematic 35mm camera lens, photorealistic subsurface scattering, dramatic chiaroscuro lighting, masterwork 8k',
      ', hyper-detailed volumetric fog, anamorphic lens flare, Ray-Tracing Reflections, Unreal Engine 5 render style',
      ', extreme slow-motion 120fps, intricate textures, breathtaking cinematography, award-winning visual fidelity',
    ];
    const picked = enhancements[Math.floor(Math.random() * enhancements.length)];
    set({ prompt: current + picked });
  },

  generateVideo: async () => {
    const { prompt, selectedModel, aspectRatio, durationSeconds } = get();
    const cost = selectedModel === 'kling-v2.0-master' ? 15 : selectedModel === 'veo-3.1-pro' ? 10 : 8;

    const deductSuccess = useAuthStore.getState().deductCredits(cost);
    if (!deductSuccess) {
      alert('Số dư credits không đủ để tạo video. Vui lòng nạp thêm gói credits!');
      return false;
    }

    set({ isGenerating: true });

    // Simulate real-time rendering delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const newJob: VideoJob = {
      id: `vid-${Date.now().toString(36)}`,
      user_email: useAuthStore.getState().user?.email || 'haiyuanhai9@gmail.com',
      prompt,
      model: selectedModel,
      aspect_ratio: aspectRatio,
      duration_seconds: durationSeconds,
      status: 'COMPLETED',
      progress_percentage: 100,
      video_url: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-traffic-at-night-41541-large.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      credits_charged: cost,
      created_at: 'Vừa xong',
    };

    set((state) => ({
      jobs: [newJob, ...state.jobs],
      isGenerating: false,
    }));

    return true;
  },
}));
