from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    verify_password,
)
from app.models.user import User
from app.schemas.auth import LoginRequest
from app.schemas.auth import RegisterRequest


def register_user(
    db: Session,
    user_data: RegisterRequest,
):

    if user_data.password != user_data.confirm_password:
        raise ValueError("Passwords do not match.")

    existing_user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if existing_user:
        raise ValueError("Email already registered.")

    new_user = User(
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        email=user_data.email,
        password_hash=hash_password(user_data.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def login_user(
    db: Session,
    login_data: LoginRequest,
):

    user = (
        db.query(User)
        .filter(User.email == login_data.email)
        .first()
    )

    if not user:
        raise ValueError("Invalid email or password.")

    if not verify_password(
        login_data.password,
        user.password_hash,
    ):
        raise ValueError("Invalid email or password.")

    user.last_login = datetime.now(timezone.utc)

    db.commit()

    access_token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
            "role": user.role.value,
        }
    )

    refresh_token = create_refresh_token(
        {
            "sub": str(user.id),
        }
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": user,
    }