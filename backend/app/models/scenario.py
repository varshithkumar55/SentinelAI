from pydantic import BaseModel


class ScenarioRequest(BaseModel):
    scenario: str
    mission: str
    objective: str
    missionType: str
    environment: str
    priority: str
    riskTolerance: str
    personnel: str
    vehicles: str
    equipment: str
    budget: str
    constraints: str
    startDate: str
    duration: str
    notes: str