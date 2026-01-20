from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Boolean, CheckConstraint, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID
import uuid

from app.core.database import Base

class Class(Base):
    __tablename__ = "classes"
    
    id=Column(
        UUID(as_uuid=True),
        primary_key=True,
        index=True,
        default=uuid.uuid4
    )
    
    subject_id = Column(
        UUID(as_uuid=True),
        ForeignKey("subjects.id"),
        index=True,
        nullable=False,
    )
    
    faculty_id = Column(
        UUID(as_uuid=True),
        ForeignKey("faculty.id"),
        index=True,
        nullable=False
    )
    
    semester = Column(
        Integer,
        nullable=False
    )
    
    capacity = Column(
        Integer, 
        nullable=False
    )
    
    academic_year = Column(
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

    
    subject = relationship(
        "Subject",
        lazy="selectin"
    )
    
    faculty = relationship(
        "Faculty",
        lazy="selectin"
    )
    
    __table_args__ = {
        CheckConstraint("capacity>=0", name="capacity_positive"),
        UniqueConstraint(
            "subject_id",
            "faculty_id",
            "semester",
            name="unique_class_per_term"
        )
    }