"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Copy, Github, Linkedin, Mail, MoveUpRight } from "lucide-react";
import Lenis from "lenis";

type Project = {
  number: string;
  title: string;
  category: string;
  tech: string;
  year: string;
  href: string;
  live?: string;
  tone: "orange" | "cyan" | "lime" | "violet" | "blue" | "pink";
  description: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "SketchMaster",
    category: "AI / COMPUTER VISION",
    tech: "PYTHON · PYTORCH · FASTAPI · NEXT.JS",
    year: "2026",
    href: "https://github.com/Rixshi04/sketch2code-AI-based-sketch-interpretation-for-human-centric-html-css-code-generation",
    tone: "orange",
    description:
      "Hand-drawn interface sketches transformed into responsive UI code, with component detection, layout inference, live preview and an interactive editor.",
  },
  {
    number: "02",
    title: "DeepFake Detector",
    category: "DEEP LEARNING / MEDIA",
    tech: "CNN · LSTM · PYTORCH · OPENCV",
    year: "2026",
    href: "https://github.com/Rixshi04/Deep-Fake-video-audio-detector-using-Artificial-intelligence-and-Machine-Learning-",
    live: "https://deepfake-video-detector.vercel.app",
    tone: "violet",
    description:
      "A multimodal pipeline that combines visual CNN features, temporal LSTM modeling and audio spectrogram analysis for manipulated-media detection.",
  },
  {
    number: "03",
    title: "Carbon Footprint Tracker",
    category: "DATA / SUSTAINABILITY",
    tech: "JAVASCRIPT · ANALYTICS · DASHBOARDS",
    year: "2026",
    href: "https://github.com/Rixshi04/carbon-foot-print-tracker",
    tone: "lime",
    description:
      "A practical analytics concept for tracking emissions, measuring progress and turning activity data into understandable sustainability insights.",
  },
  {
    number: "04",
    title: "Car Price Prediction",
    category: "MACHINE LEARNING",
    tech: "PYTHON · PANDAS · SCIKIT-LEARN",
    year: "2025",
    href: "https://github.com/Rixshi04/Car-Price-Prediction-with-Machine-Learning",
    tone: "blue",
    description:
      "An end-to-end regression workflow covering preprocessing, exploratory analysis, feature encoding, training and model evaluation.",
  },
  {
    number: "05",
    title: "Iris Classification",
    category: "MACHINE LEARNING",
    tech: "PYTHON · KNN · SCIKIT-LEARN",
    year: "2025",
    href: "https://github.com/Rixshi04/Iris-Flower-Classification-with-Machine-Learning",
    tone: "cyan",
    description:
      "A compact classification project with standardized features and evaluation using accuracy, confusion matrix, precision, recall and F1-score.",
  },
  {
    number: "06",
    title: "Unemployment Analysis",
    category: "DATA / STATISTICS",
    tech: "PYTHON · PANDAS · SCIPY",
    year: "2025",
    href: "https://github.com/Rixshi04/Unemployment-Analysis-with-Python",
    tone: "pink",
    description:
      "Exploration of unemployment trends using data preparation, EDA, statistical testing, linear regression and forecasting-oriented analysis.",
  },
];

const skills = [
  "Python",
  "Java",
  "SQL",
  "PyTorch",
  "TensorFlow",
  "OpenCV",
  "YOLO",
  "Pandas",
  "NumPy",
  "FastAPI",
  "Flask",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Docker",
  "AWS",
  "Git",
];

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`projectVisual projectVisual--${project.tone}`} aria-hidden="true">
      <div className="visualGlow" />
      <div className="visualGrid" />
      <div className="visualOrb" />
      <div className="visualPlane" />
      <div className="visualLabel">{project.number} / {project.category}</div>
    </div>
  );
}

function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marqueeTrack">
        <span>AI ENGINEERING</span><i>•</i><span>MACHINE LEARNING</span><i>•</i>
        <span>COMPUTER VISION</span><i>•</i><span>DATA</span><i>•</i>
        <span>AI ENGINEERING</span><i>•</i><span>MACHINE LEARNING</span><i>•</i>
        <span>COMPUTER VISION</span><i>•</i><span>DATA</span><i>•</i>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: true,
      respectReducedMotion: true,
    });

    return () => lenis.destroy();
  }, []);

  const selected = useMemo(() => projects[activeProject], [activeProject]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("s.rishikumar04@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = "mailto:s.rishikumar04@gmail.com";
    }
  };

  return (
    <main className="site">
      <header className="topbar">
        <a href="#top" className="wordmark">
          RISHI KUMAR<span>.</span>
        </a>

        <p className="descriptor">
          Machine Learning Engineer with a background in
          <br />
          computer vision, data and AI application development.
        </p>

        <nav className="topnav">
          <a href="#works">Selected Works</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="top" className="heroStage">
        <div className="heroTopline">
          <span>CHENNAI, INDIA</span>
          <span>AVAILABLE FOR OPPORTUNITIES</span>
          <span>PORTFOLIO — 2026</span>
        </div>

        <div className="heroTitleWrap">
          <p className="heroMicro">AI · ML · COMPUTER VISION · SOFTWARE</p>
          <h1 className="heroTitle">
            RISHI
            <br />
            KUMAR
          </h1>

          <div className="heroAside">
            <p>
              I build intelligent systems that move from data and model
              experiments into usable products.
            </p>
            <a href="#works">
              SCROLL TO SELECTED WORKS <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="heroFooter">
          <span>OPEN TO WORK</span>
          <span>PYTHON / PYTORCH / NEXT.JS</span>
          <span>↘ SCROLL</span>
        </div>
      </section>

      <Marquee />

      <section id="works" className="worksSection sectionShell">
        <div className="sectionHead">
          <span className="sectionNumber">01</span>
          <div>
            <p className="eyebrow">SELECTED WORKS</p>
            <h2>Projects that put<br />the <em>model</em> to work.</h2>
          </div>
          <p className="sectionMeta">
            06 projects
            <br />
            machine learning / data / interfaces
          </p>
        </div>

        <div className="workIndex">
          <div className="workList">
            {projects.map((project, index) => {
              const isActive = activeProject === index;
              return (
                <div
                  key={project.title}
                  className={`workRow ${isActive ? "isActive" : ""}`}
                  onMouseEnter={() => setActiveProject(index)}
                  onFocus={() => setActiveProject(index)}
                >
                  <a href={project.href} target="_blank" rel="noreferrer" className="workLink">
                    <span className="workNo">{project.number}</span>
                    <span className="workTitle">{project.title}</span>
                    <span className="workType">{project.category}</span>
                    <span className="workYear">{project.year}</span>
                    <MoveUpRight size={16} className="workArrow" />
                  </a>
                </div>
              );
            })}
          </div>

          <aside className="selectedVisual">
            <div className="selectedFrame">
              <ProjectVisual project={selected} />
              <div className="selectedInfo">
                <div>
                  <span>{selected.category}</span>
                  <strong>{selected.title}</strong>
                </div>
                <span>{selected.year}</span>
              </div>
            </div>
            <p className="selectedDescription">{selected.description}</p>
            <div className="selectedLinks">
              <a href={selected.href} target="_blank" rel="noreferrer">
                GitHub <Github size={14} />
              </a>
              {selected.live && (
                <a href={selected.live} target="_blank" rel="noreferrer">
                  Live site <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section id="about" className="aboutSection sectionShell">
        <div className="sectionHead">
          <span className="sectionNumber">02</span>
          <div>
            <p className="eyebrow">ABOUT</p>
            <h2>A developer<br />who likes <em>systems.</em></h2>
          </div>
          <p className="sectionMeta">
            CHENNAI, INDIA
            <br />
            DATA SCIENCE GRADUATE
          </p>
        </div>

        <div className="aboutGrid">
          <div className="aboutLead">
            <p className="bigStatement">
              I work across machine learning, computer vision, data analysis and modern web engineering —
              connecting experiments to real interfaces.
            </p>
          </div>
          <div className="aboutCopy">
            <p>
              My focus is practical AI: prepare the data, validate the outputs, build the service,
              and make the result easy to use.
            </p>
            <p>
              During my Machine Learning internship at Cognibot, I worked on model output review,
              data validation, Python ETL automation, reporting and documentation.
            </p>
            <div className="factGrid">
              <div><strong>20/20</strong><span>validated SketchMaster cases</span></div>
              <div><strong>12.25ms</strong><span>average inference time</span></div>
              <div><strong>22%</strong><span>output reduction after optimization</span></div>
              <div><strong>7.30</strong><span>graduated CGPA / 10</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="skillsSection sectionShell">
        <div className="sectionHead">
          <span className="sectionNumber">03</span>
          <div>
            <p className="eyebrow">TOOLS / STACK</p>
            <h2>Built with<br /><em>curiosity.</em></h2>
          </div>
        </div>

        <div className="skillWall">
          {skills.map((skill, index) => (
            <span key={skill} style={{ "--i": index } as React.CSSProperties}>{skill}</span>
          ))}
        </div>
      </section>

      <section id="contact" className="contactSection sectionShell">
        <div className="sectionHead">
          <span className="sectionNumber">04</span>
          <div>
            <p className="eyebrow">CONTACT</p>
            <h2>Let&apos;s make<br />something <em>useful.</em></h2>
          </div>
        </div>

        <div className="contactGrid">
          <div className="contactBig">
            <button onClick={copyEmail} className="emailButton" type="button">
              <span>{copied ? "EMAIL COPIED" : "s.rishikumar04@gmail.com"}</span>
              <Copy size={16} />
            </button>
          </div>

          <div className="socialGrid">
            <a href="https://github.com/Rixshi04" target="_blank" rel="noreferrer">
              GitHub <Github size={15} />
            </a>
            <a href="https://www.linkedin.com/in/rishi-kumar-632a58152/" target="_blank" rel="noreferrer">
              LinkedIn <Linkedin size={15} />
            </a>
            <a href="mailto:s.rishikumar04@gmail.com">
              Email <Mail size={15} />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 RISHI KUMAR</span>
        <span>MACHINE LEARNING · AI · COMPUTER VISION</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
