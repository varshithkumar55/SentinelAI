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

        ai_response=mission.ai_response,

        recommendation=mission.recommendation,

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

            ai_response=m.ai_response,

            recommendation=m.recommendation,

            confidence=m.confidence,

            risk_level=m.risk_level,

            status=m.status,

            created_at=m.created_at,

        )

        for m in missions

    ]