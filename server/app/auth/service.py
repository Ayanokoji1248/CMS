from sqlalchemy.orm import Session
from app.models.user import User
from app.auth.schemas import LoginRequest

from app.core.security import verify_password, hash_password
from app.core.jwt import create_access_token

def authenticate_user(
    db:Session,
    email:str,
    password:str
):
    user = db.query(User).filter(
        User.email == email
    ).first()
    
    if not user:
        return None
    
    if not verify_password(password, user.password):
        return None
    
    token = create_access_token(
        data={
            "sub":str(user.id),
            "role":user.role.value
        }
    )
    
    return token