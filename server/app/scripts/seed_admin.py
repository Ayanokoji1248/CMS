from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models.user import User


def seed_admin():
    db:Session = SessionLocal()
    
    try:
        existing_user = db.query(User).filter(
            User.email=="admin@university.com"
        ).first()
        
        if existing_user:
            print("Admin user already exists")
            return

        admin_user = User(
            email="admin@university.com",
            password =hash_password("admin12"),
            role="ADMIN",
            is_active=True
        )
        
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        print("Admin user created")
    
    finally: 
        db.close()

if __name__ =="__main__":
    seed_admin()