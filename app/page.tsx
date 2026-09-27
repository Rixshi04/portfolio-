"use client";

import { useEffect, useRef } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

type Project = {
  title: string;
  type: string;
  description: string;
  stack: string[];
  href: string;
  live?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "SketchMaster",
    type: "AI • COMPUTER VISION • FULL STACK",
    description:
      "An end-to-end sketch-to-code system that interprets handwritten UI sketches, infers interface structure, and generates responsive code with an interactive editor and live preview.",
    stack: ["Python", "OpenCV", "PyTorch", "FastAPI", "Next.js", "TypeScript"],
    href: "https://github.com/Rixshi04/sketch2code-AI-based-sketch-interpretation-for-human-centric-html-css-code-generation",
    featured: true,
  },
  {
    title: "DeepFake Video & Audio Detector",
    type: "DEEP LEARNING • MEDIA FORENSICS",
    description:
      "A multimodal detection pipeline combining CNN visual features, LSTM temporal modeling, and audio spectrogram analysis to classify potentially manipulated media.",
    stack: ["Python", "CNN", "LSTM", "PyTorch", "OpenCV", "Librosa", "Flask"],
    href: "https://github.com/Rixshi04/Deep-Fake-video-audio-detector-using-Artificial-intelligence-and-Machine-Learning-",
    live: "https://deepfake-video-detector.vercel.app",
    featured: true,
  },
  {
    title: "Carbon Footprint Tracker",
    type: "DATA • ANALYTICS • SUSTAINABILITY",
    description:
      "A tracking and analytics concept for quantifying emissions, monitoring progress, and surfacing data-driven reduction insights through dashboards and reporting.",
    stack: ["JavaScript", "Data Analytics", "Dashboards"],
    href: "https://github.com/Rixshi04/carbon-foot-print-tracker",
  },
  {
    title: "Car Price Prediction",
    type: "MACHINE LEARNING • REGRESSION",
    description:
      "A supervised learning workflow covering preprocessing, exploratory analysis, feature encoding, model training, and evaluation for car price prediction.",
    stack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    href: "https://github.com/Rixshi04/Car-Price-Prediction-with-Machine-Learning",
  },
  {
    title: "Iris Flower Classification",
    type: "MACHINE LEARNING • CLASSIFICATION",
    description:
      "A compact classification project using standardized features and K-Nearest Neighbors, with evaluation through accuracy, confusion matrix, precision, recall, and F1-score.",
    stack: ["Python", "Pandas", "Scikit-learn", "Joblib"],
    href: "https://github.com/Rixshi04/Iris-Flower-Classification-with-Machine-Learning",
  },
  {
    title: "Unemployment Analysis",
    type: "DATA ANALYSIS • STATISTICS",
    description:
      "An analytical workflow exploring unemployment trends with preprocessing, EDA, statistical testing, linear regression, and forecasting-oriented analysis.",
    stack: ["Python", "Pandas", "SciPy", "Scikit-learn", "Matplotlib"],
    href: "https://github.com/Rixshi04/Unemployment-Analysis-with-Python",
  },
];

const skillGroups = [
  { label: "Programming", values: ["Python", "Java", "SQL"] },
  {
    label: "Machine Learning & AI",
    values: ["Machine Learning", "Deep Learning", "CNN", "LSTM", "YOLO", "PyTorch", "TensorFlow", "Feature Engineering"],
  },
  {
    label: "Computer Vision & Data",
    values: ["OpenCV", "Image Processing", "Pandas", "NumPy", "Matplotlib", "Jupyter", "Librosa"],
  },
  {
    label: "Engineering",
    values: ["FastAPI", "Flask", "REST APIs", "Git", "GitHub", "Docker", "AWS", "VS Code"],
  },
  {
    label: "Web & Database",
    values: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "SQLite", "MySQL"],
  },
  {
    label: "Analytics",
    values: ["Excel", "Tableau", "Power BI", "Data Cleaning", "Data Analysis"],
  },
];

function WireTerrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let time = 0;
    let pointerX = 0;
    let pointerY = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      time += 0.007;

      ctx.clearRect(0, 0, width, height);

      const sky = ctx.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "#020202");
      sky.addColorStop(0.62, "#050505");
      sky.addColorStop(1, "#090909");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      const horizonY = height * 0.5 + pointerY * 22;
      const sunX = width * 0.5 + pointerX * 100;
      const sunY = horizonY - height * 0.01;

      const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, width * 0.22);
      glow.addColorStop(0, "rgba(255,92,42,.3)");
      glow.addColorStop(0.3, "rgba(255,92,42,.12)");
      glow.addColorStop(1, "rgba(255,92,42,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = "rgba(255,64,26,.24)";
      ctx.lineWidth = 1;

      for (let y = 0; y < 16; y++) {
        const t = y / 15;
        const py = horizonY + Math.pow(t, 1.65) * height * 0.65;
        ctx.beginPath();
        ctx.moveTo(0, py);
        for (let x = 0; x <= width; x += 14) {
          const wave = Math.sin(x * 0.004 + time * 1.7 + y * 0.4) * (1 + t * 7);
          ctx.lineTo(x, py + wave);
        }
        ctx.stroke();
      }

      const horizonSpacing = 52;
      for (let x = -width * 1.4; x <= width * 1.4; x += horizonSpacing) {
        const center = width / 2 + pointerX * 180;
        ctx.beginPath();
        ctx.moveTo(center, horizonY);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      ctx.strokeStyle = "rgba(255,80,34,.34)";
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width, horizonY);
      ctx.stroke();

      ctx.globalAlpha = 0.45;
      for (let band = 0; band < 9; band++) {
        const offset = Math.sin(time * 0.9 + band) * 9;
        const radius = 20 + band * 10;
        ctx.beginPath();
        ctx.arc(sunX, sunY, radius + offset, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      const vignette = ctx.createRadialGradient(width / 2, height / 2, height * 0.15, width / 2, height / 2, height * 0.8);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,.72)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="terrainCanvas" aria-hidden="true" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="sectionLabel">{children}</div>;
}

export default function Home() {
  return (
    <main>
      <nav className="siteNav">
        <a className="brand" href="#top" aria-label="Rishi Kumar home">
          RK<span>.</span>
        </a>

        <div className="navLinks">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
        </div>

        <a className="navCta" href="mailto:s.rishikumar04@gmail.com">
          Let&apos;s talk <ArrowUpRight size={15} />
        </a>
      </nav>

      <section id="top" className="hero">
        <WireTerrain />
        <div className="heroOverlay" />
        <div className="heroNoise" />

        <div className="heroInner">
          <div className="statusPill">
            <span className="statusDot" />
            OPEN TO OPPORTUNITIES
          </div>

          <p className="eyebrow">MACHINE LEARNING ENGINEER · AI ENGINEER · COMPUTER VISION</p>

          <h1>
            Building
            <br />
            <span>intelligent systems</span>
            <br />
            <em>from idea to impact.</em>
          </h1>

          <p className="heroCopy">
            I&apos;m Rishi Kumar, a Computer Science &amp; Engineering (Data Science) graduate focused on
            machine learning, computer vision, data-driven applications, and practical software engineering.
          </p>

          <div className="heroActions">
            <a className="button buttonPrimary" href="#projects">
              Explore projects <ArrowUpRight size={17} />
            </a>
            <a className="button buttonGhost" href="mailto:s.rishikumar04@gmail.com">
              <Mail size={16} /> Get in touch
            </a>
          </div>

          <div className="heroMeta">
            <a href="https://github.com/Rixshi04" target="_blank" rel="noreferrer">
              <Github size={17} /> GitHub
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              <Linkedin size={17} /> LinkedIn
            </a>
            <span>
              <MapPin size={16} /> Chennai, India
            </span>
          </div>
        </div>

        <a className="scrollCue" href="#about">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={15} />
        </a>
      </section>

      <section id="about" className="section splitSection">
        <SectionLabel>01 / ABOUT</SectionLabel>
        <div className="sectionBody">
          <div className="introGrid">
            <div>
              <p className="kicker">BUILDING ACROSS THE STACK</p>
              <h2>
                Data in.
                <br />
                Models up.
                <br />
                <span>Products out.</span>
              </h2>
            </div>

            <div className="sectionText">
              <p>
                I enjoy moving from a messy problem to a working system: preparing the data, evaluating the
                model, exposing the logic through an API, and shaping the product around what users actually need.
              </p>
              <p>
                My work spans ML, computer vision, backend APIs, modern web development, testing, analytics,
                documentation, and cloud fundamentals.
              </p>
            </div>
          </div>

          <div className="metricStrip">
            <div>
              <strong>20/20</strong>
              <span>SketchMaster test cases validated</span>
            </div>
            <div>
              <strong>12.25ms</strong>
              <span>Average processing time on final pipeline</span>
            </div>
            <div>
              <strong>22%</strong>
              <span>Approx. reduction in generated output after optimization</span>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section splitSection">
        <SectionLabel>02 / EXPERIENCE</SectionLabel>
        <div className="sectionBody">
          <div className="timelineItem">
            <div className="timelineRail">
              <span />
            </div>
            <div className="timelineMain">
              <div className="timelineTop">
                <div>
                  <p className="kicker">SEP 2025 — OCT 2025</p>
                  <h3>Machine Learning Intern</h3>
                  <p className="muted">Cognibot · Chennai</p>
                </div>
                <BriefcaseBusiness size={22} />
              </div>

              <div className="experienceGrid">
                <p>
                  Reviewed machine learning model outputs and generated structured reports, identifying data
                  inconsistencies, anomalies, and quality issues for investigation.
                </p>
                <p>
                  Assisted with data preparation, validation, and preprocessing; built Python ETL pipelines and
                  automation scripts for recurring ingestion, transformation, and reporting workflows.
                </p>
                <p>
                  Supported dashboard preparation, model-output testing, documentation, and collaboration with
                  senior team members on issue resolution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section splitSection credentialsSection">
        <SectionLabel>03 / EDUCATION &amp; CREDENTIALS</SectionLabel>
        <div className="sectionBody">
          <div className="credentialsGrid">
            <div className="credentialBlock">
              <p className="kicker">EDUCATION</p>
              <h3>Sathyabama Institute of Science and Technology</h3>
              <p className="credentialTitle">B.E. Computer Science and Engineering (Data Science)</p>
              <div className="credentialMeta">
                <span>2022 — 2026</span>
                <span>CGPA 7.30 / 10.0</span>
                <span>Chennai</span>
              </div>
            </div>

            <div className="credentialBlock">
              <p className="kicker">CERTIFICATIONS</p>
              <div className="certList">
                <div className="certItem">
                  <div>
                    <strong>NSIC — AI Model Development using MLOps</strong>
                    <span>February 2025</span>
                  </div>
                  <Sparkles size={17} />
                </div>
                <div className="certItem">
                  <div>
                    <strong>Deloitte — Data Analytics &amp; Visualisation Tools</strong>
                    <span>February 2026</span>
                  </div>
                  <Database size={17} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section splitSection projectsSection">
        <SectionLabel>04 / SELECTED WORK</SectionLabel>
        <div className="sectionBody">
          <div className="projectsIntro">
            <div>
              <p className="kicker">PROJECTS</p>
              <h2>
                Serious experiments.
                <br />
                <span>Useful outcomes.</span>
              </h2>
            </div>
            <a className="textLink" href="https://github.com/Rixshi04" target="_blank" rel="noreferrer">
              View GitHub <ExternalLink size={15} />
            </a>
          </div>

          <div className="projectGrid">
            {projects.map((project, index) => (
              <article className={project.featured ? "projectCard featured" : "projectCard"} key={project.title}>
                <div className="projectNumber">{String(index + 1).padStart(2, "0")}</div>
                <div className="projectIcon">
                  {index === 0 ? <Sparkles size={21} /> : index === 1 ? <BrainCircuit size={21} /> : <Code2 size={21} />}
                </div>

                <div className="projectType">{project.type}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="tagRow">
                  {project.stack.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="projectFooter">
                  <a href={project.href} target="_blank" rel="noreferrer">
                    Repository <ArrowUpRight size={15} />
                  </a>
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Live <ExternalLink size={14} />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="section splitSection">
        <SectionLabel>05 / TOOLKIT</SectionLabel>
        <div className="sectionBody">
          <div className="projectsIntro">
            <div>
              <p className="kicker">TECHNICAL SKILLS</p>
              <h2>
                Tools for
                <br />
                <span>shipping.</span>
              </h2>
            </div>
            <p className="sectionLead">
              A practical stack across programming, ML, computer vision, APIs, web apps, data, and analytics.
            </p>
          </div>

          <div className="skillGroups">
            {skillGroups.map((group) => (
              <div className="skillGroup" key={group.label}>
                <h3>{group.label}</h3>
                <div>
                  {group.values.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section philosophySection">
        <SectionLabel>06 / HOW I WORK</SectionLabel>
        <div className="sectionBody">
          <div className="philosophyGrid">
            <div>
              <Code2 size={24} />
              <h3>Build</h3>
              <p>Turn requirements into maintainable models, APIs, interfaces, and data workflows.</p>
            </div>
            <div>
              <Database size={24} />
              <h3>Validate</h3>
              <p>Use testing, data quality checks, evaluation metrics, and clear documentation to understand results.</p>
            </div>
            <div>
              <BrainCircuit size={24} />
              <h3>Improve</h3>
              <p>Iterate quickly, optimize bottlenecks, and keep learning the tools needed for the next problem.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contactSection">
        <div className="contactLabel">07 / CONTACT</div>
        <div>
          <p className="kicker">LET&apos;S BUILD SOMETHING USEFUL</p>
          <h2>
            Have a problem worth
            <br />
            <em>solving?</em>
          </h2>
          <p className="contactCopy">
            I&apos;m open to entry-level opportunities across AI/ML, software engineering, data, and QA automation.
          </p>
          <div className="contactActions">
            <a className="button buttonPrimary" href="mailto:s.rishikumar04@gmail.com">
              s.rishikumar04@gmail.com <ArrowUpRight size={17} />
            </a>
            <a className="button buttonGhost" href="https://github.com/Rixshi04" target="_blank" rel="noreferrer">
              GitHub <Github size={16} />
            </a>
          </div>
        </div>
      </section>

      <footer className="siteFooter">
        <span>© 2026 Rishi Kumar</span>
        <span>Next.js · TypeScript · Built for Vercel</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
