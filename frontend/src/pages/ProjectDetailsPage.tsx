import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import "../App.css";
import { projectGuides } from "../data/projectGuides";


export default function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
  window.scrollTo(0, 0);
}, [projectId]);

  const project = projectGuides.find(
    (item) => item.id === projectId
  );


  if (!project) {
    return (
      <main className="project-details-page">
        <section className="project-details-container">
          <p className="dashboard-eyebrow">PROJECT GUIDE</p>
          <h1>Project not found</h1>
          <p>
            This project guide is not available yet. Return to your
            dashboard to explore the available recommendations.
          </p>
          <Link to="/dashboard" className="project-back-link">
            Back to Dashboard
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="project-details-page">
      <section className="project-details-container">
        <Link to="/dashboard" className="project-back-link">
          ← Back to Dashboard
        </Link>

        <header className="project-details-header">
          <span className="project-skill-tag">
            {project.category}
          </span>

          <h1>{project.title}</h1>

          <p>{project.description}</p>

          <span className="project-difficulty">
            Difficulty: {project.difficulty}
          </span>

          <p className="project-duration">
            Estimated duration: {project.estimatedDuration}
           </p>
        </header>

        <section className="project-details-section">
          <h2>Project Overview</h2>
          <p>{project.overview}</p>
        </section>

        <section className="project-details-section">
       <h2>Prerequisites</h2>
      <ul>
        {project.prerequisites.map((item) => (
      <li key={item}>{item}</li>
       ))}
      </ul>
        </section>

        <section className="project-details-section">
          <h2>Skills You'll Develop</h2>
          <ul>
            {project.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className="project-details-section">
          <h2>Tools & Technologies</h2>
          <ul>
            {project.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </section>

        <section className="project-details-section">
          <h2>Datasets & Learning Resources</h2>
          <ul>
            {project.resources.map((resource) => (
              <li key={resource.url}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="project-details-section">
          <h2>Implementation Roadmap</h2>
          <ol>
            {project.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="project-details-section">
          <h2>Expected Deliverables</h2>
          <ul>
            {project.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="project-details-section">
          <h2>Completion Checklist</h2>
          <ul className="project-checklist">
            {project.checklist.map((item) => (
              <li key={item}>
                <span aria-hidden="true">□</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}