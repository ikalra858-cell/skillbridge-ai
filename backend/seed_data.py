from app.database import SessionLocal
from app.models import Career, Skill, CareerSkill, UserSkill


CAREER_REQUIREMENTS = {
    "Machine Learning Engineer": {
        "Python Programming": 5,
        "SQL & Database Fundamentals": 3,
        "Data Structures & Algorithms (DSA)": 3,
        "Object-Oriented Programming (OOP)": 3,
        "Git & Version Control": 3,
        "Software Testing & Debugging": 3,
        "Linear Algebra": 4,
        "Calculus & Optimization": 3,
        "Probability & Statistics": 4,
        "Data Analysis & Preprocessing": 5,
        "Classical Machine Learning": 5,
        "Deep Learning & Neural Networks": 4,
        "Natural Language Processing (NLP)": 3,
        "Large Language Models (LLMs)": 3,
        "Model Evaluation & Experimentation": 5,
        "Model Deployment & MLOps Fundamentals": 4,
    },
    "Data Analyst": {
        "Microsoft Excel & Spreadsheets": 5,
        "SQL & Database Querying": 5,
        "Python for Data Analysis": 4,
        "Data Cleaning & Preprocessing": 5,
        "Descriptive & Inferential Statistics": 4,
        "Probability & Statistical Reasoning": 4,
        "Exploratory Data Analysis (EDA)": 5,
        "Data Visualization": 5,
        "Business Intelligence & Dashboarding": 4,
        "Business Problem-Solving": 4,
        "Data Interpretation & Insight Generation": 5,
        "Communication & Data Storytelling": 4,
    },
    "Python Developer": {
        "Core Python Programming": 5,
        "Advanced Python & Standard Library": 4,
        "Object-Oriented Programming (OOP)": 5,
        "Data Structures & Algorithms (DSA)": 4,
        "Exception Handling & Debugging": 4,
        "Automated Testing & Pytest": 4,
        "SQL & Database Fundamentals": 4,
        "Python Web Frameworks (Django/FastAPI/Flask)": 4,
        "REST API Development": 4,
        "Git & Version Control": 4,
        "Packaging, Virtual Environments & Dependency Management": 4,
        "Linux, Command Line & DevOps Fundamentals": 3,
    },
    "Data Scientist": {
        "Python for Data Science": 5,
        "SQL & Data Retrieval": 4,
        "Linear Algebra": 4,
        "Calculus & Optimization": 3,
        "Probability & Statistics": 5,
        "Data Cleaning & Feature Engineering": 5,
        "Exploratory Data Analysis (EDA)": 5,
        "Data Visualization": 4,
        "Classical Machine Learning": 5,
        "Deep Learning Fundamentals": 3,
        "Model Evaluation & Validation": 5,
        "Experiment Design & Hypothesis Testing": 4,
        "Problem-Solving & Analytical Thinking": 5,
        "Data Storytelling & Communication": 4,
    },
    "AI Engineer": {
        "Python Programming": 5,
        "SQL & Data Management": 3,
        "Software Engineering & API Development": 4,
        "Machine Learning Fundamentals": 4,
        "Deep Learning & Transformer Fundamentals": 4,
        "Large Language Models (LLMs)": 5,
        "Prompt Engineering & Structured Outputs": 5,
        "Retrieval-Augmented Generation (RAG)": 4,
        "Vector Databases & Embeddings": 4,
        "AI Agents & Tool Calling": 4,
        "LLM Evaluation & Guardrails": 4,
        "AI Application Deployment": 4,
        "LLMOps, Monitoring & Observability": 3,
        "Git, Testing & Application Security": 4,
    },
    "Backend Developer": {
        "Programming Fundamentals": 4,
        "Object-Oriented Programming (OOP)": 5,
        "Backend Programming & Frameworks": 5,
        "SQL & Relational Databases": 5,
        "Database Design & Management": 5,
        "REST API Design & Development": 5,
        "Authentication & Authorization": 4,
        "Git & Version Control": 4,
        "Software Testing & Debugging": 4,
        "Data Structures & Algorithms (DSA)": 4,
        "Deployment, Containers & DevOps Fundamentals": 3,
        "Security, Performance & Scalability": 4,
    },
    "Web Developer": {
        "HTML & Semantic Markup": 5,
        "CSS & Responsive Design": 5,
        "JavaScript Programming": 5,
        "TypeScript Fundamentals": 3,
        "Frontend Frameworks & Libraries": 4,
        "Backend Frameworks & Server-Side Development": 4,
        "REST APIs & Integration": 4,
        "SQL & Database Fundamentals": 3,
        "Web Accessibility & UI/UX Fundamentals": 4,
        "Git & Version Control": 4,
        "Web Testing & Debugging": 4,
        "Web Performance & Optimization": 3,
        "Deployment & Hosting": 4,
        "Problem-Solving & Application Design": 4,
    },
    "Frontend Developer": {
        "HTML & Semantic Markup": 5,
        "CSS & Responsive Design": 5,
        "JavaScript Programming": 5,
        "TypeScript": 4,
        "React & Component-Based Development": 5,
        "State Management & Data Fetching": 4,
        "CSS Architecture & Preprocessors": 3,
        "Accessibility & UI/UX Principles": 4,
        "Git & Version Control": 4,
        "Frontend Testing & Debugging": 4,
        "Web Performance & Optimization": 4,
        "API Integration": 4,
        "Browser Developer Tools": 4,
        "Problem-Solving & Responsive Interface Design": 5,
    },
    "Cybersecurity Analyst": {
        "Networking Fundamentals": 5,
        "Operating Systems: Windows & Linux": 4,
        "Cybersecurity Fundamentals": 5,
        "Security Protocols & Network Security": 4,
        "Security Information & Event Management (SIEM)": 4,
        "Log Analysis & Threat Detection": 4,
        "Incident Response Fundamentals": 4,
        "Vulnerability Assessment & Risk Management": 4,
        "Identity & Access Management": 4,
        "Python & Bash Scripting": 3,
        "Cloud Security Fundamentals": 3,
        "Security Policies & Compliance": 4,
        "Analytical Thinking & Security Reporting": 4,
    },
    "HR Professional": {
        "Recruitment & Talent Acquisition": 5,
        "Interviewing & Candidate Assessment": 5,
        "Employee Relations & Conflict Resolution": 4,
        "Communication & Active Listening": 5,
        "Emotional Intelligence & Empathy": 5,
        "Talent Management & Performance Management": 4,
        "Learning & Development": 4,
        "HR Policies, Employment Law & Compliance": 4,
        "HR Information Systems (HRIS)": 4,
        "Excel, HR Analytics & Reporting": 4,
        "Problem-Solving & Decision-Making": 4,
        "Coaching, Advising & Confidentiality": 5,
    },
    "Accountant": {
        "Accounting Fundamentals & Double-Entry Bookkeeping": 5,
        "Financial Statements & Reporting": 5,
        "Accounting Standards & Principles": 4,
        "Indian Taxation & Tax Compliance": 4,
        "Budgeting & Financial Planning": 4,
        "Financial Analysis & Forecasting": 4,
        "Microsoft Excel & Spreadsheet Analysis": 5,
        "Accounting Software & ERP Systems": 4,
        "Reconciliation & Internal Controls": 5,
        "Audit Fundamentals & Documentation": 4,
        "Attention to Detail & Critical Thinking": 5,
        "Time Management & Communication": 4,
    },
    "Digital Marketing Specialist": {
        "Digital Marketing Fundamentals": 5,
        "Search Engine Optimization (SEO)": 5,
        "Search Engine Marketing & Paid Advertising": 4,
        "Social Media Marketing": 5,
        "Content Strategy & Marketing": 4,
        "Email Marketing & Campaign Automation": 4,
        "Web & Marketing Analytics": 4,
        "Conversion Rate Optimization": 4,
        "Copywriting & Persuasive Communication": 5,
        "Marketing Tools & Campaign Management": 4,
        "AI Tools & Marketing Automation": 4,
        "Audience Research & Customer Segmentation": 4,
        "Campaign Reporting & Performance Analysis": 5,
    },
    "Content Writer": {
        "Language Proficiency & Grammar": 5,
        "Vocabulary & Writing Clarity": 5,
        "Audience Research & Understanding": 4,
        "Research, Fact-Checking & Source Evaluation": 5,
        "Storytelling & Content Structure": 5,
        "SEO Writing & Search Intent": 4,
        "Content Planning & Editorial Strategy": 4,
        "Adaptability & Tone of Voice": 5,
        "Editing, Proofreading & Quality Assurance": 5,
        "AI-Assisted Writing & Content Verification": 4,
        "Time Management & Deadline Management": 4,
        "Communication & Collaboration": 4,
    },
}


def seed_database():
    db = SessionLocal()

    try:
        # These are disposable test assessments, as confirmed by the user.
        db.query(UserSkill).delete(synchronize_session=False)
        db.flush()

        for title, requirements in CAREER_REQUIREMENTS.items():
            career = (
                db.query(Career)
                .filter(Career.title == title)
                .first()
            )

            if career is None:
                career = Career(title=title)
                db.add(career)
                db.flush()

            desired_skill_ids = set()

            for skill_name, required_level in requirements.items():
                skill = (
                    db.query(Skill)
                    .filter(Skill.name == skill_name)
                    .first()
                )

                if skill is None:
                    skill = Skill(name=skill_name)
                    db.add(skill)
                    db.flush()

                desired_skill_ids.add(skill.id)

                mapping = (
                    db.query(CareerSkill)
                    .filter(
                        CareerSkill.career_id == career.id,
                        CareerSkill.skill_id == skill.id,
                    )
                    .first()
                )

                if mapping is None:
                    db.add(
                        CareerSkill(
                            career_id=career.id,
                            skill_id=skill.id,
                            required_level=required_level,
                        )
                    )
                else:
                    mapping.required_level = required_level

            # Remove outdated mappings for this configured career.
            (
                db.query(CareerSkill)
                .filter(CareerSkill.career_id == career.id)
                .filter(~CareerSkill.skill_id.in_(desired_skill_ids))
                .delete(synchronize_session=False)
            )

        db.commit()

        print("SkillBridge AI seeding completed successfully.")
        print(f"Careers configured: {len(CAREER_REQUIREMENTS)}")

        for title, requirements in CAREER_REQUIREMENTS.items():
            print(f"{title}: {len(requirements)} skills")

        print("Existing test assessments cleared: yes")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()