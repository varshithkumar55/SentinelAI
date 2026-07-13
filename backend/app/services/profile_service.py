from sqlalchemy.orm import Session
from app.core.security import (
    hash_password,
    verify_password,
)
from app.schemas.profile import (
    ChangePasswordRequest,
    ProfileUpdateRequest,
)
from app.models.user import User

def get_profile(db: Session, user_id: str):

    return (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )


def update_profile(
    db: Session,
    user: User,
    profile: ProfileUpdateRequest,
):

    user.first_name = profile.first_name
    user.last_name = profile.last_name
    user.phone = profile.phone
    user.organization = profile.organization
    user.bio = profile.bio

    db.commit()
    db.refresh(user)

    return user
def change_password(
    db: Session,
    user: User,
    password_data: ChangePasswordRequest,
):

    if not verify_password(
        password_data.current_password,
        user.password_hash,
    ):
        raise ValueError("Current password is incorrect.")

    if (
        password_data.new_password
        != password_data.confirm_password
    ):
        raise ValueError(
            "New passwords do not match."
        )

    if verify_password(
        password_data.new_password,
        user.password_hash,
    ):
        raise ValueError(
            "New password must be different from the current password."
        )

    user.password_hash = hash_password(
        password_data.new_password
    )

    db.commit()

    db.refresh(user)

    return user