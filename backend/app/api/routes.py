from fastapi import APIRouter

from app.models.scenario import ScenarioRequest
from app.services.ai_service import analyze_scenario

router = APIRouter()


@router.post("/analyze")
def analyze(request: ScenarioRequest):
    return analyze_scenario(request)