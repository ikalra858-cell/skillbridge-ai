from sqlalchemy import String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    full_name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(
        String(255), unique=True, index=True
    )
    target_career: Mapped[str] = mapped_column(String(100))


class Career(Base):
    __tablename__ = "careers"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(
        String(100), unique=True, index=True
    )


class Skill(Base):
    __tablename__ = "skills"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(
        String(100), unique=True, index=True
    )


class CareerSkill(Base):
    __tablename__ = "career_skills"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    career_id: Mapped[int] = mapped_column(
        ForeignKey("careers.id"), index=True
    )
    skill_id: Mapped[int] = mapped_column(
        ForeignKey("skills.id"), index=True
    )
    required_level: Mapped[int] = mapped_column()


class UserSkill(Base):
    __tablename__ = "user_skills"

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "career_id",
            "skill_id",
            name="uq_user_skills_user_career_skill",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), index=True
    )
    career_id: Mapped[int] = mapped_column(
        ForeignKey("careers.id"), index=True
    )
    skill_id: Mapped[int] = mapped_column(
        ForeignKey("skills.id"), index=True
    )
    current_level: Mapped[int] = mapped_column()
