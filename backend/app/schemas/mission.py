from datetime import datetime
from pydantic import BaseModel


class MissionCreateRequest(BaseModel):

    title: str

    mission_type: str

    scenario: str
    objective: str | None = None

    environment: str | None = None

    priority: str | None = None

    risk_tolerance: str | None = None

    personnel: str | None = None

    vehicles: str | None = None

    equipment: str | None = None

    budget: str | None = None

    constraints: str | None = None

    duration: str | None = None

    notes: str | None = None

    ai_response: str

    recommendation: str | None = None
    analysis_json: dict | None = None
    confidence: float

    risk_level: str

    status: str = "Completed"


class MissionResponse(BaseModel):

    id: str

    title: str

    mission_type: str

    scenario: str
    objective: str | None

    environment: str | None

    priority: str | None

    risk_tolerance: str | None

    personnel: str | None

    vehicles: str | None

    equipment: str | None

    budget: str | None

    constraints: str | None

    duration: str | None

    notes: str | None

    ai_response: str

    recommendation: str | None
    analysis_json: dict | None = None
    confidence: float

    risk_level: str

    status: str

    created_at: datetime
