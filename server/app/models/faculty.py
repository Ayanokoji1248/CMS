from sqlalchemy import Column, String, ForeignKey, DateTime, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

import uuid

from app.core.database import Base

class Faculty(Base):
    __tablename__ = "faculty"
    
    id=Column(
        UUID(as_uuid=True),
        primary_key=True,
        nullable=False,
        index=True,
        default=uuid.uuid4
    )
    
    full_name = Column(
        String,
        nullable=False,
    )
    
    email=Column(
        String,
        nullable=False,
        unique=True,
        index=True
    )
    
    department_id = Column(
        UUID(as_uuid=True),
        ForeignKey("departments.id"),
        nullable=False,
        index=True
    )
    
    designation = Column(
        String,
        nullable=False
    )
    
    is_active = Column(
        Boolean, 
        default=True,
        nullable=False
    )
    
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
    
    updated_at = Column(
        DateTime(timezone=True),
        onupdate=func.now()
    )

    
    department = relationship("Department", lazy="selectin")