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

    const gl = canvas.getContext("webgl2", {
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });

    if (!gl) return;

    const vertexShaderSource = [
      "#version 300 es",
      "      precision highp float;",
      "",
      "      layout(location = 0) in vec3 aPosition;",
      "",
      "      uniform float uTime;",
      "      uniform float uScroll;",
      "      uniform float uDepth;",
      "      uniform float uCameraHeight;",
      "      uniform float uPitch;",
      "      uniform float uYaw;",
      "      uniform float uRoll;",
      "      uniform vec2 uResolution;",
      "",
      "      out float vDepth;",
      "      out float vHeight;",
      "",
      "      float hash(vec2 p) {",
      "        p = fract(p * vec2(123.34, 345.45));",
      "        p += dot(p, p + 34.345);",
      "        return fract(p.x * p.y);",
      "      }",
      "",
      "      float noise(vec2 p) {",
      "        vec2 i = floor(p);",
      "        vec2 f = fract(p);",
      "        f = f * f * (3.0 - 2.0 * f);",
      "",
      "        float a = hash(i);",
      "        float b = hash(i + vec2(1.0, 0.0));",
      "        float c = hash(i + vec2(0.0, 1.0));",
      "        float d = hash(i + vec2(1.0, 1.0));",
      "",
      "        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);",
      "      }",
      "",
      "      float terrainHeight(float x, float z) {",
      "        float valley = smoothstep(0.0, 3.8, abs(x));",
      "        float n1 = noise(vec2(x * 0.75, z * 0.075));",
      "        float n2 = noise(vec2(x * 1.6 + 19.0, z * 0.16));",
      "        float n3 = sin(z * 0.055 + x * 0.7) * 0.28;",
      "        float ridge = pow(valley, 1.25) * (1.7 + n1 * 4.8 + n2 * 2.4 + n3);",
      "        float floorShape = (1.0 - valley) * (0.04 + noise(vec2(x * 0.35, z * 0.045)) * 0.07);",
      "        return ridge + floorShape;",
      "      }",
      "",
      "      mat3 rotX(float a) {",
      "        float s = sin(a), c = cos(a);",
      "        return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c);",
      "      }",
      "      mat3 rotY(float a) {",
      "        float s = sin(a), c = cos(a);",
      "        return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c);",
      "      }",
      "      mat3 rotZ(float a) {",
      "        float s = sin(a), c = cos(a);",
      "        return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0);",
      "      }",
      "",
      "      void main() {",
      "        float zWrapped = mod(aPosition.z + uScroll, uDepth);",
      "        float z = max(0.3, zWrapped);",
      "        float x = aPosition.x;",
      "        float y = terrainHeight(x, z);",
      "",
      "        vec3 pos = vec3(x, y, z);",
      "        pos.y -= uCameraHeight;",
      "",
      "        mat3 camera = rotZ(uRoll) * rotX(uPitch) * rotY(uYaw);",
      "        pos = camera * pos;",
      "",
      "        float fov = 1.25;",
      "        float depth = max(0.18, pos.z);",
      "        float aspect = uResolution.x / max(1.0, uResolution.y);",
      "",
      "        float nx = (pos.x / (depth * fov)) / aspect;",
      "        float ny = (pos.y / (depth * fov));",
      "",
      "        gl_Position = vec4(nx, ny, 0.5 + depth * 0.002, 1.0);",
      "",
      "        vDepth = depth;",
      "        vHeight = y;",
      "      }",
      "    "
    ].join("\n");

    const fragmentShaderSource = [
      "#version 300 es",
      "      precision highp float;",
      "",
      "      uniform vec3 uColor;",
      "      uniform bool uFill;",
      "      uniform float uDepth;",
      "",
      "      in float vDepth;",
      "      out vec4 outColor;",
      "",
      "      void main() {",
      "        float fade = 1.0 - smoothstep(uDepth * 0.32, uDepth * 0.98, vDepth);",
      "        if (uFill) {",
      "          outColor = vec4(0.0, 0.0, 0.0, 1.0);",
      "        } else {",
      "          float glow = 0.45 + fade * 0.9;",
      "          outColor = vec4(uColor * glow, 1.0);",
      "        }",
      "      }",
      "    "
    ].join("\n");

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Unable to create shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || "Shader compilation failed");
      }
      return shader;
    };

    const program = gl.createProgram();
    if (!program) throw new Error("Unable to create WebGL program");

    const vs = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "Program linking failed");
    }

    const gridX = 42;
    const gridZ = 132;
    const width = 18;
    const depth = 92;

    const positions: number[] = [];
    for (let z = 0; z < gridZ; z += 1) {
      const tz = z / (gridZ - 1);
      const worldZ = 0.6 + tz * depth;
      for (let x = 0; x < gridX; x += 1) {
        const tx = x / (gridX - 1);
        const worldX = (tx - 0.5) * width;
        positions.push(worldX, 0, worldZ);
      }
    }

    const vao = gl.createVertexArray();
    const positionBuffer = gl.createBuffer();
    if (!vao || !positionBuffer) throw new Error("Unable to create geometry");

    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

    const indexData: number[] = [];
    for (let z = 0; z < gridZ - 1; z += 1) {
      for (let x = 0; x < gridX - 1; x += 1) {
        const a = z * gridX + x;
        const b = a + 1;
        const c = a + gridX;
        const d = c + 1;
        indexData.push(a, c, b, b, c, d);
      }
    }

    const indexBuffer = gl.createBuffer();
    if (!indexBuffer) throw new Error("Unable to create index buffer");
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indexData), gl.STATIC_DRAW);

    const lineData: number[] = [];
    for (let z = 0; z < gridZ; z += 1) {
      for (let x = 0; x < gridX - 1; x += 1) {
        const a = z * gridX + x;
        lineData.push(a, a + 1);
      }
    }
    for (let x = 0; x < gridX; x += 1) {
      for (let z = 0; z < gridZ - 1; z += 1) {
        const a = z * gridX + x;
        lineData.push(a, a + gridX);
      }
    }

    const lineIndexBuffer = gl.createBuffer();
    if (!lineIndexBuffer) throw new Error("Unable to create line index buffer");
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lineIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(lineData), gl.STATIC_DRAW);

    const uTime = gl.getUniformLocation(program, "uTime");
    const uScroll = gl.getUniformLocation(program, "uScroll");
    const uDepth = gl.getUniformLocation(program, "uDepth");
    const uCameraHeight = gl.getUniformLocation(program, "uCameraHeight");
    const uPitch = gl.getUniformLocation(program, "uPitch");
    const uYaw = gl.getUniformLocation(program, "uYaw");
    const uRoll = gl.getUniformLocation(program, "uRoll");
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uColor = gl.getUniformLocation(program, "uColor");
    const uFill = gl.getUniformLocation(program, "uFill");

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    let last = performance.now();
    let scroll = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const pointerMove = (event: PointerEvent) => {
      pointer.tx = (event.clientX / window.innerWidth - 0.5);
      pointer.ty = (event.clientY / window.innerHeight - 0.5);
    };

    const draw = (now: number) => {
      const dt = Math.min(0.04, (now - last) / 1000);
      last = now;

      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 5.5);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 5.5);

      const idleSway = Math.sin(now * 0.00025) * 0.045;
      scroll = (scroll + dt * 17) % depth;

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LESS);
      gl.enable(gl.CULL_FACE);
      gl.cullFace(gl.BACK);
      gl.enable(gl.POLYGON_OFFSET_FILL);
      gl.polygonOffset(1, 1);

      gl.useProgram(program);
      gl.bindVertexArray(vao);

      gl.uniform1f(uTime, now * 0.001);
      gl.uniform1f(uScroll, scroll);
      gl.uniform1f(uDepth, depth);
      gl.uniform1f(uCameraHeight, 7.2);
      gl.uniform1f(uPitch, -0.18 + pointer.y * 0.11);
      gl.uniform1f(uYaw, pointer.x * -0.15 + idleSway);
      gl.uniform1f(uRoll, pointer.x * 0.08);
      gl.uniform2f(uResolution, canvas.clientWidth, canvas.clientHeight);

      // Terrain body pass: background-colored triangles write depth,
      // creating the hidden-line/occlusion behavior of the original visual.
      gl.uniform3f(uColor, 0.0, 0.0, 0.0);
      gl.uniform1i(uFill, 1);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.drawElements(gl.TRIANGLES, indexData.length, gl.UNSIGNED_INT, 0);
      gl.disable(gl.POLYGON_OFFSET_FILL);

      // Wire pass.
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.uniform3f(uColor, 0.694, 0.169, 0.0);
      gl.uniform1i(uFill, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lineIndexBuffer);
      gl.lineWidth(1);
      gl.drawElements(gl.LINES, lineData.length, gl.UNSIGNED_INT, 0);

      gl.disable(gl.BLEND);

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", pointerMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointerMove);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteBuffer(lineIndexBuffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
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
        <div className="terrainSun" aria-hidden="true" />
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
