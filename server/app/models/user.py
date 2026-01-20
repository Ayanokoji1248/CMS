from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
import enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID

class UserRole(enum.Enum):
    ADMIN="ADMIN"
    STUDENT="STUDENT"
    FACULTY="FACULTY"

class User(Base):
    __tablename__ = "users"
    
    id=Column(
        UUID(as_uuid=True),
        primary_key=True,
        index=True,
        unique=True,
        default=uuid.uuid4
    )
    
    email=Column(
        String,
        unique=True,
        index=True,
        nullable=False
    )
    
    password= Column(
        String,
        nullable=False
    )
    
    is_active=Column(
        Boolean,
        default=True
    )

    role=Column(
        Enum(UserRole, name="user_roles"),
        nullable=False
    )    
    
    profile_id = Column(
        UUID(as_uuid=True),
        nullable=True
    )
    
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )