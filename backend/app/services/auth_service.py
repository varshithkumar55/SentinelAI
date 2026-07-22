from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    verify_password,
)
from app.models.user import User
import secrets
import hashlib
from datetime import timedelta

from app.schemas.auth import (
    LoginRequest,
    RegisterRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
)
from app.services.email_service import send_password_reset_email
def register_user(
    db: Session,
    user_data: RegisterRequest,
):

    if not user_data.accept_terms:
        raise ValueError(
            "You must accept the Terms & Conditions."
        )

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
def forgot_password(
    db: Session,
    request: ForgotPasswordRequest,
):

    print("\n========== FORGOT PASSWORD ==========")
    print("Requested email:", request.email)
    all_users = db.query(User).all()

    print("\nRegistered users:")

    for u in all_users:
        print(u.email)
    user = (
        db.query(User)
        .filter(User.email == request.email)
        .first()
    )

    print("User found:", user)

    # Don't reveal whether the email exists
    if not user:
        print("No matching user found.")
        print("=====================================\n")
        return

    print("User exists. Generating reset token...")

    token = secrets.token_urlsafe(32)

    hashed_token = hashlib.sha256(
        token.encode()
    ).hexdigest()

    user.password_reset_token = hashed_token

    user.password_reset_expires = (
        datetime.now(timezone.utc)
        + timedelta(minutes=30)
    )

    db.commit()

    print("Reached before email function")

    send_password_reset_email(
        recipient_email=user.email,
        recipient_name=f"{user.first_name} {user.last_name}",
        reset_token=token,
    )

    print("Returned from email function")
    print("=====================================\n")

    return
def reset_password(
    db: Session,
    request: ResetPasswordRequest,
):

    if request.password != request.confirm_password:
        raise ValueError("Passwords do not match.")

    hashed_token = hashlib.sha256(
        request.token.encode()
    ).hexdigest()

    user = (
        db.query(User)
        .filter(User.password_reset_token == hashed_token)
        .first()
    )

    if not user:
        raise ValueError("Invalid or expired reset token.")

    if (
        user.password_reset_expires is None
        or user.password_reset_expires < datetime.now(timezone.utc)
    ):
        raise ValueError("Reset token has expired.")

    user.password_hash = hash_password(request.password)

    user.password_reset_token = None
    user.password_reset_expires = None

    db.commit()