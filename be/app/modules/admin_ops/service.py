from typing import List
from app.modules.admin_ops.schemas import (
    ProxyNode,
    UpstreamAccount,
    RunningHubWorkflow,
    AdminSystemStats
)


class AdminOpsService:
    def __init__(self):
        self._proxies: List[ProxyNode] = [
            ProxyNode(id="px-01", ip_address="103.145.4.12", port=1080, protocol="SOCKS5", location="SG - Singapore", latency_ms=42, success_rate=99.4, is_alive=True),
            ProxyNode(id="px-02", ip_address="139.180.201.88", port=8080, protocol="HTTP", location="JP - Tokyo", latency_ms=68, success_rate=98.9, is_alive=True),
            ProxyNode(id="px-03", ip_address="198.51.100.45", port=1080, protocol="SOCKS5", location="US - California", latency_ms=164, success_rate=99.1, is_alive=True),
            ProxyNode(id="px-04", ip_address="118.69.135.22", port=3128, protocol="HTTP", location="VN - Ho Chi Minh", latency_ms=18, success_rate=99.8, is_alive=True),
            ProxyNode(id="px-05", ip_address="45.76.182.11", port=1080, protocol="SOCKS5", location="US - New York", latency_ms=195, success_rate=95.2, is_alive=True),
        ]

        self._upstream_accounts: List[UpstreamAccount] = [
            UpstreamAccount(id="acc-01", provider="Google Veo 3.1", account_email="veo-pool-enterprise-01@plenxai.net", session_status="ACTIVE", credits_remaining=42800, daily_quota_used="24%"),
            UpstreamAccount(id="acc-02", provider="Kling AI v2.0", account_email="kling-vip-cluster-04@plenxai.net", session_status="ACTIVE", credits_remaining=19500, daily_quota_used="58%"),
            UpstreamAccount(id="acc-03", provider="Minimax Hailuo", account_email="minimax-fast-pipe-02@plenxai.net", session_status="ACTIVE", credits_remaining=86000, daily_quota_used="12%"),
            UpstreamAccount(id="acc-04", provider="Fal.ai Flux LoRA", account_email="fal-gpu-fleet@plenxai.net", session_status="ACTIVE", credits_remaining=31000, daily_quota_used="35%")
        ]

        self._running_hub_workflows: List[RunningHubWorkflow] = [
            RunningHubWorkflow(id="rh-01", name="Product TVC 3D Luxury Studio", comfy_app_id="app-comfy-tvc-4k", node_count=48, avg_execution_sec=14, status="READY"),
            RunningHubWorkflow(id="rh-02", name="Gacha KOLs Fashion Swapper", comfy_app_id="app-comfy-kols-faceid", node_count=36, avg_execution_sec=8, status="READY"),
            RunningHubWorkflow(id="rh-03", name="AI See Dance Pose Estimation", comfy_app_id="app-comfy-animate-diff", node_count=52, avg_execution_sec=22, status="READY")
        ]

    def get_proxies(self) -> List[ProxyNode]:
        return self._proxies

    def get_upstream_accounts(self) -> List[UpstreamAccount]:
        return self._upstream_accounts

    def get_running_hub_workflows(self) -> List[RunningHubWorkflow]:
        return self._running_hub_workflows

    def get_stats(self) -> AdminSystemStats:
        return AdminSystemStats(
            total_users=1284,
            total_videos_generated=18490,
            active_workers=16,
            proxies_alive_count=len([p for p in self._proxies if p.is_alive]),
            gpu_queue_depth=3
        )


admin_ops_service = AdminOpsService()
