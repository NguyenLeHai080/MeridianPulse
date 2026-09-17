export type Role = 'ADMIN' | 'VIP_CREATOR' | 'CREATOR' | 'USER';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  is_active: boolean;
  credit_balance: number;
  avatar_url?: string;
  plan: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in_seconds: number;
  user: User;
}

export type VideoModel = 'veo-3.1-pro' | 'kling-v2.0-master' | 'minimax-hailuo-fast';
export type AspectRatio = '16:9' | '9:16' | '1:1';

export interface VideoJob {
  id: string;
  user_email: string;
  prompt: string;
  model: VideoModel;
  aspect_ratio: AspectRatio;
  duration_seconds: number;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  progress_percentage: number;
  video_url?: string;
  thumbnail_url?: string;
  credits_charged: number;
  created_at: string;
}

export interface FastAppItem {
  id: string;
  app_type: 'PRODUCT_TVC' | 'GACHA_KOLS' | 'SEE_DANCE';
  title: string;
  output_url: string;
  thumbnail_url: string;
  credits_charged: number;
  created_at: string;
}

export interface TikTokScrapedResult {
  id: string;
  original_url: string;
  author_name: string;
  author_avatar: string;
  title: string;
  like_count: string;
  comment_count: string;
  share_count: string;
  no_watermark_video_url: string;
  thumbnail_url: string;
  vision_script_analysis: string;
  suggested_veo_prompt: string;
  suggested_kling_prompt: string;
  music_title: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price_vnd: string;
  credits_amount: number;
  bonus_credits: number;
  features: string[];
  is_popular?: boolean;
}

export interface Transaction {
  id: string;
  type: 'PURCHASE' | 'CONSUMPTION';
  description: string;
  amount: number;
  created_at: string;
}

export interface ProxyNode {
  id: string;
  ip_address: string;
  port: number;
  protocol: string;
  location: string;
  latency_ms: number;
  success_rate: number;
  is_alive: boolean;
}

export interface UpstreamAccount {
  id: string;
  provider: string;
  account_email: string;
  session_status: string;
  credits_remaining: number;
  daily_quota_used: string;
}

export interface RunningHubApp {
  id: string;
  name: string;
  comfy_app_id: string;
  node_count: number;
  avg_execution_sec: number;
  status: string;
}
