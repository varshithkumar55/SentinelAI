from pydantic import BaseModel, EmailStr, Field


class ProfileResponse(BaseModel):
    id: str

    first_name: str

    last_name: str

    email: EmailStr

    role: str

    phone: str | None = None

    organization: str | None = None

    bio: str | None = None


class ProfileUpdateRequest(BaseModel):
    first_name: str = Field(
        min_length=2,
        max_length=50,
    )

    last_name: str = Field(
        min_length=2,
        max_length=50,
    )

    phone: str | None = Field(
        default=None,
        max_length=20,
    )

    organization: str | None = Field(
        default=None,
        max_length=255,
    )

    bio: str | None = Field(
        default=None,
        max_length=1000,
    )
class ChangePasswordRequest(BaseModel):

    current_password: str = Field(
        min_length=8,
        max_length=128,
    )

    new_password: str = Field(
        min_length=8,
        max_length=128,
    )

    confirm_password: str = Field(
        min_length=8,
        max_length=128,
    )