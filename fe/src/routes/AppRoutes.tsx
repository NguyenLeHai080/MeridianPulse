import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard } from '@/core/guards/AuthGuard';
import { AppLayout } from '@/components/layout/AppLayout';
import { LoginPage } from '@/modules/auth/pages/LoginPage';
import { VideoStudioPage } from '@/modules/video_studio/pages/VideoStudioPage';
import { FastAppsPage } from '@/modules/fast_apps/pages/FastAppsPage';
import { TikTokScraperPage } from '@/modules/tiktok_tools/pages/TikTokScraperPage';
import { VoiceStudioPage } from '@/modules/voice_studio/pages/VoiceStudioPage';
import { PricingPlansPage } from '@/modules/billing/pages/PricingPlansPage';
import { AdminConsolePage } from '@/modules/admin_ops/pages/AdminConsolePage';
import { PlenxLandingPage } from '@/modules/home/pages/PlenxLandingPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 1. Public PlenxAI Homepage & Creative Showcase Hub */}
      <Route path="/" element={<PlenxLandingPage />} />

      {/* 2. Public Authentication Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* 3. Protected PlenxAI Creator Workstation Routes */}
      <Route element={<AuthGuard />}>
        <Route element={<AppLayout />}>
          <Route path="/studio" element={<VideoStudioPage />} />
          <Route path="/fast-apps" element={<FastAppsPage />} />
          <Route path="/tiktok-tools" element={<TikTokScraperPage />} />
          <Route path="/voice" element={<VoiceStudioPage />} />
          <Route path="/billing" element={<PricingPlansPage />} />
          <Route path="/admin" element={<AdminConsolePage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
