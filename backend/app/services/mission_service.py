from sqlalchemy.orm import Session

from app.models.mission import Mission
from app.models.user import User
from app.schemas.mission import MissionCreateRequest


def create_mission(
    db: Session,
    current_user: User,
    mission: MissionCreateRequest,
):

    new_mission = Mission(

        title=mission.title,

        mission_type=mission.mission_type,

        scenario=mission.scenario,

        ai_response=mission.ai_response,

        recommendation=mission.recommendation,

        confidence=mission.confidence,

        risk_level=mission.risk_level,

        status=mission.status,

        user_id=current_user.id,

    )

    db.add(new_mission)

    db.commit()

    db.refresh(new_mission)

    return new_mission


def get_user_missions(
    db: Session,
    current_user: User,
):

    return (

        db.query(Mission)

        .filter(Mission.user_id == current_user.id)

        .order_by(Mission.created_at.desc())

        .all()

    )