import os

from dotenv import load_dotenv

load_dotenv()


# ==========================
# Gemini AI
# ==========================

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


# ==========================
# Database
# ==========================

DATABASE_URL = os.getenv("DATABASE_URL")


# ==========================
# JWT Authentication
# ==========================

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

JWT_ALGORITHM = os.getenv(
    "JWT_ALGORITHM",
    "HS256"
)

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv(
        "ACCESS_TOKEN_EXPIRE_MINUTES",
        30
    )
)

REFRESH_TOKEN_EXPIRE_DAYS = int(
    os.getenv(
        "REFRESH_TOKEN_EXPIRE_DAYS",
        7
    )
)


# ==========================
# Email (Future)
# ==========================

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
BREVO_API_KEY = os.getenv("BREVO_API_KEY")
BREVO_SENDER_EMAIL = os.getenv("BREVO_SENDER_EMAIL")
BREVO_SENDER_NAME = os.getenv("BREVO_SENDER_NAME")
FRONTEND_URL = os.getenv("FRONTEND_URL")