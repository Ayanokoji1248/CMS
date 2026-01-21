from pydantic import BaseModel
from uuid import UUID

class CreateFaculty(BaseModel):
    full_name:str
    email:str
    department_id:UUID
    designation:str
    