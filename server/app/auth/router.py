from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from app.auth.schemas import LoginRequest
from app.core.database import get_db
from app.models.user import User
from app.auth.service import authenticate_user

auth_router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@auth_router.post('/login')
def login(
    body:LoginRequest,
    response:Response,
    db:Session= Depends(get_db),
):
    token = authenticate_user(
        db, 
        email=body.email,
        password=body.password
    )
    
    if not token:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
        
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60*60,
    )
    
    return {
        "message":"Login successful"
    }
    

@auth_router.post('/logout')
def logout(
    response: Response
):
    response.delete_cookie("access_token")
    return {
        "message":"Logged out"
    }
    
