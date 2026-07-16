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

def get_mission_by_id(
    db: Session,
    current_user: User,
    mission_id: str,
):
    return (
        db.query(Mission)
        .filter(
            Mission.id == mission_id,
            Mission.user_id == current_user.id,
        )
        .first()
    )

def delete_mission(
    db: Session,
    current_user: User,
    mission_id: str,
):

    mission = (
        db.query(Mission)
        .filter(
            Mission.id == mission_id,
            Mission.user_id == current_user.id,
        )
        .first()
    )

    if not mission:
        raise Exception("Mission not found")

    db.delete(mission)
    db.commit()