from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class DepartmentRes(BaseModel):
    name:str

class CreateSubject(BaseModel):
    name:str
    code:str
    credits:int
    department_id:UUID
    

class ResponseSubject(BaseModel):
    id:UUID
    name:str
    code:str
    credits:int
    created_at:datetime
    department:DepartmentRes