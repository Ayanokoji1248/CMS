from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# from app.models import()

from app.auth.router import auth_router
from app.department.router import department_router
from app.subject.router import subject_router
from app.faculty.router import faculty_router
from app.student.router import student_router
from app.classes.router import class_router

from app.core.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(department_router)
app.include_router(subject_router)
app.include_router(faculty_router)
app.include_router(student_router)
app.include_router(class_router)

@app.get("/")
def default():
    return {
        "message":"Working"
    }