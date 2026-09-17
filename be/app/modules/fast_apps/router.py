from typing import List
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.modules.auth.models import User
from app.modules.fast_apps.schemas import (
    ProductTvcRequest,
    GachaKolsRequest,
    SeeDanceRequest,
    FastAppResponse
)
from app.modules.fast_apps.service import fast_apps_service

router = APIRouter(prefix="/fast-apps", tags=["Fast Apps & E-Commerce Creator"])


@router.post("/product-tvc", response_model=FastAppResponse)
def create_product_tvc(
    req: ProductTvcRequest,
    current_user: User = Depends(get_current_user)
):
    return fast_apps_service.create_product_tvc(current_user.email, req)


@router.post("/gacha-kols", response_model=FastAppResponse)
def create_gacha_kols(
    req: GachaKolsRequest,
    current_user: User = Depends(get_current_user)
):
    return fast_apps_service.create_gacha_kols(current_user.email, req)


@router.post("/see-dance", response_model=FastAppResponse)
def create_see_dance(
    req: SeeDanceRequest,
    current_user: User = Depends(get_current_user)
):
    return fast_apps_service.create_see_dance(current_user.email, req)


@router.get("/gallery", response_model=List[FastAppResponse])
def get_fast_apps_gallery():
    return fast_apps_service.get_gallery()
