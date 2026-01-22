from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.core.database import get_db
from app.models.classes import Classes
from app.classes.schemas import CreateClass
from app.auth.dependencies import admin_required
from uuid import UUID

class_router = APIRouter(
    prefix='/class',
    tags=["Class"]
)


@class_router.get('/')
def get_all_class(
    db:Session=Depends(get_db),
    admin=Depends(admin_required)
):
    classes = db.query(Classes).all()
    
    return classes

@class_router.post('/create')
def create_class(
    body:CreateClass,
    db:Session= Depends(get_db),
    admin= Depends(admin_required)
):
    try:
        new_class = Classes(**body.model_dump())
        db.add(new_class)
        db.commit()
        db.refresh(new_class)
        
        return new_class
    except IntegrityError as e:
        db.rollback()
        if "unique_class_per_term" in e.orig: 
            raise HTTPException(409, "Class already exists for this subject and semester")

        raise HTTPException(400, "Invalid class data")
    
@class_router.post("/toggle-active/{id}")
def toggle_active(
    id:UUID,
    db: Session= Depends(get_db),
    admin=Depends(admin_required)
):
    class_exist = db.query(Classes).filter(
        Classes.id == id,
    ).first()
    
    if not class_exist:
        raise HTTPException(404, "Class not found")
    
    class_exist.is_active= not class_exist.is_active
    db.commit()
    db.refresh(class_exist)
    
    return class_exist
    