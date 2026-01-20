from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, DateTime, CheckConstraint
from sqlalchemy.sql import func
import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.core.database import Base

class Subject(Base):
    __tablename__ = "subjects"
    
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True
    )
    
    name= Column(
        String,
        nullable=False,
    )
    
    code = Column(
        String,
        nullable=False,
        unique=True
    )
    
    credits = Column(
        Integer,
        default=0,
        nullable=False,
    )
    
    department_id=Column(
        UUID(as_uuid=True),
        ForeignKey("departments.id"),
        nullable=False,
        index=True    
    )

    is_active= Column(
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

    department= relationship("Department", lazy="selectin")
    
    __table_args__ = (
        CheckConstraint("credits>=0", name="credits_non_negative")
    )
    