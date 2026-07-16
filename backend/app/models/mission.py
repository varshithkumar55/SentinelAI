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
from sqlalchemy.dialects.postgresql import JSONB

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
    analysis_json: Mapped[dict | None] = mapped_column(
    JSONB,
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
    objective: Mapped[str | None] = mapped_column(
    Text,
    nullable=True,
    )

    environment: Mapped[str | None] = mapped_column(
    String(100),
    nullable=True,
    )

    priority: Mapped[str | None] = mapped_column(
    String(50),
    nullable=True,
    )

    risk_tolerance: Mapped[str | None] = mapped_column(
    String(50),
    nullable=True,
    )

    personnel: Mapped[str | None] = mapped_column(
    Text,
    nullable=True,
    )

    vehicles: Mapped[str | None] = mapped_column(
    Text,
    nullable=True,
    )

    equipment: Mapped[str | None] = mapped_column(
    Text,
    nullable=True,
    )

    budget: Mapped[str | None] = mapped_column(
    Text,
    nullable=True,
    )

    constraints: Mapped[str | None] = mapped_column(
    Text,
    nullable=True,
    )

    duration: Mapped[str | None] = mapped_column(
    String(100),
    nullable=True,
    )

    notes: Mapped[str | None] = mapped_column(
    Text,
    nullable=True,
    )