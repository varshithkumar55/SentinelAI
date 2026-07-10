from pydantic import BaseModel
from typing import List


class AIResponse(BaseModel):
    summary: str
    risk_level: str
    confidence: int
    recommended_strategy: str
    reasoning: List[str]
    alternative_strategies: List[str]
    resource_plan: str
    timeline: str
    key_risks: List[str]