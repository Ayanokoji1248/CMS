from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.department import Department  
from app.auth.dependencies import get_current_user
from app.department.schemas import CreateDepartment
from uuid import UUID


department_router = APIRouter(
    prefix="/department",
    tags=["Department"]
)

@department_router.get('/')
def get_all_department(
    db:Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    if current_user.role.value != "ADMIN":
        raise HTTPException(403, "Not Allowed")
    
    departments = db.query(Department).all()
    
    return departments
    

@department_router.post('/')
def create_department(
    body:CreateDepartment,
    db: Session= Depends(get_db),
    current_user = Depends(get_current_user),
):
    if current_user.role.value != "ADMIN":
        raise HTTPException(403, "Not Allowed")
    
    existing_dep = db.query(Department).filter(
        Department.code == body.code
    ).first()
    
    if existing_dep:
        raise HTTPException(400, "Already exists")
    
    
    department = Department(
        name= body.name,
        code=body.code
    )
    
    db.add(department)
    db.commit()
    db.refresh(department)
    
    return department
    
@department_router.post("/toggle-active/{id}")
def toggle_active(   
    id:UUID,
    current_user = Depends(get_current_user),
    db:Session = Depends(get_db),
):
    if current_user.role.value != "ADMIN":
        raise HTTPException(403, "Not Allowed")    
    
    department = db.query(Department).filter(
        Department.id == id
    ).first()
    
    if not department:
        raise HTTPException(404, "Department not found")
    
    department.is_active = not department.is_active
    
    db.commit()
    db.refresh(department)
    
    return department