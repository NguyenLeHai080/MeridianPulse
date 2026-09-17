from typing import List
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.modules.auth.models import User
from app.modules.credits.schemas import (
    CreditBalanceResponse,
    PricingPlan,
    BuyCreditsRequest,
    TransactionItem
)
from app.modules.credits.service import credits_service

router = APIRouter(prefix="/credits", tags=["Billing & Credit Engine"])


@router.get("/balance", response_model=CreditBalanceResponse)
def get_credit_balance(current_user: User = Depends(get_current_user)):
    return credits_service.get_balance(current_user.email)


@router.get("/plans", response_model=List[PricingPlan])
def get_pricing_plans():
    return credits_service.get_plans()


@router.post("/buy", response_model=CreditBalanceResponse)
def buy_credits_plan(
    req: BuyCreditsRequest,
    current_user: User = Depends(get_current_user)
):
    return credits_service.buy_plan(current_user.email, req.plan_id)


@router.get("/ledger", response_model=List[TransactionItem])
def get_transaction_ledger(current_user: User = Depends(get_current_user)):
    return credits_service.get_transactions()
