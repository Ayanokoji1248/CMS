from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.faculty import Faculty
from app.models.department import Department
from app.models.user import User
from app.auth.dependencies import get_current_user, admin_required
from app.faculty.schemas import CreateFaculty
from uuid import UUID
from app.core.security import hash_password

faculty_router = APIRouter(
    prefix="/faculty",
    tags=["Faculty"]
)

@faculty_router.get('/')
def get_all_faculty(
    db:Session = Depends(get_db),
    admin = Depends(admin_required)
):    
    faculty= db.query(Faculty).all()
    
    
    return faculty


@faculty_router.post('/create')
def create_faculty(
    body:CreateFaculty,
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):    
    existing_faculty = db.query(Faculty).filter(
        Faculty.email == body.email
    ).first()
    
    if existing_faculty :
        raise HTTPException(400, "Faculty already exists")
    
    department = db.query(Department).filter(
        Department.id == body.department_id
    ).first()
    
    if not department.is_active:
        raise HTTPException(400, "Department is not active")
    
    
    faculty = Faculty(**body.model_dump())
    db.add(faculty)
    db.flush()
    
    user = User(
        email=body.email,
        password= hash_password("faculty12"),
        role = "FACULTY",
        profile_id = faculty.id
    )
    db.add(user)
    
    db.commit()
    db.refresh(faculty)
    
    return faculty


@faculty_router.post('/toggle-active/{id}')
def toggle_active(
    id:UUID,
    admin =Depends(admin_required),
    db: Session = Depends(get_db)
):    
    faculty = db.query(Faculty).filter(
        Faculty.id == id
    ).first()
    
    if not faculty:
        raise HTTPException(404, "Faculty not found")
    
    faculty.is_active = not faculty.is_active
    db.commit()
    db.refresh(faculty)
    
    return faculty