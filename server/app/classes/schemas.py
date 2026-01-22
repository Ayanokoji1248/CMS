from pydantic import BaseModel
from uuid import UUID

class CreateClass(BaseModel):
    subject_id:UUID
    faculty_id:UUID
    semester:int
    capacity:int
    academic_year:str
    