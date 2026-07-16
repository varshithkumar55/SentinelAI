"""restore analysis_json jsonb

Revision ID: c40941b61076
Revises: 758664ca1313
Create Date: 2026-07-15 22:11:43.565539

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'c40941b61076'
down_revision: Union[str, Sequence[str], None] = '758664ca1313'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_column("missions", "analysis_json")

    op.add_column(
        "missions",
        sa.Column(
            "analysis_json",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=True,
        ),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    op.drop_column("missions", "analysis_json")

    op.add_column(
        "missions",
        sa.Column(
            "analysis_json",
            sa.Text(),
            nullable=True,
        ),
    )
    # ### end Alembic commands ###
