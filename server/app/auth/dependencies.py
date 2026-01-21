from fastapi import Depends, HTTPException, Request
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.core.jwt import SECRET_KEY, ALGORITHM

def get_current_user(
    request:Request,
    db:Session= Depends(get_db)
):
    
    token = request.cookies.get("access_token")
    
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        user_id :str = payload.get("sub")
        
        if not user_id:
            raise HTTPException(status_code=401)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid Token")
    
    
    user= db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user 

def admin_required(
    current_user = Depends(get_current_user)
):
    if current_user.role.value != "ADMIN":
        raise HTTPException(403, "Admin access required")
    
    return current_user