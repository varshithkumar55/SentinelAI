from datetime import datetime
from pydantic import BaseModel


class MissionCreateRequest(BaseModel):

    title: str

    mission_type: str

    scenario: str

    ai_response: str

    recommendation: str | None = None

    confidence: float

    risk_level: str

    status: str = "Completed"


class MissionResponse(BaseModel):

    id: str

    title: str

    mission_type: str

    scenario: str

    ai_response: str

    recommendation: str | None

    confidence: float

    risk_level: str

    status: str

    created_at: datetime