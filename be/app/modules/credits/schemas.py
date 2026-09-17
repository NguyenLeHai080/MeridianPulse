from typing import List, Optional
from pydantic import BaseModel, Field


class CreditBalanceResponse(BaseModel):
    user_email: str
    credit_balance: int
    plan: str


class PricingPlan(BaseModel):
    id: str
    name: str
    price_vnd: str
    credits_amount: int
    bonus_credits: int
    features: List[str]
    is_popular: bool = False


class BuyCreditsRequest(BaseModel):
    plan_id: str


class TransactionItem(BaseModel):
    id: str
    type: str  # PURCHASE or CONSUMPTION
    description: str
    amount: int
    created_at: str
