from fastapi import APIRouter

from app.api.auth import router as auth_router
from app.models.scenario import ScenarioRequest
from app.services.ai_service import analyze_scenario
from app.api.profile import router as profile_router
from app.api.mission import router as mission_router
router = APIRouter()


# ==========================
# AI Routes
# ==========================

@router.post("/analyze")
def analyze(request: ScenarioRequest):
    return analyze_scenario(request)


# ==========================
# Authentication Routes
# ==========================

router.include_router(auth_router)
router.include_router(profile_router)
router.include_router(mission_router)