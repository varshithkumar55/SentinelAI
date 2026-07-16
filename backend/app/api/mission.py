from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.session import get_db
from app.models.user import User

from app.schemas.mission import (
    MissionCreateRequest,
    MissionResponse,
)

from app.services.mission_service import (
    create_mission,
    get_user_missions,
    get_mission_by_id,
    delete_mission,
)

router = APIRouter(
    prefix="/missions",
    tags=["Missions"],
)


@router.post(
    "",
    response_model=MissionResponse,
)
def create_new_mission(
    mission: MissionCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    mission = create_mission(
        db,
        current_user,
        mission,
    )

    return MissionResponse(
        id=str(mission.id),

        title=mission.title,
        mission_type=mission.mission_type,
        scenario=mission.scenario,

        objective=mission.objective,
        environment=mission.environment,
        priority=mission.priority,
        risk_tolerance=mission.risk_tolerance,

        personnel=mission.personnel,
        vehicles=mission.vehicles,
        equipment=mission.equipment,
        budget=mission.budget,

        constraints=mission.constraints,
        duration=mission.duration,
        notes=mission.notes,

        ai_response=mission.ai_response,
        recommendation=mission.recommendation,
        analysis_json=mission.analysis_json,

        confidence=mission.confidence,
        risk_level=mission.risk_level,
        status=mission.status,

        created_at=mission.created_at,
    )


@router.get(
    "",
    response_model=list[MissionResponse],
)
def get_all_missions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    missions = get_user_missions(
        db,
        current_user,
    )

    return [

        MissionResponse(
        id=str(m.id),

        title=m.title,
        mission_type=m.mission_type,
        scenario=m.scenario,

        objective=m.objective,
        environment=m.environment,
        priority=m.priority,
        risk_tolerance=m.risk_tolerance,

        personnel=m.personnel,
        vehicles=m.vehicles,
        equipment=m.equipment,
        budget=m.budget,

        constraints=m.constraints,
        duration=m.duration,
        notes=m.notes,

        ai_response=m.ai_response,
        recommendation=m.recommendation,
        analysis_json=m.analysis_json,

        confidence=m.confidence,
        risk_level=m.risk_level,
        status=m.status,

        created_at=m.created_at,
    )
        for m in missions

    ]
@router.get(
    "/{mission_id}",
    response_model=MissionResponse,
)
def get_single_mission(
    mission_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    m = get_mission_by_id(
        db,
        current_user,
        mission_id,
    )

    return MissionResponse(
        id=str(m.id),

        title=m.title,
        mission_type=m.mission_type,
        scenario=m.scenario,

        objective=m.objective,
        environment=m.environment,
        priority=m.priority,
        risk_tolerance=m.risk_tolerance,

        personnel=m.personnel,
        vehicles=m.vehicles,
        equipment=m.equipment,
        budget=m.budget,

        constraints=m.constraints,
        duration=m.duration,
        notes=m.notes,

        ai_response=m.ai_response,
        recommendation=m.recommendation,
        analysis_json=m.analysis_json,

        confidence=m.confidence,
        risk_level=m.risk_level,
        status=m.status,

        created_at=m.created_at,
    )
@router.delete("/{mission_id}")
def delete_existing_mission(
    mission_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    delete_mission(
        db,
        current_user,
        mission_id,
    )

    return {
        "message": "Mission deleted successfully"
    }