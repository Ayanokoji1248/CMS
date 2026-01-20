from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    DB_HOST:str = Field(...)
    DB_PORT:str = Field(...)
    DB_NAME:str = Field(...)
    DB_USER:str = Field(...)
    DB_PASSWORD:str = Field(...)
    
    @property
    def DATABASE_URL(self)->str:
        return(
            f"postgresql://{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )
    
    class Config:
        env_file=".env"
        extra="ignore"

settings = Settings()