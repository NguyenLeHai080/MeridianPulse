import React, { useState } from 'react';
import { useFastAppsStore } from '@/store/fastApps.store';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { 
  ShoppingBag, 
  Sparkles, 
  UserCheck, 
  Flame, 
  Play, 
  Layers, 
  Zap 
} from 'lucide-react';
import { FastAppItem } from '@/core/types/plenx.types';

export const FastAppsPage: React.FC = () => {
  const { items, isRendering, createProductTvc, createGachaKols, createSeeDance } = useFastAppsStore();

  const [activeTab, setActiveTab] = useState<'TVC' | 'KOLS' | 'DANCE'>('TVC');
  
  // Product TVC form states
  const [productName, setProductName] = useState('Nước Hoa Dior Sauvage');
  const [tvcTheme, setTvcTheme] = useState('Luxury Gold & Dark Water Studio');

  // Gacha KOLs form states
  const [ethnicity, setEthnicity] = useState('Người Mẫu Châu Á (Asian Top Model)');
  const [garmentPrompt, setGarmentPrompt] = useState('Váy dạ hội lụa tơ tằm đỏ ruby xẻ tà cao cấp');

  // See Dance states
  const [danceName, setDanceName] = useState('Vũ Đạo "Magnetic" TikTok Trend');

  const [previewItem, setPreviewItem] = useState<FastAppItem | null>(null);

  const handleCreate = async () => {
    if (activeTab === 'TVC') {
      await createProductTvc(productName, tvcTheme);
    } else if (activeTab === 'KOLS') {
      await createGachaKols(ethnicity, garmentPrompt);
    } else {
      await createSeeDance(danceName);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-cyan-400" />
              <span>Fast Apps & E-Commerce Creator Studio</span>
            </h1>
            <Badge variant="cyan" hasPulseDot>
              RUNNINGHUB COMFYUI
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Tạo TVC sản phẩm 3D, Người mẫu ảo Gacha KOLs và Video nhảy tự động chỉ với 1 bức ảnh
          </p>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-dark-900 border border-white/10 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('TVC')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'TVC'
              ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-glow-cyan'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Product TVC 3D (15 cr)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('KOLS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'KOLS'
              ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-glow-cyan'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Gacha AI KOLs (10 cr)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('DANCE')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'DANCE'
              ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-glow-cyan'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>AI See Dance (20 cr)</span>
        </button>
      </div>

      {/* Interactive Fast App Card */}
      <div className="p-6 rounded-3xl bg-dark-900/90 border border-white/10 shadow-2xl backdrop-blur-xl">
        {activeTab === 'TVC' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-white mb-1">
                Tạo Video TVC Quảng Cáo 3D Từ 1 Ảnh Sản Phẩm
              </h2>
              <p className="text-xs text-slate-400">
                Tự động tách nền, đặt vào môi trường 3D sang trọng và quay video góc xoay 360 độ điện ảnh
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Tên Sản Phẩm:
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Phong Cách Ánh Sáng & Bối Cảnh:
                </label>
                <select
                  value={tvcTheme}
                  onChange={(e) => setTvcTheme(e.target.value)}
                  className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                >
                  <option>Luxury Gold & Dark Water Studio</option>
                  <option>Cyberpunk Neon Holographic Glow</option>
                  <option>Apple Minimalist Clean White</option>
                  <option>Tropical Nature & Sunlight Rays</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'KOLS' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-white mb-1">
                Gacha Người Mẫu Ảo (AI Fashion Model Studio)
              </h2>
              <p className="text-xs text-slate-400">
                Sinh ảnh người mẫu AI diện trang phục thời trang để bán hàng trên Shopee/TikTok Shop
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Gương Mặt & Quốc Gia Người Mẫu:
                </label>
                <select
                  value={ethnicity}
                  onChange={(e) => setEthnicity(e.target.value)}
                  className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                >
                  <option>Người Mẫu Châu Á (Asian Top Model)</option>
                  <option>Người Mẫu Âu Mỹ (Caucasian High-Fashion)</option>
                  <option>Người Mẫu Scandinavia (Nordic Minimalist)</option>
                  <option>Người Mẫu Mỹ La-tinh (Latina Glamour)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Mô Tả Trang Phục:
                </label>
                <input
                  type="text"
                  value={garmentPrompt}
                  onChange={(e) => setGarmentPrompt(e.target.value)}
                  className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'DANCE' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-white mb-1">
                AI See Dance Studio (Vũ Đạo Bắt Trend Khớp Nhạc)
              </h2>
              <p className="text-xs text-slate-400">
                Tải ảnh chân dung bất kỳ, AI sẽ điều khiển nhân vật thực hiện vũ đạo thịnh hành
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Chọn Điệu Nhảy Trend:
              </label>
              <select
                value={danceName}
                onChange={(e) => setDanceName(e.target.value)}
                className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                <option>Vũ Đạo "Magnetic" TikTok Trend (Hot Trend)</option>
                <option>Vũ Đạo K-Pop "Supernova" Hip-hop</option>
                <option>Điệu Nhảy Chachacha Cổ Điển</option>
              </select>
            </div>
          </div>
        )}

        <div className="pt-5 border-t border-white/10 mt-5">
          <Button
            variant="primary"
            size="lg"
            onClick={handleCreate}
            isLoading={isRendering}
            className="w-full"
          >
            <Zap className="w-4 h-4 mr-1.5 text-amber-300" />
            Khởi Tạo Ngay Với Fast App
          </Button>
        </div>
      </div>

      {/* Showcase Gallery */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Sản Phẩm Đã Tạo Gần Đây:</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-dark-900/80 border border-white/10 overflow-hidden hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-black overflow-hidden">
                <img
                  src={item.thumbnail_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <button
                  type="button"
                  onClick={() => setPreviewItem(item)}
                  className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-glow-cyan"
                >
                  <Play className="w-4 h-4 ml-0.5" />
                </button>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="cyan" className="text-[10px]">
                    {item.app_type}
                  </Badge>
                  <span className="text-[11px] text-amber-300 font-mono font-bold">
                    {item.credits_charged} cr
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-1">
                  {item.title}
                </h3>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {item.created_at}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <Modal
          isOpen={true}
          onClose={() => setPreviewItem(null)}
          title={previewItem.title}
          size="lg"
        >
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden bg-black aspect-video">
              <video
                src={previewItem.output_url}
                controls
                autoPlay
                loop
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex justify-end">
              <Button size="sm" onClick={() => setPreviewItem(null)}>
                Đóng
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
