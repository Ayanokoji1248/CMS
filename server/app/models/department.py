from sqlalchemy import Column, String, Integer, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from app.core.database import Base

class Department(Base):
    __tablename__="departments"
    
    id=Column(
        UUID(as_uuid=True),
        nullable=False,
        primary_key=True,
        default=uuid.uuid4,
        index=True
    )
    
    name=Column(
        String,
        nullable=False,
        unique=True
    )
    
    code=Column(
        String,
        nullable=False,
        unique=True
    )
    
    is_active=Column(
        Boolean, 
        default=True
    )
    
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
    
    updated_at = Column(
        DateTime(timezone=True),
        onupdate=func.now()
    )