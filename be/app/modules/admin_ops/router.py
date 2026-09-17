from typing import List
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user, require_roles
from app.modules.auth.models import Role, User
from app.modules.admin_ops.schemas import (
    ProxyNode,
    UpstreamAccount,
    RunningHubWorkflow,
    AdminSystemStats
)
from app.modules.admin_ops.service import admin_ops_service

router = APIRouter(prefix="/admin", tags=["PlenxAI Operations & Admin"])


@router.get("/stats", response_model=AdminSystemStats)
def get_system_stats(
    current_user: User = Depends(require_roles([Role.ADMIN]))
):
    return admin_ops_service.get_stats()


@router.get("/proxies", response_model=List[ProxyNode])
def get_proxy_nodes(
    current_user: User = Depends(require_roles([Role.ADMIN]))
):
    """List rotating proxy farm nodes with latency and health metrics."""
    return admin_ops_service.get_proxies()


@router.get("/upstream-accounts", response_model=List[UpstreamAccount])
def get_upstream_accounts(
    current_user: User = Depends(require_roles([Role.ADMIN]))
):
    """Monitor upstream accounts, token sessions, and quota limits."""
    return admin_ops_service.get_upstream_accounts()


@router.get("/running-hub", response_model=List[RunningHubWorkflow])
def get_running_hub_workflows(
    current_user: User = Depends(require_roles([Role.ADMIN]))
):
    """Inspect ComfyUI RunningHub workflows connected to PlenxAI."""
    return admin_ops_service.get_running_hub_workflows()
