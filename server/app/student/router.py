from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.student import Student
from app.models.user import User
from app.models.department import Department
from app.auth.dependencies import admin_required
from app.student.schemas import CreateStudent
from uuid import UUID
from app.core.security import hash_password

student_router = APIRouter(
    prefix='/student',
    tags=["Student"]
)

@student_router.get('/')
def get_all_student(
    db:Session= Depends(get_db),
    admin=Depends(admin_required)
):
    student = db.query(Student).all()
    
    return student

@student_router.post('/create')
def create_student(
    body:CreateStudent,
    db: Session= Depends(get_db),
    admin= Depends(admin_required),
):
    existing_student = db.query(Student).filter(
        Student.email == body.email
    ).first()
    
    if existing_student:
        raise HTTPException(400, "Student already exists")
    
    department = db.query(Department).filter(
        Department.id == body.department_id
    ).first()
    
    if not department.is_active:
        raise HTTPException(400, "Department is not active")
    
    student = Student(**body.model_dump())
    
    db.add(student)
    db.flush()
    
    
    user = User(
        email= body.email,
        password = hash_password("student12"),
        role="STUDENT",
        profile_id = student.id
    )
    
    db.add(user)
    db.commit()
    
    db.refresh(student)
    
    return student