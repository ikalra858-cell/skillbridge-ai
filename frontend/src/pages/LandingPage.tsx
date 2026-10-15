import { Link } from "react-router-dom";
import "../App.css";

const features = [
  {
    number: "01",
    icon: "⌘",
    title: "Know your skill gaps",
    description:
      "Understand how your current skills compare with the requirements of your target career.",
    tag: "SKILL INTELLIGENCE",
  },
  {
    number: "02",
    icon: "↗",
    title: "Get your next steps",
    description:
      "Turn your career goal into a structured learning roadmap that fits your schedule.",
    tag: "PERSONALIZED LEARNING",
  },
  {
    number: "03",
    icon: "✳",
    title: "Build with purpose",
    description:
      "Discover practical projects that help you practise the skills you need to develop.",
    tag: "PROJECT-BASED GROWTH",
  },
];

const skills = [
  { name: "Python", level: 82, status: "Strong foundation" },
  { name: "SQL", level: 48, status: "Room to grow" },
  { name: "Machine Learning", level: 35, status: "Next priority" },
];

function LandingPage() {
  return (
    <main>
      <nav className="navbar">
        <a className="brand" href="#home" aria-label="SkillBridge AI home">
          <span className="brand-mark">
            S<span>.</span>
          </span>
          <span>
            skillbridge<span className="brand-ai">.ai</span>
          </span>
        </a>

        <div className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <a href="#mission">Our mission</a>
        </div>

        <Link className="nav-cta" to="/dashboard">
          Get started <span>↗</span>
        </Link>
      </nav>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            YOUR CAREER, WITH A CLEARER DIRECTION
          </div>

          <h1>
            Your potential
            <br />
            deserves a <span className="gradient-text">plan.</span>
          </h1>

          <p className="hero-description">
            Stop guessing what to learn next. Discover your skill gaps,
            build a personalized learning path, and turn your career goals
            into meaningful progress.
          </p>

          <div className="hero-actions">
            <Link className="button-primary" to="/dashboard">
              Find your next move <span>↗</span>
            </Link>

            <a className="button-secondary" href="#how-it-works">
              Explore the platform <span>↓</span>
            </a>
          </div>

          <div className="hero-note">
            <span className="note-icon">✦</span>
            Built for learners who want to move forward with purpose.
          </div>
        </div>

        <div className="preview-wrap">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <div className="dashboard-preview">
            <div className="preview-topbar">
              <div className="preview-brand">
                <span className="mini-brand">S.</span>
                <span>
                  SkillBridge <span className="muted">/ Overview</span>
                </span>
              </div>
              <span className="preview-avatar">L</span>
            </div>

            <div className="preview-content">
              <div className="preview-greeting">
                <div>
                  <p className="mini-label">YOUR CAREER JOURNEY</p>
                  <h3>Your next chapter.</h3>
                </div>
                <span className="preview-badge">AI-ASSISTED</span>
              </div>

              <div className="career-card">
                <div className="career-icon">✳</div>
                <div className="career-info">
                  <span>YOUR TARGET CAREER</span>
                  <h4>Machine Learning Engineer</h4>
                  <p>Personalized development path</p>
                </div>
                <span className="career-arrow">↗</span>
              </div>

              <div className="skills-heading">
                <h4>Skill snapshot</h4>
                <span>Illustrative preview</span>
              </div>

              <div className="skill-list">
                {skills.map((skill) => (
                  <div className="skill-row" key={skill.name}>
                    <div className="skill-details">
                      <span>{skill.name}</span>
                      <span className="skill-status">{skill.status}</span>
                    </div>

                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="next-step">
                <div className="next-step-icon">↗</div>
                <div>
                  <span>NEXT RECOMMENDED STEP</span>
                  <p>Strengthen your SQL foundations</p>
                </div>
                <span className="next-step-arrow">→</span>
              </div>

              <p className="preview-disclaimer">
                Illustrative example — not an actual assessment.
              </p>
            </div>
          </div>

          <div className="floating-note floating-note-top">
            <span className="floating-icon">✦</span>
            <div>
              <strong>Your path, personalized.</strong>
              <span>Built around your goals</span>
            </div>
          </div>

          <div className="floating-note floating-note-bottom">
            <span className="floating-check">✓</span>
            <div>
              <strong>Learn with direction</strong>
              <span>One step at a time</span>
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <span>LESS GUESSWORK. MORE DIRECTION.</span>
          <span className="bottom-line" />
          <a href="#features">YOUR NEXT MOVE STARTS HERE ↓</a>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <div>
            <p className="eyebrow section-eyebrow">A CLEARER WAY FORWARD</p>
            <h2>
              Turn ambition into
              <br />
              <span className="gradient-text">a real direction.</span>
            </h2>
          </div>

          <p className="section-description">
            Your career journey shouldn't be a collection of random courses.
            It should be a series of intentional steps toward something you want.
          </p>
        </div>

        <div className="feature-grid" id="how-it-works">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <div className="feature-card-top">
                <span className="feature-icon">{feature.icon}</span>
                <span className="feature-number">{feature.number}</span>
              </div>

              <p className="feature-tag">{feature.tag}</p>
              <h3>{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>

              <Link className="feature-link" to="/dashboard">
                Explore the possibilities <span>↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mission-section" id="mission">
        <div className="mission-orb">
          S<span>.</span>
        </div>

        <p className="eyebrow">WHY SKILLBRIDGE AI</p>

        <h2>
          Everyone deserves
          <br />
          a <span className="gradient-text">clearer path forward.</span>
        </h2>

        <p className="mission-description">
          We're building toward a world where access to personalized career
          guidance isn't limited by who you know, where you study, or what you
          can afford.
        </p>

        <div className="mission-pill-row">
          <span>SDG 4 · Quality Education</span>
          <span>SDG 8 · Decent Work</span>
          <span>SDG 10 · Reduced Inequalities</span>
        </div>
      </section>

      <section className="final-cta" id="get-started">
        <div>
          <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
          <h2>Make your next move a meaningful one.</h2>
          <p>
            A clearer understanding of your skills. A more intentional way
            to grow. A direction you can work toward.
          </p>
        </div>

        <Link className="button-primary" to="/dashboard">
          Explore SkillBridge AI <span>↗</span>
        </Link>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">
            S<span>.</span>
          </span>
          <span>
            skillbridge<span className="brand-ai">.ai</span>
          </span>
        </a>

        <p>Your career. Your skills. Your next move.</p>
        <span className="footer-note">A project in development · 2026</span>
      </footer>
    </main>
  );
}

export default LandingPage;