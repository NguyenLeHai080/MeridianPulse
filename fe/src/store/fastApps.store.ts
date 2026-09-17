import { create } from 'zustand';
import { FastAppItem } from '@/core/types/plenx.types';
import { useAuthStore } from './auth.store';

interface FastAppsState {
  items: FastAppItem[];
  isRendering: boolean;
  createProductTvc: (productName: string, theme: string) => Promise<boolean>;
  createGachaKols: (ethnicity: string, garmentPrompt: string) => Promise<boolean>;
  createSeeDance: (danceName: string) => Promise<boolean>;
}

const INITIAL_FAST_APPS: FastAppItem[] = [
  {
    id: 'tvc-01',
    app_type: 'PRODUCT_TVC',
    title: 'TVC Quảng Cáo Nước Hoa Chanel 3D Luxury Studio',
    output_url: 'https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-underwater-42999-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    credits_charged: 15,
    created_at: 'Hôm nay',
  },
  {
    id: 'kol-01',
    app_type: 'GACHA_KOLS',
    title: 'Người Mẫu AI Châu Á - Đầm Dạ Hội Lụa Tơ Tằm',
    output_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    credits_charged: 10,
    created_at: 'Hôm qua',
  },
  {
    id: 'dance-01',
    app_type: 'SEE_DANCE',
    title: 'AI Dance Vũ Đạo "Magnetic" TikTok Trend Khớp Nhịp',
    output_url: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-dancing-in-a-studio-41121-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    credits_charged: 20,
    created_at: '2 ngày trước',
  },
];

export const useFastAppsStore = create<FastAppsState>((set) => ({
  items: INITIAL_FAST_APPS,
  isRendering: false,

  createProductTvc: async (productName, theme) => {
    const deductSuccess = useAuthStore.getState().deductCredits(15);
    if (!deductSuccess) {
      alert('Số dư credits không đủ để tạo 3D TVC.');
      return false;
    }
    set({ isRendering: true });
    await new Promise((r) => setTimeout(r, 2000));
    const newItem: FastAppItem = {
      id: `tvc-${Date.now().toString(36)}`,
      app_type: 'PRODUCT_TVC',
      title: `TVC Quảng Cáo 3D: ${productName} (${theme})`,
      output_url: 'https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-underwater-42999-large.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
      credits_charged: 15,
      created_at: 'Vừa xong',
    };
    set((state) => ({ items: [newItem, ...state.items], isRendering: false }));
    return true;
  },

  createGachaKols: async (ethnicity, garmentPrompt) => {
    const deductSuccess = useAuthStore.getState().deductCredits(10);
    if (!deductSuccess) {
      alert('Số dư credits không đủ để tạo Người Mẫu AI.');
      return false;
    }
    set({ isRendering: true });
    await new Promise((r) => setTimeout(r, 2000));
    const newItem: FastAppItem = {
      id: `kol-${Date.now().toString(36)}`,
      app_type: 'GACHA_KOLS',
      title: `Người Mẫu AI ${ethnicity}: ${garmentPrompt.slice(0, 30)}...`,
      output_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      thumbnail_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
      credits_charged: 10,
      created_at: 'Vừa xong',
    };
    set((state) => ({ items: [newItem, ...state.items], isRendering: false }));
    return true;
  },

  createSeeDance: async (danceName) => {
    const deductSuccess = useAuthStore.getState().deductCredits(20);
    if (!deductSuccess) {
      alert('Số dư credits không đủ để tạo Video Nhảy AI.');
      return false;
    }
    set({ isRendering: true });
    await new Promise((r) => setTimeout(r, 2000));
    const newItem: FastAppItem = {
      id: `dance-${Date.now().toString(36)}`,
      app_type: 'SEE_DANCE',
      title: `Vũ Điệu AI: ${danceName}`,
      output_url: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-dancing-in-a-studio-41121-large.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
      credits_charged: 20,
      created_at: 'Vừa xong',
    };
    set((state) => ({ items: [newItem, ...state.items], isRendering: false }));
    return true;
  },
}));
