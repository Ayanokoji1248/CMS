from pydantic import BaseModel
from uuid import UUID

class CreateStudent(BaseModel):
    full_name:str
    email:str
    enrollment_no:int
    department_id:UUID
    semester:int
    