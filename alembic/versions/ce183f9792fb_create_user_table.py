"""create user table

Revision ID: ce183f9792fb
Revises: b87d9adc24fe
Create Date: 2025-09-11 07:03:09.162934

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ce183f9792fb'
down_revision: Union[str, Sequence[str], None] = 'b87d9adc24fe'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table("users", 
                    sa.Column("id", sa.Integer, primary_key=True, nullable=False),
                    sa.Column("email", sa.String, nullable=False, unique=True),
                    sa.Column("password", sa.String, nullable=False),
                    sa.Column("created_at", sa.TIMESTAMP(timezone=True), nullable=False, server_default=sa.text('now()')),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email')
                    )
    pass


def downgrade() -> None:
    op.drop_table('users')
    pass
