# SkillBridge AI

**A career-focused skill assessment and personalized learning roadmap platform.**

SkillBridge AI helps users understand the skills required for their target career, assess their current proficiency, identify skill gaps, and follow a structured roadmap toward their professional goals.

## Overview

Choosing a career path is only the first step. Knowing which skills to develop, what to learn next, and how to track your progress is equally important.

SkillBridge AI brings these steps together through career-specific skill requirements, skill assessments, skill-gap analysis, personalized learning roadmaps, and project recommendations.

## Key Features

- **Career Profiles:** Create and manage user profiles with a selected career goal.
- **Career-Specific Skill Requirements:** Explore the skills associated with different career paths and their target proficiency levels.
- **Skill Assessments:** Assess your current proficiency in relevant skills.
- **Skill-Gap Analysis:** Compare current skill levels against the requirements of a chosen career.
- **Personalized Learning Roadmaps:** Identify learning priorities and skills that need further development.
- **Project Recommendations:** Discover project ideas relevant to your career direction and skill-development needs.
- **Persistent Data:** Store profiles, career information, skills, and assessment-related data in PostgreSQL.

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| ORM | SQLAlchemy 2 |
| Database Driver | Psycopg 3 |
| Routing | React Router |
| Frontend Tooling | npm, Vite |

## Supported Career Paths

SkillBridge AI includes career-specific skill requirements for the following 13 career paths:

1. Machine Learning Engineer
2. Data Analyst
3. Python Developer
4. Data Scientist
5. AI Engineer
6. Backend Developer
7. Web Developer
8. Frontend Developer
9. Cybersecurity Analyst
10. HR Professional
11. Accountant
12. Digital Marketing Specialist
13. Content Writer

Career-specific skills and proficiency requirements help guide the assessment and roadmap experience.

## Project Structure

```text
skillbridge-ai/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── migrations/
│   ├── requirements.txt
│   ├── seed_data.py
│   └── test_db.py
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.10 or a compatible Python version
- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/ikalra858-cell/skillbridge-ai.git
cd skillbridge-ai
```

### 2. Configure the Backend

Create and activate a Python virtual environment, then install the dependencies.

**Windows PowerShell**

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create a `backend/.env` file and configure your PostgreSQL connection:

```env
DATABASE_URL=postgresql+psycopg://USERNAME:PASSWORD@HOST:5432/DATABASE_NAME
```

Replace the placeholders with your actual database credentials and connection details. Keep your `.env` file private and never commit database credentials to GitHub.

#### Database Initialization

Before starting the application, configure a PostgreSQL database and create the tables defined in `backend/app/models.py`. The API does not automatically create database tables or populate career data on startup.

The repository includes `backend/seed_data.py` to initialize or update career-specific skills and proficiency requirements.

**Important:** Review the seed script before running it. It deletes existing `UserSkill` records, so only execute it against a database where those records can safely be removed.

### 3. Start the Backend

From the `backend` directory, run:

```powershell
uvicorn app.main:app --reload
```

The API should be available at:

- API: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- Interactive API documentation: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### 4. Configure and Start the Frontend

Open a separate terminal in the project root and run:

```powershell
cd frontend
npm install
```

To configure the API URL explicitly, create a `frontend/.env` file containing:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Start the frontend development server:

```powershell
npm run dev
```

Open the local URL displayed by Vite in your browser.

**Note:** The backend must be running, and its CORS configuration must allow the frontend's origin for API requests to work correctly.

## How It Works

1. Choose a target career.
2. Review the skills and proficiency levels required for that career.
3. Assess your current skills.
4. Identify gaps between your current proficiency and target levels.
5. Use the roadmap to prioritize skill development.
6. Explore relevant projects to practise and demonstrate your skills.

## Current Status

SkillBridge AI includes a React frontend, FastAPI backend, and PostgreSQL data layer. The frontend production build has been verified locally.

**Deployment Status:** Public hosting is not yet configured. The project is currently available as a source-code repository.

## Future Improvements

- Deploy the frontend and backend for public access.
- Add automated tests for critical user flows and API endpoints.
- Improve progress tracking and roadmap customization.
- Expand project recommendations and learning resources.
- Add deployment and usage documentation.

## Contributing

Suggestions, bug reports, and improvements are welcome. Please open an issue to discuss substantial changes before submitting a pull request.

## Author

**Isha Kalra**

BCA Student | Machine Learning and AI

[GitHub Profile](https://github.com/ikalra858-cell)
