from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.core.security import (
    create_access_token,
    decode_token,
)
from app.schemas.auth import (
    RegisterRequest,
    LoginRequest,
    TokenResponse,
    UserResponse,
    ForgotPasswordRequest,
    ResetPasswordRequest,
)
from app.services.auth_service import (
    register_user,
    login_user,
    forgot_password,
    reset_password,
)
router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
)
def register(
    user: RegisterRequest,
    db: Session = Depends(get_db),
):

    try:

        new_user = register_user(db, user)

        return UserResponse(
            id=str(new_user.id),
            full_name=new_user.full_name,
            email=new_user.email,
            role=new_user.role.value,
            email_verified=new_user.email_verified,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    credentials: LoginRequest,
    db: Session = Depends(get_db),
):

    try:

        result = login_user(
            db,
            credentials,
        )

        user = result["user"]

        return TokenResponse(
            access_token=result["access_token"],
            refresh_token=result["refresh_token"],
            user=UserResponse(
            id=str(user.id),
            full_name=user.full_name,
            email=user.email,
            role=user.role.value,
            email_verified=user.email_verified,
            phone=user.phone,
            organization=user.organization,
            bio=user.bio,
        )
    )
    

    except ValueError as e:

        raise HTTPException(
            status_code=401,
            detail=str(e),
        )
@router.post("/forgot-password")
def forgot_password_route(
    request: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):
    forgot_password(db, request)

    return {
        "message": (
            "If an account with that email exists, "
            "a password reset link has been sent."
        )
    }
@router.post("/reset-password")
def reset_password_route(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db),
):
    reset_password(db, request)

    return {
        "message": "Password has been reset successfully."
    }
@router.post("/refresh")
def refresh_token(payload: dict):

    refresh_token = payload.get("refresh_token")

    decoded = decode_token(refresh_token)

    if not decoded:

        raise HTTPException(
            status_code=401,
            detail="Invalid refresh token",
        )

    email = decoded.get("sub")

    access_token = create_access_token(
        {
            "sub": email,
        }
    )

    return {
        "access_token": access_token,
    }