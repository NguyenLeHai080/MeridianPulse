import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlenxNavbar } from '../components/PlenxNavbar';
import { PlenxHero } from '../components/PlenxHero';
import { ShowcaseGrid, ShowcaseCardData } from '../components/ShowcaseGrid';
import { AiModelsSection } from '../components/AiModelsSection';
import { SpecializedToolsSection } from '../components/SpecializedToolsSection';
import { WhyChooseSection } from '../components/WhyChooseSection';
import { CtaBanner } from '../components/CtaBanner';
import { PlenxFooter } from '../components/PlenxFooter';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { Sparkles, ArrowRight } from 'lucide-react';

export const PlenxLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'ALL' | 'VIDEO' | 'IMAGE'>('ALL');
  const [previewCard, setPreviewCard] = useState<ShowcaseCardData | null>(null);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-fuchsia-500 selection:text-white">
      {/* Top Fixed PlenX Navigation Bar */}
      <PlenxNavbar />

      {/* Main Landing Sections */}
      <main className="flex-1">
        {/* 1. Hero with Announcement, Title & Action buttons */}
        <PlenxHero filter={filter} onFilterChange={setFilter} />

        {/* 2. 5 Main Feature Showcase Cards */}
        <ShowcaseGrid filter={filter} onOpenPreview={(card) => setPreviewCard(card)} />

        {/* 3. AI Models Hàng Đầu */}
        <AiModelsSection />

        {/* 4. Công Cụ AI Chuyên Biệt (12+ Tools) */}
        <SpecializedToolsSection />

        {/* 5. Tại Sao Chọn PlenX AI? */}
        <WhyChooseSection />

        {/* 6. Call To Action Gradient Banner */}
        <CtaBanner />
      </main>

      {/* 7. Footer */}
      <PlenxFooter />

      {/* Instant Video Preview Modal */}
      {previewCard && (
        <Modal
          isOpen={true}
          onClose={() => setPreviewCard(null)}
          title={`Xem Trước Kết Quả: ${previewCard.title}`}
          size="lg"
        >
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden bg-black aspect-video">
              <video
                src={previewCard.videoPreviewUrl || 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-dancing-in-a-studio-41121-large.mp4'}
                controls
                autoPlay
                loop
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {previewCard.description}
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
              <Button size="sm" variant="ghost" onClick={() => setPreviewCard(null)}>
                Đóng
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  setPreviewCard(null);
                  navigate(previewCard.targetPath);
                }}
              >
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                <span>Mở Công Cụ Này Ngay</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
