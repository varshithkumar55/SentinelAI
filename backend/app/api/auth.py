from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.auth import RegisterRequest
from app.schemas.auth import UserResponse
from app.services.auth_service import register_user

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

        new_user = register_user(
            db,
            user,
        )

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