"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Copy, Mail, MoveUpRight } from "lucide-react";
import Lenis from "lenis";

type Tone = "orange" | "violet" | "lime" | "blue" | "cyan" | "pink";

type Project = {
  number: string;
  title: string;
  category: string;
  tech: string;
  year: string;
  href: string;
  live?: string;
  tone: Tone;
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
  "Python", "Java", "SQL", "PyTorch", "TensorFlow", "OpenCV",
  "YOLO", "Pandas", "NumPy", "FastAPI", "Flask", "Next.js",
  "React", "TypeScript", "Tailwind CSS", "Docker", "AWS", "Git",
];

function ProjectVisual({ project }: { project: Project }) {
  if (project.number === "01") {
    return (
      <div className="projectVisual sketchVisual">
        <div className="pvHeader"><span>SKETCH → CODE</span><span>LIVE</span></div>
        <div className="sketchWindow">
          <div className="sketchToolbar"><i /><i /><i /><span>home.sketch</span></div>
          <div className="sketchCanvas">
            <div className="wirePhone">
              <div className="wireBlock wireHero" />
              <div className="wireBlock wireLine" />
              <div className="wireBlock wireLine short" />
              <div className="wireCards"><i /><i /><i /></div>
              <div className="wireButton" />
            </div>
            <div className="sketchCursor">⌁</div>
            <div className="codeChip">&lt;Button /&gt;</div>
          </div>
        </div>
        <div className="pvBottom"><span>COMPONENT DETECTION</span><strong>RESPONSIVE</strong></div>
      </div>
    );
  }

  if (project.number === "02") {
    return (
      <div className="projectVisual deepfakeVisual">
        <div className="scannerGrid" />
        <div className="faceScanner">
          <div className="scanFace">
            <span className="eye eyeL" /><span className="eye eyeR" />
            <i className="nose" /><i className="mouth" />
          </div>
          <div className="scanCorners" />
          <div className="scanLine" />
        </div>
        <div className="signalPanel">
          <span>VISUAL</span><i />
          <span>AUDIO</span><i />
          <span>TEMPORAL</span><i />
        </div>
        <div className="waveform"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div>
        <div className="pvStatus">MULTIMODAL ANALYSIS <b>RUNNING</b></div>
      </div>
    );
  }

  if (project.number === "03") {
    return (
      <div className="projectVisual carbonVisual">
        <div className="carbonTop"><span>CARBON / 2026</span><span>−12.4%</span></div>
        <div className="carbonOrb">
          <div className="carbonCore">2.84<small>tCO₂e</small></div>
          <div className="carbonRing ringA" />
          <div className="carbonRing ringB" />
          <div className="carbonLeaf">↗</div>
        </div>
        <div className="carbonBars">
          <i style={{height:"44%"}} /><i style={{height:"67%"}} /><i style={{height:"35%"}} /><i style={{height:"78%"}} /><i style={{height:"54%"}} /><i style={{height:"31%"}} />
        </div>
        <div className="carbonLegend"><span>ENERGY</span><span>TRAVEL</span><span>FOOD</span></div>
      </div>
    );
  }

  if (project.number === "04") {
    return (
      <div className="projectVisual carVisual">
        <div className="carTopline"><span>PRICE MODEL</span><span>R² 0.91</span></div>
        <div className="carStage">
          <div className="carGlow" />
          <div className="carShape">
            <div className="carCabin" />
            <div className="carBody" />
            <i className="wheel wheelL" /><i className="wheel wheelR" />
            <b className="headlight" />
          </div>
          <div className="carTrack" />
        </div>
        <div className="priceChart"><span/><span/><span/><span/><span/><span/><span/></div>
        <div className="priceLabel">PREDICTED VALUE <b>₹ 8.42L</b></div>
      </div>
    );
  }

  if (project.number === "05") {
    return (
      <div className="projectVisual irisVisual">
        <div className="irisTopline"><span>IRIS / KNN</span><span>150 SAMPLES</span></div>
        <div className="irisFlower">
          {[0,1,2,3,4,5].map((petal) => <i key={petal} style={{"--p":petal} as React.CSSProperties} />)}
          <div className="irisCore" />
        </div>
        <div className="classifierNodes">
          <i /><i /><i /><i /><i />
          <b>SETOSA</b><b>VERSICOLOR</b><b>VIRGINICA</b>
        </div>
        <div className="irisMetric"><span>ACCURACY</span><strong>0.96</strong></div>
      </div>
    );
  }

  return (
    <div className="projectVisual unemploymentVisual">
      <div className="unemploymentTop"><span>UNEMPLOYMENT / TREND</span><span>2019—2025</span></div>
      <div className="unemploymentChart">
        <div className="uAxis" />
        <div className="uBars"><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <svg className="trendLine" viewBox="0 0 600 220" preserveAspectRatio="none">
          <path d="M0 150 C70 128,90 160,150 106 S240 86,290 120 S370 92,420 72 S490 36,600 58" />
          <circle cx="420" cy="72" r="4" />
        </svg>
      </div>
      <div className="trendData"><span>MEAN</span><b>6.84%</b><span>REGRESSION</span><b>+0.21</b></div>
    </div>
  );
}
function SplitLineText({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`splitLineText ${className}`}>
      {children.split(" ").map((word, index) => (
        <span className="wordClip" key={`${word}-${index}`}>
          <span className="word">{word}{index < children.split(" ").length - 1 ? "\u00a0" : ""}</span>
        </span>
      ))}
    </span>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ "--delay": `${delay}ms` } as React.CSSProperties}>{children}</div>;
}

function Magnetic({ children, className = "", ...props }: React.ComponentPropsWithoutRef<"a"> & { children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.setProperty("--mx", `${Math.max(-12, Math.min(12, x * 0.18))}px`);
    node.style.setProperty("--my", `${Math.max(-12, Math.min(12, y * 0.18))}px`);
  };

  const reset = () => {
    ref.current?.style.setProperty("--mx", "0px");
    ref.current?.style.setProperty("--my", "0px");
  };

  return <a {...props} ref={ref} className={`magnetic ${className}`} onPointerMove={onMove} onPointerLeave={reset}>{children}</a>;
}

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  const selected = useMemo(() => projects[activeProject], [activeProject]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setLoaded(true), reduce ? 0 : 850);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.86,
      syncTouch: true,
      respectReducedMotion: true,
    });

    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("isVisible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    reveals.forEach((node) => observer.observe(node));

    const onMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty("--scroll-progress", `${window.scrollY / max}`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      lenis.destroy();
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
    <main className={`site ${loaded ? "siteLoaded" : ""}`}>
      <div className="loader" aria-hidden={!loaded}>
        <div className="loaderTop"><span>RISHI KUMAR</span><span>2026</span></div>
        <div className="loaderCounter">0<span>%</span></div>
        <div className="loaderBar"><span /></div>
        <div className="loaderBottom"><span>MACHINE LEARNING / AI / COMPUTER VISION</span><span>CHENNAI, INDIA</span></div>
      </div>

      <div className="cursor">
        <span className="cursorDot" />
        <span className="cursorRing" />
      </div>

      <header className="topbar">
        <a href="#top" className="wordmark">RK<span>.</span></a>
        <p className="descriptor">
          MACHINE LEARNING ENGINEER<br />
          AI · COMPUTER VISION · DATA
        </p>
        <nav className="topnav">
          <a href="#works">Works</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="top" className="heroStage">
        <div className="heroTopline">
          <span>00 — INTRO</span>
          <span>CHENNAI, INDIA</span>
          <span>AVAILABLE FOR OPPORTUNITIES</span>
        </div>

        <div className="heroTitleWrap">
          <Reveal className="heroMicro"><span>RISHI KUMAR / DATA SCIENCE GRADUATE</span></Reveal>
          <h1 className="heroTitle">
            <Reveal delay={80}><SplitLineText>BUILDING</SplitLineText></Reveal>
            <Reveal delay={160}><SplitLineText>INTELLIGENT</SplitLineText></Reveal>
            <Reveal delay={240}><SplitLineText className="accentText">SYSTEMS.</SplitLineText></Reveal>
          </h1>
          <Reveal className="heroDescription" delay={330}>
            <p>I design machine learning, computer vision and data products where models become useful, understandable software.</p>
          </Reveal>
        </div>

        <div className="heroSideNote">
          <Reveal delay={450}>
            <span>SCROLL TO EXPLORE</span>
            <span className="sideArrow">↓</span>
          </Reveal>
        </div>

        <div className="heroFooter">
          <span>OPEN TO WORK</span>
          <span>PYTHON / PYTORCH / NEXT.JS</span>
          <span>01 / 04</span>
        </div>
      </section>

      <div className="scrollProgress" aria-hidden="true"><span /></div>

      <section className="tickerSection">
        <div className="tickerTrack">
          <span>AI ENGINEERING</span><b>✳</b><span>MACHINE LEARNING</span><b>✳</b><span>COMPUTER VISION</span><b>✳</b>
          <span>AI ENGINEERING</span><b>✳</b><span>MACHINE LEARNING</span><b>✳</b><span>COMPUTER VISION</span><b>✳</b>
        </div>
      </section>

      <section id="works" className="worksSection sectionShell">
        <div className="sectionHead">
          <span className="sectionNumber">01</span>
          <div>
            <p className="eyebrow">SELECTED WORKS</p>
            <h2><SplitLineText>PROJECTS</SplitLineText><br /><em><SplitLineText>IN MOTION.</SplitLineText></em></h2>
          </div>
          <p className="sectionMeta">06 PROJECTS<br />CLICK A PROJECT TO OPEN</p>
        </div>

        <div className="workIndex">
          <div className="workList">
            {projects.map((project, index) => {
              const isActive = activeProject === index;
              return (
                <Reveal key={project.title} delay={index * 45} className={`workReveal ${isActive ? "activeReveal" : ""}`}>
                  <div
                    className={`workRow ${isActive ? "isActive" : ""}`}
                    onMouseEnter={() => setActiveProject(index)}
                  >
                    <a href={project.href} target="_blank" rel="noreferrer" className="workLink">
                      <span className="workNo">{project.number}</span>
                      <span className="workTitle">{project.title}</span>
                      <span className="workType">{project.category}</span>
                      <span className="workYear">{project.year}</span>
                      <MoveUpRight size={16} className="workArrow" />
                    </a>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <aside className="selectedVisual">
            <div
              key={selected.title}
              className="selectedFrame"
              onPointerMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
                const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
                event.currentTarget.style.setProperty("--tilt-x", `${y * -4}deg`);
                event.currentTarget.style.setProperty("--tilt-y", `${x * 5}deg`);
              }}
              onPointerLeave={(event) => {
                event.currentTarget.style.setProperty("--tilt-x", "0deg");
                event.currentTarget.style.setProperty("--tilt-y", "0deg");
              }}
            >
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
              <a href={selected.href} target="_blank" rel="noreferrer">GitHub <MoveUpRight size={13} /></a>
              {selected.live && <a href={selected.live} target="_blank" rel="noreferrer">Live site <MoveUpRight size={13} /></a>}
            </div>
          </aside>
        </div>
      </section>

      <section id="about" className="aboutSection sectionShell">
        <div className="sectionHead">
          <span className="sectionNumber">02</span>
          <div>
            <p className="eyebrow">ABOUT / EXPERIENCE</p>
            <h2><SplitLineText>MODEL</SplitLineText><br /><em><SplitLineText>TO PRODUCT.</SplitLineText></em></h2>
          </div>
          <p className="sectionMeta">COGNIBOT<br />MACHINE LEARNING INTERN</p>
        </div>

        <div className="aboutGrid">
          <Reveal className="aboutLead">
            <p className="bigStatement">I like the part where an experiment stops being a notebook and starts behaving like a product.</p>
          </Reveal>
          <Reveal className="aboutCopy" delay={120}>
            <p>At Cognibot, I worked across model output review, data quality, Python ETL automation, reporting, validation and documentation.</p>
            <p>My projects follow the same loop: <strong>build → validate → improve.</strong></p>
            <div className="factGrid">
              <div><strong>20/20</strong><span>SketchMaster cases validated</span></div>
              <div><strong>12.25ms</strong><span>average inference time</span></div>
              <div><strong>22%</strong><span>output reduction after optimization</span></div>
              <div><strong>7.30</strong><span>graduated CGPA / 10</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="skillsSection sectionShell">
        <div className="sectionHead">
          <span className="sectionNumber">03</span>
          <div>
            <p className="eyebrow">TOOLS / STACK</p>
            <h2><SplitLineText>THINGS</SplitLineText><br /><em><SplitLineText>I BUILD WITH.</SplitLineText></em></h2>
          </div>
        </div>
        <div className="skillWall">
          {skills.map((skill, index) => (
            <Reveal key={skill} delay={index * 22}>
              <span>{skill}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" className="contactSection sectionShell">
        <div className="sectionHead">
          <span className="sectionNumber">04</span>
          <div>
            <p className="eyebrow">CONTACT</p>
            <h2><SplitLineText>LET&apos;S MAKE</SplitLineText><br /><em><SplitLineText>SOMETHING USEFUL.</SplitLineText></em></h2>
          </div>
        </div>

        <div className="contactGrid">
          <Reveal className="contactBig">
            <button onClick={copyEmail} className="emailButton" type="button">
              <span>{copied ? "EMAIL COPIED" : "s.rishikumar04@gmail.com"}</span>
              <Copy size={17} />
            </button>
            <div className="contactMicro">AVAILABLE FOR INTERNSHIPS / ENTRY-LEVEL ROLES / AI & ML PROJECTS</div>
          </Reveal>

          <Reveal className="socialGrid" delay={130}>
            <Magnetic className="socialItem" href="https://github.com/Rixshi04" target="_blank" rel="noreferrer">GitHub <span>GH</span></Magnetic>
            <Magnetic className="socialItem" href="https://www.linkedin.com/in/rishi-kumar-632a58152/" target="_blank" rel="noreferrer">LinkedIn <span>in</span></Magnetic>
            <Magnetic className="socialItem" href="mailto:s.rishikumar04@gmail.com">Email <Mail size={15} /></Magnetic>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 RISHI KUMAR</span>
        <span>BUILT WITH NEXT.JS · TYPESCRIPT</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
