from pydantic import BaseModel

class CreateDepartment(BaseModel):
    name:str
    code:str
    