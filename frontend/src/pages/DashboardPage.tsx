import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import {
  createUser,
  fetchUsers,
  fetchCareers,
  fetchCareerSkills,
  fetchSkillGap,
  fetchRoadmap,
  saveUserSkill,
  saveUserCareer,
} from "../services/api";

type ProjectRecommendation = {
  id: string;
  skillName: string;
  title: string;
  description: string;
  difficulty: string;
  careers: string[];
  skills: string[];
};

const projectRecommendations: ProjectRecommendation[] = [
  // Python and software development
  {
    id: "python-data-cleaning",
    skillName: "Python Programming",
    title: "CSV Data Cleaning Tool",
    description:
      "Build a reusable tool that handles missing values, duplicate records, inconsistent formats, and data-quality reports.",
    difficulty: "Beginner",
    careers: [
      "Python Developer",
      "Data Analyst",
      "Data Scientist",
      "Machine Learning Engineer",
    ],
    skills: [
      "Core Python Programming",
      "Python Programming",
      "Python for Data Analysis",
      "Python for Data Science",
      "Data Cleaning & Preprocessing",
      "Data Analysis & Preprocessing",
    ],
  },
  {
    id: "python-modular-app",
    skillName: "Object-Oriented Programming",
    title: "Modular Python Application",
    description:
      "Build a maintainable application using classes, modules, exception handling, and automated tests.",
    difficulty: "Beginner–Intermediate",
    careers: [
      "Python Developer",
      "Backend Developer",
    ],
    skills: [
      "Object-Oriented Programming (OOP)",
      "Advanced Python & Standard Library",
      "Exception Handling & Debugging",
      "Automated Testing & Pytest",
      "Programming Fundamentals",
    ],
  },
  {
    id: "sql-sales-analysis",
    skillName: "SQL & Databases",
    title: "Sales Database Analysis",
    description:
      "Design queries using joins, aggregations, subqueries, and filtering to uncover sales trends.",
    difficulty: "Beginner–Intermediate",
    careers: [
      "Data Analyst",
      "Data Scientist",
      "Python Developer",
      "Backend Developer",
      "Machine Learning Engineer",
      "AI Engineer",
    ],
    skills: [
      "SQL & Database Querying",
      "SQL & Data Retrieval",
      "SQL & Relational Databases",
      "SQL & Database Fundamentals",
      "SQL & Data Management",
      "Database Design & Management",
    ],
  },
  {
    id: "database-task-manager",
    skillName: "Database Management",
    title: "Database-Backed Task Manager",
    description:
      "Build an application that creates, retrieves, updates, and deletes records using a relational database.",
    difficulty: "Intermediate",
    careers: [
      "Python Developer",
      "Backend Developer",
      "Web Developer",
    ],
    skills: [
      "Database Design & Management",
      "SQL & Relational Databases",
      "SQL & Database Fundamentals",
      "SQL & Database Querying",
      "Backend Programming & Frameworks",
    ],
  },

  // Data analysis and statistics
  {
    id: "exploratory-data-analysis",
    skillName: "Data Analysis",
    title: "Exploratory Data Analysis",
    description:
      "Investigate a real-world dataset, examine distributions and relationships, detect anomalies, and communicate meaningful findings.",
    difficulty: "Beginner–Intermediate",
    careers: [
      "Data Analyst",
      "Data Scientist",
      "Machine Learning Engineer",
    ],
    skills: [
      "Exploratory Data Analysis (EDA)",
      "EDA",
      "Python for Data Analysis",
      "Python for Data Science",
      "Data Analysis & Preprocessing",
      "Data Cleaning & Feature Engineering",
    ],
  },
  {
    id: "business-dashboard",
    skillName: "Data Visualization",
    title: "Business Insights Dashboard",
    description:
      "Transform a dataset into charts and a dashboard that helps users explore business performance and trends.",
    difficulty: "Intermediate",
    careers: [
      "Data Analyst",
      "Data Scientist",
      "Digital Marketing Specialist",
    ],
    skills: [
      "Data Visualization",
      "Business Intelligence & Dashboarding",
      "Data Interpretation & Insight Generation",
      "Web & Marketing Analytics",
      "Campaign Reporting & Performance Analysis",
    ],
  },
  {
    id: "hypothesis-testing",
    skillName: "Statistics",
    title: "Statistical Hypothesis Testing",
    description:
      "Investigate a business question using descriptive statistics, confidence intervals, and suitable hypothesis tests.",
    difficulty: "Intermediate",
    careers: [
      "Data Analyst",
      "Data Scientist",
      "Machine Learning Engineer",
    ],
    skills: [
      "Descriptive & Inferential Statistics",
      "Probability & Statistical Reasoning",
      "Probability & Statistics",
      "Experiment Design & Hypothesis Testing",
      "Statistical Reasoning",
    ],
  },
  {
    id: "marketing-campaign-analysis",
    skillName: "Marketing Analytics",
    title: "Marketing Campaign Performance Analysis",
    description:
      "Analyze campaign data to compare channels, measure conversion rates, and identify opportunities to improve results.",
    difficulty: "Beginner–Intermediate",
    careers: ["Digital Marketing Specialist"],
    skills: [
      "Digital Marketing Fundamentals",
      "Web & Marketing Analytics",
      "Campaign Reporting & Performance Analysis",
      "Audience Research & Customer Segmentation",
      "Conversion Rate Optimization",
      "Search Engine Marketing & Paid Advertising",
    ],
  },

  // Machine learning and AI
  {
    id: "customer-churn",
    skillName: "Machine Learning",
    title: "Customer Churn Prediction",
    description:
      "Train and evaluate classification models to identify customers who may leave a service. Compare models and explain the results.",
    difficulty: "Intermediate",
    careers: [
      "Machine Learning Engineer",
      "Data Scientist",
      "AI Engineer",
    ],
    skills: [
    "Classical Machine Learning",
    "Machine Learning Fundamentals",
    "Model Evaluation & Experimentation",
    "Model Evaluation & Validation",
    "Data Cleaning & Feature Engineering",
    ],
  },
  {
    id: "ml-data-pipeline",
    skillName: "Data Preprocessing",
    title: "End-to-End ML Data Pipeline",
    description:
      "Create a reproducible preprocessing pipeline for missing values, categorical encoding, scaling, and feature preparation.",
    difficulty: "Intermediate",
    careers: [
      "Machine Learning Engineer",
      "Data Scientist",
      "AI Engineer",
    ],
    skills: [
      "Data Analysis & Preprocessing",
      "Data Cleaning & Feature Engineering",
      "Classical Machine Learning",
      "Model Evaluation & Experimentation",
      "Model Evaluation & Validation",
    ],
  },
  {
    id: "image-classification",
    skillName: "Deep Learning",
    title: "Image Classification System",
    description:
      "Train and evaluate a neural network that classifies images into meaningful categories, then examine its errors.",
    difficulty: "Intermediate–Advanced",
    careers: [
      "AI Engineer",
      "Machine Learning Engineer",
      "Data Scientist",
    ],
    skills: [
      "Deep Learning & Neural Networks",
      "Deep Learning Fundamentals",
      "Deep Learning & Transformer Fundamentals",
      "Model Evaluation & Experimentation",
      "Model Evaluation & Validation",
    ],
  },
  {
    id: "ml-api-deployment",
    skillName: "Model Deployment",
    title: "Deploy a Machine Learning Model",
    description:
      "Serve a trained model through a REST API, validate incoming data, and return structured predictions.",
    difficulty: "Intermediate–Advanced",
    careers: [
      "Machine Learning Engineer",
      "AI Engineer",
      "Data Scientist",
      "Python Developer",
      "Backend Developer",
    ],
    skills: [
      "Model Deployment & MLOps Fundamentals",
      "AI Application Deployment",
      "REST API Development",
      "REST API Design & Development",
      "Python Web Frameworks (Django/FastAPI/Flask)",
      "Software Engineering & API Development",
    ],
  },
  {
    id: "rag-knowledge-assistant",
    skillName: "Generative AI",
    title: "Document Question-Answering Assistant",
    description:
      "Build a prototype that retrieves relevant passages from a document collection and generates answers grounded in those passages.",
    difficulty: "Intermediate–Advanced",
    careers: ["AI Engineer"],
    skills: [
      "RAG",
      "Vector Databases & Embeddings",
      "Large Language Models (LLMs)",
      "LLMs",
      "Prompt Engineering & Structured Outputs",
      "LLM Evaluation & Guardrails",
    ],
  },
  {
    id: "ai-agent",
    skillName: "AI Agents",
    title: "Task-Oriented AI Agent",
    description:
      "Create a controlled agent that chooses from a small set of tools, executes approved actions, and reports its results.",
    difficulty: "Advanced",
    careers: ["AI Engineer"],
    skills: [
      "AI Agents & Tool Calling",
      "LLMs",
      "Prompt Engineering & Structured Outputs",
      "LLM Evaluation & Guardrails",
      "AI Application Deployment",
    ],
  },

  // Web and application development
  {
    id: "rest-api",
    skillName: "API Development",
    title: "REST API for a Python Application",
    description:
      "Create API endpoints that validate requests, handle errors, and return structured responses.",
    difficulty: "Beginner–Intermediate",
    careers: [
      "Python Developer",
      "Backend Developer",
      "AI Engineer",
      "Web Developer",
    ],
    skills: [
      "REST API Development",
      "REST API Design & Development",
      "Software Engineering & API Development",
      "Backend Programming & Frameworks",
      "Python Web Frameworks (Django/FastAPI/Flask)",
      "Backend Frameworks & Server-Side Development",
    ],
  },
  {
    id: "responsive-portfolio",
    skillName: "Frontend Development",
    title: "Responsive Portfolio Website",
    description:
      "Create an accessible, mobile-friendly portfolio with reusable components, responsive layouts, and working navigation.",
    difficulty: "Beginner–Intermediate",
    careers: [
      "Frontend Developer",
      "Web Developer",
    ],
    skills: [
      "HTML & Semantic Markup",
      "CSS & Responsive Design",
      "JavaScript Programming",
      "JavaScript",
      "TypeScript Fundamentals",
      "TypeScript",
      "React & Component-Based Development",
      "Frontend Frameworks & Libraries",
      "Accessibility & UI/UX Principles",
      "Web Accessibility & UI/UX Fundamentals",
    ],
  },

  // Cybersecurity
  {
    id: "security-log-analysis",
    skillName: "Cybersecurity",
    title: "Security Log Analysis Lab",
    description:
      "Use sample security logs to identify suspicious login patterns, repeated failures, and potential indicators of compromise.",
    difficulty: "Beginner–Intermediate",
    careers: ["Cybersecurity Analyst"],
    skills: [
      "SIEM",
      "Log Analysis & Threat Detection",
      "Cybersecurity Fundamentals",
      "Networking Fundamentals",
      "Python & Bash Scripting",
      "Incident Response Fundamentals",
      "Analytical Thinking & Security Reporting",
    ],
  },
  {
    id: "vulnerability-risk-register",
    skillName: "Security Risk Assessment",
    title: "Vulnerability Assessment & Risk Register",
    description:
      "Review a deliberately vulnerable lab environment, document findings, prioritize risks, and recommend defensive mitigations.",
    difficulty: "Intermediate",
    careers: ["Cybersecurity Analyst"],
    skills: [
      "Vulnerability Assessment & Risk Management",
      "Security Protocols & Network Security",
      "Cloud Security Fundamentals",
      "IAM",
      "Security Policies & Compliance",
      "Incident Response Fundamentals",
    ],
  },

  // Human resources
  {
    id: "recruitment-tracker",
    skillName: "HR Analytics",
    title: "Recruitment Pipeline Tracker",
    description:
      "Build a spreadsheet-based tracker for applications, interview stages, time-to-hire, and recruitment outcomes using fictional candidate data.",
    difficulty: "Beginner",
    careers: ["HR Professional"],
    skills: [
      "Recruitment & Talent Acquisition",
      "HRIS",
      "Excel",
      "HR Analytics & Reporting",
      "Interviewing & Candidate Assessment",
      "Talent Management & Performance Management",
    ],
  },
  {
    id: "employee-survey",
    skillName: "Employee Analytics",
    title: "Employee Engagement Survey Analysis",
    description:
      "Analyze anonymized or fictional survey responses, summarize themes, and prepare evidence-based recommendations while protecting confidentiality.",
    difficulty: "Beginner–Intermediate",
    careers: ["HR Professional"],
    skills: [
      "HR Analytics & Reporting",
      "Excel",
      "Employee Relations & Conflict Resolution",
      "Learning & Development",
      "Problem-Solving & Decision-Making",
      "Communication & Active Listening",
    ],
  },

  // Accounting and finance
  {
    id: "expense-reconciliation",
    skillName: "Accounting",
    title: "Expense Reconciliation Tool",
    description:
      "Compare fictional transaction records, flag mismatches, and produce an exception report for review.",
    difficulty: "Beginner–Intermediate",
    careers: ["Accountant"],
    skills: [
      "Accounting Fundamentals & Double-Entry Bookkeeping",
      "Financial Statements & Reporting",
      "Excel & Spreadsheet Analysis",
      "Reconciliation & Internal Controls",
      "Attention to Detail & Critical Thinking",
      "Audit Fundamentals & Documentation",
    ],
  },
  {
    id: "budget-forecast",
    skillName: "Financial Analysis",
    title: "Budget and Variance Analysis",
    description:
      "Compare planned and actual expenses, calculate variances, and build a clear monthly budget report.",
    difficulty: "Beginner–Intermediate",
    careers: ["Accountant"],
    skills: [
      "Budgeting & Financial Planning",
      "Financial Analysis & Forecasting",
      "Excel & Spreadsheet Analysis",
      "Financial Statements & Reporting",
      "Time Management & Communication",
    ],
  },

  // Content writing
  {
    id: "content-editorial-plan",
    skillName: "Content Strategy",
    title: "SEO Content Calendar and Editorial Plan",
    description:
      "Research an audience, organize topics by search intent, and develop a realistic editorial calendar with measurable goals.",
    difficulty: "Beginner",
    careers: ["Content Writer"],
    skills: [
      "SEO Writing & Search Intent",
      "Content Planning & Editorial Strategy",
      "Audience Research & Understanding",
      "Content Strategy & Marketing",
      "Storytelling & Content Structure",
      "Research, Fact-Checking & Source Evaluation",
    ],
  },
  {
    id: "fact-checking-portfolio",
    skillName: "Writing & Research",
    title: "Fact-Checked Article Portfolio",
    description:
      "Write and edit a small set of articles, document credible sources, verify claims, and adapt tone for different audiences.",
    difficulty: "Beginner–Intermediate",
    careers: ["Content Writer"],
    skills: [
      "Language Proficiency & Grammar",
      "Vocabulary & Writing Clarity",
      "Research, Fact-Checking & Source Evaluation",
      "Editing, Proofreading & Quality Assurance",
      "Adaptability & Tone of Voice",
      "AI-Assisted Writing & Content Verification",
    ],
  },
];

type SkillGap = {
  skill_id: number;
  skill_name: string;
  current_level: number;
  required_level: number;
  gap: number;
  status: string;
};

type RoadmapTask = {
  skill_id: number;
  skill_name: string;
  current_level: number | null;
  required_level: number;
  priority: string;
  recommended_action: string;
};

type Career = {
  id: number;
  title: string;
};

type CareerSkill = {
  skill_id: number;
  skill_name: string;
  required_level: number;
};

type DashboardUser = {
  id: number;
  full_name: string;
  email: string;
  target_career: string;
};

const SAVED_USER_KEY = "skillbridge_user";
const SAVED_CAREER_KEY = "skillbridge_selected_career";

export default function DashboardPage() {
  const [user, setUser] = useState<DashboardUser | null>(() => {
    try {
      const savedUser = localStorage.getItem(SAVED_USER_KEY);
      return savedUser ? JSON.parse(savedUser) as DashboardUser : null;
    } catch {
      return null;
    }
  });

  const [savedProfiles, setSavedProfiles] = useState<DashboardUser[]>([]);

  const userId = user?.id ?? null;

  const [careers, setCareers] = useState<Career[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [registering, setRegistering] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState("");

  const [careerId, setCareerId] = useState<number>(() => {
  const savedCareer = localStorage.getItem(SAVED_CAREER_KEY);
  return savedCareer ? Number(savedCareer) : 0;
});


    // const [profileCareerTitle, setProfileCareerTitle] = useState("");

    const [careerTitle, setCareerTitle] = useState(() => {
    const savedCareer = localStorage.getItem(SAVED_CAREER_KEY);
    const savedTitle = localStorage.getItem(`${SAVED_CAREER_KEY}_title`);

    return savedCareer && savedTitle ? savedTitle : "";
  });

  const [skills, setSkills] = useState<SkillGap[]>([]);
  const [roadmap, setRoadmap] = useState<RoadmapTask[]>([]);
  const [careerSkills, setCareerSkills] = useState<CareerSkill[]>([]);
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [savingSkills, setSavingSkills] = useState(false);
  const [assessmentMessage, setAssessmentMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCareers() {
      try {
        const careersData: Career[] = await fetchCareers();

        if (cancelled) return;

        setCareers(careersData);

        if (careersData.length === 0) {
          setError(
            "No career paths are configured yet. Please add the career data."
          );
          return;
        }

const storedUser = localStorage.getItem(SAVED_USER_KEY);

const currentUser: DashboardUser | null = storedUser
  ? JSON.parse(storedUser)
  : null;

const profileCareer = careersData.find(
  (career) => career.title === currentUser?.target_career
);

if (profileCareer) {
  setCareerId(profileCareer.id);
  setCareerTitle(profileCareer.title);

  localStorage.setItem(
    SAVED_CAREER_KEY,
    String(profileCareer.id)
  );

  localStorage.setItem(
    `${SAVED_CAREER_KEY}_title`,
    profileCareer.title
  );
} else {
  setCareerId(0);
  setCareerTitle("");

  localStorage.removeItem(SAVED_CAREER_KEY);
  localStorage.removeItem(`${SAVED_CAREER_KEY}_title`);
}


      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load available careers."
          );
        }
      }
    }

    loadCareers();

    return () => {
      cancelled = true;
    };
  }, []);

  
useEffect(() => {
  fetchUsers()
    .then((profiles) => {
      setSavedProfiles(profiles);

      if (profiles.length === 0) {
        setUser(null);

        localStorage.removeItem(SAVED_USER_KEY);
        localStorage.removeItem(SAVED_CAREER_KEY);
        localStorage.removeItem(`${SAVED_CAREER_KEY}_title`);

        setCareerId(0);
        setCareerTitle("");
        setFullName("");
        setEmail("");
      }
    })
    .catch((error) =>
      console.error("Failed to load profiles:", error)
    );
}, []);


  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      setLoading(true);
      setError("");
      setAssessmentMessage("");

      if (userId === null || careerId === 0) {
        setCareerSkills([]);
        setSkills([]);
        setRoadmap([]);
        setRatings({});
        setLoading(false);
        return;
      }

      try {
        const [careerSkillsData, gapData, roadmapData] =
          await Promise.all([
            fetchCareerSkills(careerId),
            fetchSkillGap(userId, careerId),
            fetchRoadmap(userId, careerId),
          ]);

        if (cancelled) return;

        const requiredSkills: CareerSkill[] =
          careerSkillsData.required_skills ?? [];

        const gapSkills: SkillGap[] = gapData.skills ?? [];
        const roadmapTasks: RoadmapTask[] = roadmapData.roadmap ?? [];

        setCareerSkills(requiredSkills);
        setSkills(gapSkills);
        setRoadmap(roadmapTasks);
        setCareerTitle(gapData.career_title);

        setRatings(
          Object.fromEntries(
            gapSkills
              .filter((skill) => skill.current_level > 0)
              .map((skill) => [skill.skill_id, skill.current_level])
          )
        );
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load your dashboard."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, [userId, careerId]);

  const assessedSkills = skills.filter(
  (skill) => skill.status !== "Not assessed"
);

const skillsToImprove = assessedSkills.filter(
  (skill) => skill.gap > 0
).length;

const skillsAwaitingAssessment = skills.filter(
  (skill) => skill.status === "Not assessed"
).length;

  const recommendedProjects = useMemo(() => {
  const careerProjects = projectRecommendations.filter((project) =>
    project.careers.includes(careerTitle)
  );

  const assessedSkillGaps = skills.filter(
    (skill) => skill.status !== "Not assessed" && skill.gap > 0
  );

  const unassessedSkills = skills.filter(
    (skill) => skill.status === "Not assessed"
  );

  const normalize = (value: string) =>
    value.trim().toLowerCase();

  const matchesSkill = (
    project: ProjectRecommendation,
    skillName: string
  ) => {
    const normalizedSkill = normalize(skillName);

    return project.skills.some(
      (projectSkill) => normalize(projectSkill) === normalizedSkill
    );
  };

  return careerProjects
    .map((project) => {
      const gapMatches = assessedSkillGaps.filter((skill) =>
        matchesSkill(project, skill.skill_name)
      );

      const unassessedMatches = unassessedSkills.filter((skill) =>
        matchesSkill(project, skill.skill_name)
      );

      return {
        ...project,
        gapMatches: gapMatches.length,
        unassessedMatches: unassessedMatches.length,
      };
    })
    .filter(
      (project) =>
        project.gapMatches > 0 || project.unassessedMatches > 0
    )
    .sort((a, b) => {
      if (b.gapMatches !== a.gapMatches) {
        return b.gapMatches - a.gapMatches;
      }

      return b.unassessedMatches - a.unassessedMatches;
    });
}, [skills, careerTitle]);

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <Link to="/" className="brand">
          <span className="brand-mark">S</span>
          <span>
            SkillBridge<span className="brand-ai"> AI</span>
          </span>
        </Link>

        <nav className="dashboard-nav">
          <Link to="/">Home</Link>
          <span className="dashboard-active">Dashboard</span>
        </nav>


{user && savedProfiles.length > 0 && (
  <select
    className="profile-switcher"
    value={user.id}
    aria-label="Switch profile"
    onChange={(event) => {
      const selectedProfile = savedProfiles.find(
        (profile) => profile.id === Number(event.target.value)
      );

      if (!selectedProfile) return;

      setUser(selectedProfile);
      localStorage.setItem(
        SAVED_USER_KEY,
        JSON.stringify(selectedProfile)
      );

      const matchingCareer = careers.find(
        (career) =>
          career.title === selectedProfile.target_career
      );

      if (matchingCareer) {
        setCareerId(matchingCareer.id);
        setCareerTitle(matchingCareer.title);

        localStorage.setItem(
          SAVED_CAREER_KEY,
          String(matchingCareer.id)
        );
        localStorage.setItem(
          `${SAVED_CAREER_KEY}_title`,
          matchingCareer.title
        );
      } else {
        setCareerId(0);
        setCareerTitle("");

        localStorage.removeItem(SAVED_CAREER_KEY);
        localStorage.removeItem(`${SAVED_CAREER_KEY}_title`);
      }
    }}
  >
    {savedProfiles.map((profile) => (
      <option key={profile.id} value={profile.id}>
        {profile.full_name} — ID {profile.id}
      </option>
    ))}
  </select>
)}

{user && (
  <button
    type="button"
    className="create-profile-button"
    onClick={() => {
      localStorage.removeItem(SAVED_USER_KEY);
localStorage.removeItem(SAVED_CAREER_KEY);
localStorage.removeItem(`${SAVED_CAREER_KEY}_title`);

setUser(null);
setCareerId(0);
setCareerTitle("");

setFullName("");
setEmail("");
setRegistrationMessage("");
setAssessmentMessage("");
setError("");
    }}
  >
    Create Another Profile
  </button>
)}


<div className="dashboard-avatar">
  {user?.full_name?.charAt(0).toUpperCase() ?? "U"}
</div>
      </header>

      <section className="dashboard-content">
        {!user && (
          <section className="dashboard-panel assessment-panel">
            <div className="panel-heading">
              <div>
                <p className="dashboard-eyebrow">YOUR PROFILE</p>
                <h2>Create your SkillBridge profile</h2>
              </div>
            </div>

            <p>
              Save your own profile to personalize your career development
              plan. Your assessment will be saved under your profile.
            </p>

            <form
              onSubmit={async (event) => {
                event.preventDefault();

                try {
                  setRegistering(true);
                  setRegistrationMessage("");

      if (!careerTitle) {
  setRegistrationMessage(
    "Please select a career path using the selector below."
  );
  return;
}

const response = await createUser(
  fullName.trim(),
  email.trim(),
  careerTitle
);

const createdUser: DashboardUser = response.user;

setUser(createdUser);
  localStorage.setItem(
  SAVED_USER_KEY,
  JSON.stringify(createdUser)
);

const selectedCareer = careers.find(
  (career) => career.title === createdUser.target_career
);

if (selectedCareer) {
  setCareerId(selectedCareer.id);
  setCareerTitle(selectedCareer.title);

  localStorage.setItem(
    SAVED_CAREER_KEY,
    String(selectedCareer.id)
  );

  localStorage.setItem(
    `${SAVED_CAREER_KEY}_title`,
    selectedCareer.title
  );
}

                  setSavedProfiles((profiles) => {
                  const updatedProfiles = [
                  ...profiles.filter((profile) => profile.id !== createdUser.id),
                  createdUser,
                ];

                  return updatedProfiles.sort((a, b) => a.id - b.id);
                });


                  setRegistrationMessage(
                    `Profile created successfully! Your user ID is ${createdUser.id}.`
                  );
                } catch (err) {
                  setRegistrationMessage(
                    err instanceof Error
                      ? err.message
                      : "Unable to create your profile."
                  );
                } finally {
                  setRegistering(false);
                }
              }}
            >
              <div className="skill-item">
                <label htmlFor="profile-name">Full name</label>
                <input
                  id="profile-name"
                  name="fullName"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="skill-item">
                <label htmlFor="profile-email">Email address</label>
                <input
                  id="profile-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>

        
            <button
            type="submit"
            disabled={
  registering ||
  careers.length === 0 ||
  !careerTitle
}
>
                {registering ? "Creating profile..." : "Create profile"}
              </button>
            </form>

            {registrationMessage && (
              <p role="status">{registrationMessage}</p>
            )}
          </section>
        )}

        <div className="dashboard-welcome">
          <div>
            <p className="dashboard-eyebrow">YOUR CAREER WORKSPACE</p>
            <h1>Your next move starts here.</h1>
            <p>
              Understand your skills, identify gaps, and turn your career
              goals into a practical learning plan.
            </p>
          </div>

          <div className="career-selector">
            <span>YOUR TARGET CAREER</span>

            <select
  value={careerId}
  onChange={async (event) => {
    const selectedId = Number(event.target.value);

    if (selectedId === 0) {
      setCareerId(0);
      setCareerTitle("");
      localStorage.removeItem(SAVED_CAREER_KEY);
      localStorage.removeItem(`${SAVED_CAREER_KEY}_title`);
      return;
    }

    const selectedCareer = careers.find(
      (career) => career.id === selectedId
    );

    
if (selectedCareer) {
  setCareerId(selectedCareer.id);
  setCareerTitle(selectedCareer.title);

  localStorage.setItem(
    SAVED_CAREER_KEY,
    String(selectedCareer.id)
  );
  localStorage.setItem(
    `${SAVED_CAREER_KEY}_title`,
    selectedCareer.title
  );

  
if (userId !== null) {
  try {
    const activeUser = user;

if (activeUser && userId !== null) {
  await saveUserCareer(
    userId,
    activeUser.full_name,
    activeUser.email,
    selectedCareer.title
  );
}

    setUser((currentUser) => {
      if (!currentUser) return currentUser;

      const updatedUser = {
        ...currentUser,
        target_career: selectedCareer.title,
      };

      localStorage.setItem(
        SAVED_USER_KEY,
        JSON.stringify(updatedUser)
      );

      setSavedProfiles((profiles) =>
        profiles.map((profile) =>
          profile.id === updatedUser.id ? updatedUser : profile
        )
      );

      return updatedUser;
    });
  } catch (error) {
    console.error("Failed to save selected career:", error);
    setError("Career selection could not be saved. Please try again.");
  }
}

}

  }}
  aria-label="Select your target career"
  disabled={careers.length === 0}
>
  <option value={0} disabled>
  Select a career path
</option>

  {careers.map((career) => (
    <option key={career.id} value={career.id}>
      {career.title}
    </option>
  ))}
</select>

            <small>Choose a career to explore its skill requirements</small>
          </div>
        </div>

        {error && (
          <div className="dashboard-notice" role="alert">
            <span>ⓘ</span>
            <p>
              <strong>Unable to load live data:</strong> {error} Make sure
              the backend is running and try refreshing the page.
            </p>
          </div>
        )}

        {loading ? (
          <div className="dashboard-notice">
            <span>⏳</span>
            <p>Loading your skills and personalized roadmap...</p>
          </div>
        ) : (
          <>
            <div className="dashboard-notice">
              <span>ⓘ</span>
              <p>
                <strong>Self-assessment:</strong> Skill levels are
                self-reported. Career requirements are illustrative project
                values, not official industry standards.
              </p>
            </div>

            {user ? (
              <>
                <section className="dashboard-panel assessment-panel">
                  <div className="panel-heading">
                    <div>
                      <p className="dashboard-eyebrow">SKILL ASSESSMENT</p>
                      <h2>Rate your current skills</h2>
                    </div>
                  </div>

                  <p>
                    Rate your current confidence from 1 (beginner) to 5
                    (advanced). These ratings are self-reported.
                  </p>

                  {careerSkills.length === 0 ? (
                    <p>
                      No skills are configured for this career yet.
                    </p>
                  ) : (
                    careerSkills.map((skill) => (
                      <div className="skill-item" key={skill.skill_id}>
                        <div className="skill-label">
                          <strong>{skill.skill_name}</strong>
                          <span>Target: {skill.required_level}/5</span>
                        </div>

                        <select
                          value={ratings[skill.skill_id] ?? ""}
                          onChange={(event) =>
                            setRatings((previous) => ({
                              ...previous,
                              [skill.skill_id]: Number(event.target.value),
                            }))
                          }
                          aria-label={`Rate your ${skill.skill_name} skill`}
                        >
                          <option value="" disabled>
                            Select level
                          </option>
                          <option value="1">1 — Beginner</option>
                          <option value="2">2 — Basic</option>
                          <option value="3">3 — Intermediate</option>
                          <option value="4">4 — Advanced</option>
                          <option value="5">5 — Highly confident</option>
                        </select>
                      </div>
                    ))
                  )}

                  <button
                    type="button"
                    disabled={savingSkills || careerSkills.length === 0}
                    onClick={async () => {
                      try {
                        setSavingSkills(true);
                        setAssessmentMessage("");

                        const ratedSkills = careerSkills.filter((skill) => {
                          const rating = ratings[skill.skill_id];
                          return rating >= 1 && rating <= 5;
                        });

                        if (ratedSkills.length === 0) {
                          setAssessmentMessage(
                            "Please rate at least one skill before saving."
                          );
                          return;
                        }

                        for (const skill of ratedSkills) {
                          await saveUserSkill(
                            userId!,
                            careerId,
                            skill.skill_id,
                            ratings[skill.skill_id]
                          );
                        }

                        const [gapData, roadmapData] = await Promise.all([
                          fetchSkillGap(userId!, careerId),
                          fetchRoadmap(userId!, careerId),
                        ]);

                        setSkills(gapData.skills ?? []);
                        setRoadmap(roadmapData.roadmap ?? []);

                        setAssessmentMessage(
                          `Your ${careerTitle} assessment has been saved!`
                        );
                      } catch (err) {
                        setAssessmentMessage(
                          err instanceof Error
                            ? err.message
                            : "Unable to save your assessment."
                        );
                      } finally {
                        setSavingSkills(false);
                      }
                    }}
                  >
                    {savingSkills ? "Saving..." : "Save assessment"}
                  </button>

                  {assessmentMessage && (
                    <p role="status">{assessmentMessage}</p>
                  )}
                </section>

                <div className="dashboard-stats">
  <article className="stat-card">
    <span>Skills assessed</span>
    <strong>
      {String(assessedSkills.length).padStart(2, "0")}
    </strong>
    <small>Skills with a saved rating</small>
  </article>

  <article className="stat-card">
    <span>Skills to improve</span>
    <strong>
      {String(skillsToImprove).padStart(2, "0")}
    </strong>
    <small>Assessed skills below the required level</small>
  </article>

  <article className="stat-card">
    <span>Awaiting assessment</span>
    <strong>
      {String(skillsAwaitingAssessment).padStart(2, "0")}
    </strong>
    <small>Skills still needing a rating</small>
  </article>
</div>

                <div className="dashboard-grid">
                  <section className="dashboard-panel">
                    <div className="panel-heading">
                      <div>
                        <p className="dashboard-eyebrow">SKILL PROFILE</p>
                        <h2>Your skills at a glance</h2>
                      </div>
                      <span className="panel-badge">LIVE DATA</span>
                    </div>

                    <div className="skill-list">
                      {skills.map((skill) => {
                        const percentage =
                          (skill.current_level / 5) * 100;

                        return (
                          <div className="skill-item" key={skill.skill_id}>
                            <div className="skill-label">
                              <div>
                                <strong>{skill.skill_name}</strong>
                                <small>
                                  {skill.status === "Not assessed"
                                    ? "Assessment needed"
                                    : `${skill.status} · Target ${skill.required_level}/5`}
                                </small>
                              </div>
                              <span>
                                {skill.current_level === 0
                                  ? "Not rated"
                                  : `${skill.current_level}/5`}
                              </span>
                            </div>

                            <div className="skill-track">
                              <div
                                className="skill-fill"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  <section className="dashboard-panel roadmap-panel">
                    <div className="panel-heading">
                      <div>
                        <p className="dashboard-eyebrow">YOUR NEXT STEPS</p>
                        <h2>Learning roadmap</h2>
                      </div>
                      <span className="roadmap-icon">↗</span>
                    </div>

                    <div className="learning-list">
                      {roadmap.map((task, index) => (
                        <article
                          className="learning-task"
                          key={task.skill_id}
                        >
                          <span className="task-number">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <strong>{task.skill_name}</strong>
                            <p>{task.recommended_action}</p>
                            <small>
                              Priority: {task.priority} · Target:{" "}
                              {task.required_level}/5
                            </small>
                          </div>
                        </article>
                      ))}
                    </div>

                    <p className="roadmap-disclaimer">
                      Recommendations are rules-based and use your
                      self-reported skill levels.
                    </p>
                  </section>
                </div>

                <section className="dashboard-panel projects-panel">
                  <div className="panel-heading">
                    <div>
                      <p className="dashboard-eyebrow">BUILD YOUR SKILLS</p>
                      <h2>Recommended Projects</h2>
                      <p>
                        Practical projects selected from your current skill
                        gaps and career path.
                      </p>
                    </div>
                    <span className="panel-badge">
                      {recommendedProjects.length} RECOMMENDED
                    </span>
                  </div>

                  {recommendedProjects.length > 0 ? (
                    <div className="project-recommendation-grid">
                      {recommendedProjects.map((project) => (
                  <article
                    className="project-recommendation-card"
                    key={project.id}
                  >
                  <span className="project-skill-tag">
                    {project.skillName}
                  </span>

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <small>Difficulty: {project.difficulty}</small>

                  <Link
                  to={`/projects/${project.id}`}
                  className="project-details-link"
                >
                 Explore Project →
                </Link>

              </article>
              ))}

                    </div>
                  ) : (
                    <p>
                      No matching project recommendations are available for
                      the current career gaps. Complete your assessment or
                      review the configured project catalogue.
                    </p>
                  )}
                </section>
              </>
            ) : (
              <section className="dashboard-panel">
                <div className="panel-heading">
                  <div>
                    <p className="dashboard-eyebrow">YOUR PERSONAL WORKSPACE</p>
                    <h2>Create a profile to begin</h2>
                  </div>
                </div>
                <p>
                  Your career requirements are available above. Create a
                  profile to save ratings and generate your personalized
                  skill-gap analysis and learning roadmap.
                </p>
              </section>
            )}
          </>
        )}

        <section className="dashboard-bottom-cta">
          <div>
            <p className="dashboard-eyebrow">THE NEXT CHAPTER</p>
            <h2>Your career deserves more than guesswork.</h2>
            <p>
              Build your skills with a clearer view of where to focus next.
            </p>
          </div>

          <Link to="/" className="dashboard-back-link">
            Back to home ↗
          </Link>
        </section>
      </section>
    </main>
  );
}