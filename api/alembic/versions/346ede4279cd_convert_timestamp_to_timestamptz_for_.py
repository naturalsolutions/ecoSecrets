"""Convert Timestamp to Timestamptz for file date column

Revision ID: 346ede4279cd
Revises: 7f9fbde02f83
Create Date: 2025-03-18 11:13:25.540993

"""

import sqlalchemy as sa
import sqlmodel

from alembic import op

# revision identifiers, used by Alembic.
revision = "346ede4279cd"
down_revision = "7f9fbde02f83"
branch_labels = None
depends_on = None


def upgrade():
    op.execute("""
            ALTER TABLE files 
            ALTER COLUMN date TYPE TIMESTAMPTZ USING date AT TIME ZONE 'UTC';
         """)


def downgrade():
    op.execute("""
            ALTER TABLE files 
            ALTER COLUMN date TYPE TIMESTAMP USING date AT TIME ZONE 'UTC';
        """)
