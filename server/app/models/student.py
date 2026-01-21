from sqlalchemy import Column, String, Integer, DateTime ,Boolean, ForeignKey, CheckConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid

from app.core.database import Base

class Student(Base):
    __tablename__="students"
    
    id=Column(
        UUID(as_uuid=True),
        nullable=False,
        primary_key=True,
        index=True,
        unique=True,
        default=uuid.uuid4
    )
    
    full_name=Column(
        String,
        nullable=False,
    )
    
    email=Column(
        String,
        nullable=False,
        unique=True
    )
    
    enrollment_no= Column(
        String, 
        unique=True,
        nullable=False
    )
    
    department_id = Column(
        UUID(as_uuid=True),
        ForeignKey("departments.id"),
        nullable=False,
        index=True
    )
    
    semester = Column(
        Integer, 
        nullable=False
    )
    
    is_active = Column(
        Boolean, 
        default=True,
    )
    
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
    
    updated_at = Column(
        DateTime(timezone=True),
        onupdate=func.now()
    )
    
    __table_args__ = (
        CheckConstraint("semester > 0", name="semester_positive"),
    )
    
    department = relationship("Department", lazy="selectin")