from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Career, Skill, CareerSkill, UserSkill, User
from app.schemas import UserCreate, UserSkillCreate


app = FastAPI(
    title="SkillBridge AI API",
    description="Personalized career skill-gap analysis and learning roadmaps.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to SkillBridge AI API!",
        "status": "running",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


# --------------------------------------------------
# USER PROFILE ENDPOINTS
# --------------------------------------------------

@app.post("/users")
def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = (
        db.query(User)
        .filter(User.email == str(user_data.email))
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="A user with this email already exists.",
        )

    new_user = User(
        full_name=user_data.full_name,
        email=str(user_data.email),
        target_career=user_data.target_career,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully!",
        "user": {
            "id": new_user.id,
            "full_name": new_user.full_name,
            "email": new_user.email,
            "target_career": new_user.target_career,
        },
    }


@app.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found.")

    return {
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "target_career": user.target_career,
    }


@app.put("/users/{user_id}")
def update_user(
    user_id: int,
    user_data: UserCreate,
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found.")

    existing_email = (
        db.query(User)
        .filter(User.email == str(user_data.email), User.id != user_id)
        .first()
    )

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="This email is already used by another user.",
        )

    user.full_name = user_data.full_name
    user.email = str(user_data.email)
    user.target_career = user_data.target_career

    db.commit()
    db.refresh(user)

    return {
        "message": "User updated successfully!",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "target_career": user.target_career,
        },
    }


@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found.")

    db.delete(user)
    db.commit()

    return {
        "message": "User deleted successfully!",
        "user_id": user_id,
    }


@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.id).all()

    return [
        {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "target_career": user.target_career,
        }
        for user in users
    ]


# --------------------------------------------------
# CAREER ENDPOINTS
# --------------------------------------------------

@app.get("/careers")
def get_careers(db: Session = Depends(get_db)):
    careers = db.query(Career).order_by(Career.id).all()

    return [
        {"id": career.id, "title": career.title}
        for career in careers
    ]


@app.get("/careers/{career_id}/skills")
def get_career_skills(
    career_id: int,
    db: Session = Depends(get_db),
):
    career = db.query(Career).filter(Career.id == career_id).first()

    if career is None:
        raise HTTPException(status_code=404, detail="Career not found.")

    requirements = (
        db.query(CareerSkill, Skill)
        .join(Skill, CareerSkill.skill_id == Skill.id)
        .filter(CareerSkill.career_id == career_id)
        .order_by(Skill.name)
        .all()
    )

    return {
        "career_id": career.id,
        "career_title": career.title,
        "required_skills": [
            {
                "skill_id": skill.id,
                "skill_name": skill.name,
                "required_level": career_skill.required_level,
            }
            for career_skill, skill in requirements
        ],
    }


# --------------------------------------------------
# CAREER-SPECIFIC ASSESSMENT ENDPOINTS
# --------------------------------------------------

@app.post("/users/{user_id}/skills")
def add_user_skill(
    user_id: int,
    skill_data: UserSkillCreate,
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found.")

    career = (
        db.query(Career)
        .filter(Career.id == skill_data.career_id)
        .first()
    )

    if career is None:
        raise HTTPException(status_code=404, detail="Career not found.")

    skill = db.query(Skill).filter(Skill.id == skill_data.skill_id).first()

    if skill is None:
        raise HTTPException(status_code=404, detail="Skill not found.")

    career_skill = (
        db.query(CareerSkill)
        .filter(
            CareerSkill.career_id == skill_data.career_id,
            CareerSkill.skill_id == skill_data.skill_id,
        )
        .first()
    )

    if career_skill is None:
        raise HTTPException(
            status_code=400,
            detail="This skill is not part of the selected career.",
        )

    user_skill = (
        db.query(UserSkill)
        .filter(
            UserSkill.user_id == user_id,
            UserSkill.career_id == skill_data.career_id,
            UserSkill.skill_id == skill_data.skill_id,
        )
        .first()
    )

    if user_skill:
        user_skill.current_level = skill_data.current_level
    else:
        user_skill = UserSkill(
            user_id=user_id,
            career_id=skill_data.career_id,
            skill_id=skill_data.skill_id,
            current_level=skill_data.current_level,
        )
        db.add(user_skill)

    db.commit()
    db.refresh(user_skill)

    return {
        "message": "User skill saved successfully!",
        "user_id": user_id,
        "career_id": career.id,
        "career_title": career.title,
        "skill_id": user_skill.skill_id,
        "current_level": user_skill.current_level,
    }


@app.get("/users/{user_id}/skills")
def get_user_skills(
    user_id: int,
    career_id: int,
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found.")

    career = db.query(Career).filter(Career.id == career_id).first()

    if career is None:
        raise HTTPException(status_code=404, detail="Career not found.")

    results = (
        db.query(UserSkill, Skill)
        .join(Skill, UserSkill.skill_id == Skill.id)
        .filter(
            UserSkill.user_id == user_id,
            UserSkill.career_id == career_id,
        )
        .order_by(Skill.name)
        .all()
    )

    return [
        {
            "skill_id": skill.id,
            "skill_name": skill.name,
            "current_level": user_skill.current_level,
        }
        for user_skill, skill in results
    ]


# --------------------------------------------------
# SKILL-GAP ANALYSIS
# --------------------------------------------------

@app.get("/users/{user_id}/skill-gap")
def get_skill_gap(
    user_id: int,
    career_id: int,
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found.")

    career = db.query(Career).filter(Career.id == career_id).first()

    if career is None:
        raise HTTPException(status_code=404, detail="Career not found.")

    results = (
        db.query(CareerSkill, Skill, UserSkill)
        .join(Skill, CareerSkill.skill_id == Skill.id)
        .outerjoin(
            UserSkill,
            (UserSkill.skill_id == Skill.id)
            & (UserSkill.user_id == user_id)
            & (UserSkill.career_id == career_id),
        )
        .filter(CareerSkill.career_id == career_id)
        .order_by(Skill.name)
        .all()
    )

    skills = []

    for career_skill, skill, user_skill in results:
        current_level = user_skill.current_level if user_skill else 0
        required_level = career_skill.required_level
        gap = max(required_level - current_level, 0)

        if current_level == 0:
            status = "Not assessed"
        elif gap == 0:
            status = "Requirement met"
        else:
            status = "Needs improvement"

        skills.append({
            "skill_id": skill.id,
            "skill_name": skill.name,
            "current_level": current_level,
            "required_level": required_level,
            "gap": gap,
            "status": status,
        })

    return {
        "user_id": user_id,
        "career_id": career.id,
        "career_title": career.title,
        "skills": skills,
    }


# --------------------------------------------------
# CAREER-SPECIFIC LEARNING ROADMAP
# --------------------------------------------------

@app.get("/users/{user_id}/roadmap")
def get_learning_roadmap(
    user_id: int,
    career_id: int,
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found.")

    career = db.query(Career).filter(Career.id == career_id).first()

    if career is None:
        raise HTTPException(status_code=404, detail="Career not found.")

    results = (
        db.query(CareerSkill, Skill, UserSkill)
        .join(Skill, CareerSkill.skill_id == Skill.id)
        .outerjoin(
            UserSkill,
            (UserSkill.skill_id == Skill.id)
            & (UserSkill.user_id == user_id)
            & (UserSkill.career_id == career_id),
        )
        .filter(CareerSkill.career_id == career_id)
        .all()
    )

    roadmap = []

    for career_skill, skill, user_skill in results:
        current_level = user_skill.current_level if user_skill else None
        required_level = career_skill.required_level

        if current_level is None:
            priority = "Assess first"
            action = f"Complete a self-assessment of your {skill.name} skills."
        elif current_level < required_level:
            gap = required_level - current_level

            if gap >= 3:
                priority = "High"
            elif gap == 2:
                priority = "Medium"
            else:
                priority = "Low"

            action = (
                f"Learn and practise {skill.name} to progress "
                f"toward level {required_level}/5."
            )
        else:
            priority = "Maintenance"
            action = (
                f"Maintain your {skill.name} skills through practical projects."
            )

        roadmap.append({
            "skill_id": skill.id,
            "skill_name": skill.name,
            "current_level": current_level,
            "required_level": required_level,
            "priority": priority,
            "recommended_action": action,
        })

    priority_order = {
        "Assess first": 0,
        "High": 1,
        "Medium": 2,
        "Low": 3,
        "Maintenance": 4,
    }

    roadmap.sort(
        key=lambda item: (
            priority_order[item["priority"]],
            -(item["required_level"] - (item["current_level"] or 0)),
            item["skill_name"].lower(),
        )
    )

    return {
        "user_id": user_id,
        "career_id": career.id,
        "career_title": career.title,
        "roadmap": roadmap,
    }