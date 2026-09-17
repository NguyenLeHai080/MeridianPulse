from typing import List, Optional
from pydantic import BaseModel


class ProxyNode(BaseModel):
    id: str
    ip_address: str
    port: int
    protocol: str  # SOCKS5 / HTTP
    location: str  # SG, JP, US, VN
    latency_ms: int
    success_rate: float
    is_alive: bool


class UpstreamAccount(BaseModel):
    id: str
    provider: str  # Google Veo, Kling AI, Minimax
    account_email: str
    session_status: str  # ACTIVE, REFRESH_NEEDED, EXPIRED
    credits_remaining: int
    daily_quota_used: str


class RunningHubWorkflow(BaseModel):
    id: str
    name: str
    comfy_app_id: str
    node_count: int
    avg_execution_sec: int
    status: str


class AdminSystemStats(BaseModel):
    total_users: int
    total_videos_generated: int
    active_workers: int
    proxies_alive_count: int
    gpu_queue_depth: int
