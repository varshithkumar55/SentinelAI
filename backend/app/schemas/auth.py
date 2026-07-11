from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):

    first_name: str = Field(
        min_length=2,
        max_length=50,
    )

    last_name: str = Field(
        min_length=2,
        max_length=50,
    )

    email: EmailStr

    password: str = Field(
        min_length=8,
        max_length=128,
    )

    confirm_password: str

    accept_terms: bool


class LoginRequest(BaseModel):

    email: EmailStr

    password: str

    remember_me: bool = False


class UserResponse(BaseModel):

    id: str

    full_name: str

    email: str

    role: str

    email_verified: bool


class TokenResponse(BaseModel):

    access_token: str

    refresh_token: str

    token_type: str = "bearer"

    user: UserResponse