from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.auth import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserResponse,
)
from app.services.auth_service import (
    login_user,
    register_user,
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
            ),
        )

    except ValueError as e:

        raise HTTPException(
            status_code=401,
            detail=str(e),
        )