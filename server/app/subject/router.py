from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.subject import Subject
from app.models.department import Department
from app.auth.dependencies import get_current_user, admin_required
from app.subject.schemas import CreateSubject
from uuid import UUID

subject_router = APIRouter(
    prefix='/subject',
    tags=["Subject"]
)

@subject_router.get('/')
def get_all_subject(
    db:Session = Depends(get_db),
    admin = Depends(admin_required)
):    
    subjects = db.query(Subject).all()
    
    return subjects

@subject_router.post('/create')
def create_subject(
    body:CreateSubject,
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):    
    existing_subject = db.query(Subject).filter(
        Subject.code == body.code
    ).first()
    
    
    if existing_subject:
        raise HTTPException(400, "Subject already exists")
    
    department = db.query(Department).filter(
        Department.id == body.department_id
    ).first()
    
    if not department.is_active:
        raise HTTPException(400, "Department is not active")
    
    subject = Subject(**body.model_dump())
    
    db.add(subject)
    db.commit()
    db.refresh(subject)
    
    
    return subject

@subject_router.post('/toggle-active/{id}')
def toggle_active(
    id:UUID,
    admin = Depends(admin_required),
    db: Session = Depends(get_db)
):    
    subject = db.query(Subject).filter(
        Subject.id == id
    ).first()
    
    if not subject:
        raise HTTPException(404, "Subject not found")
    
    subject.is_active = not subject.is_active
    
    db.commit()
    db.refresh(subject)
    
    return subject
