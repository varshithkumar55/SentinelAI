import os
import uuid
from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
)
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.schemas.profile import (
    ChangePasswordRequest,
    ProfileResponse,
    ProfileUpdateRequest,
)
from app.services.profile_service import (
    change_password,
    get_profile,
    update_profile,
    upload_avatar,
)

router = APIRouter(
    prefix="/profile",
    tags=["Profile"],
)


@router.get(
    "/me",
    response_model=ProfileResponse,
)
def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    user = get_profile(
        db,
        current_user.id,
    )

    return ProfileResponse(
        id=str(user.id),
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        role=user.role.value,
        phone=user.phone,
        organization=user.organization,
        bio=user.bio,
        profile_image=user.profile_image,
    )


@router.put(
    "/me",
    response_model=ProfileResponse,
)
def update_my_profile(
    profile: ProfileUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    user = update_profile(
        db,
        current_user,
        profile,
    )

    return ProfileResponse(
        id=str(user.id),
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        role=user.role.value,
        phone=user.phone,
        organization=user.organization,
        bio=user.bio,
        profile_image=user.profile_image,
    )
@router.put("/change-password")
def change_my_password(
    password: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    try:

        change_password(
            db,
            current_user,
            password,
        )

        return {
            "message": "Password updated successfully."
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )
@router.post("/avatar")
def upload_profile_avatar(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    try:

        user = upload_avatar(
            db,
            current_user,
            file,
        )

        return {
            "message": "Avatar uploaded successfully.",
            "profile_image": user.profile_image,
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )