import uuid
from sqlalchemy import (
    Float,
    ForeignKey,
    String,
    Text,
)

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.database.base import BaseModel


class Mission(BaseModel):

    __tablename__ = "missions"

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    mission_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    scenario: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    ai_response: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    recommendation: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    confidence: Mapped[float] = mapped_column(
        Float,
        default=0,
    )

    risk_level: Mapped[str] = mapped_column(
        String(50),
        default="Low",
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="Completed",
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
    )

    user = relationship(
        "User",
        back_populates="missions",
    )