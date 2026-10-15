from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    target_career: str


class UserSkillCreate(BaseModel):
    skill_id: int
    career_id: int
    current_level: int = Field(ge=1, le=5)
