"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Copy, Mail, MoveUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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


function InteractiveMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const vertex = `#version 300 es
      precision highp float;
      layout(location=0) in vec2 aPosition;

      uniform float uTime;
      uniform float uScroll;
      uniform float uScene;
      uniform vec2 uPointer;
      uniform vec2 uResolution;
      uniform float uLayer;
      uniform float uPointPass;

      out float vGlow;
      out float vDepth;
      out float vScene;

      float hash(vec2 p){
        p = fract(p * vec2(127.1,311.7));
        p += dot(p,p + 34.7);
        return fract(p.x*p.y);
      }

      float noise(vec2 p){
        vec2 i=floor(p);
        vec2 f=fract(p);
        f=f*f*(3.0-2.0*f);
        float a=hash(i);
        float b=hash(i+vec2(1.0,0.0));
        float c=hash(i+vec2(0.0,1.0));
        float d=hash(i+vec2(1.0,1.0));
        return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
      }

      void main(){
        vec2 p=aPosition;
        float t=uTime*0.00022;
        float s=uScene;

        float n=noise(p*2.5 + vec2(t*1.4,-t*.8));
        float n2=noise(p*5.3 + vec2(-t*.7,t*1.1));

        float ripple=sin(length(p)*7.0 - t*7.0 + n*3.0);
        float folds=sin((p.x*2.4-p.y*3.1)*(3.0+s*.8)+t*4.0);
        float cross=cos((p.x+p.y*1.7)*5.0-t*2.6);
        float wave=mix(ripple,folds,clamp(s/3.0,0.0,1.0));
        wave += cross*.22 + n2*.34;

        float d=distance(p,uPointer);
        float force=exp(-d*d*5.0);
        vec2 dir=normalize(p-uPointer+vec2(.0001));
        p += dir * force * (.075 + s*.018);
        p.y += wave*(.035 + uLayer*.018) + sin(p.x*8.0+t*3.0)*.018;

        float depth=.22+n*.65+wave*.06;
        float perspective=1.0/(1.0+depth*(.22+uLayer*.09));
        vec2 q=p*perspective;
        float aspect=uResolution.x/max(1.0,uResolution.y);
        q.x/=aspect;

        float drift=sin(t*1.8+s)*.022;
        q.x += drift*(.7-uLayer*.25);
        q.y += sin(t*1.35+s*1.7)*.012;

        gl_Position=vec4(q,0.0,1.0);
        gl_PointSize=1.3+force*5.0+uLayer*.35;
        vGlow=force;
        vDepth=depth;
        vScene=s;
      }
    `;

    const fragment = `#version 300 es
      precision highp float;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform float uPointPass;
      in float vGlow;
      in float vDepth;
      in float vScene;
      out vec4 outColor;

      void main(){
        vec3 c=mix(uColorA,uColorB,clamp(vDepth*.75,0.0,1.0));
        float alpha=.10+(1.0-vDepth)*.42+vGlow*1.8;

        if(uPointPass>.5){
          float d=distance(gl_PointCoord,vec2(.5));
          float soft=smoothstep(.5,.05,d);
          outColor=vec4(c*(1.0+vGlow*4.0),soft*(.2+vGlow*1.5));
        }else{
          outColor=vec4(c*(1.0+vGlow*2.1),alpha);
        }
      }
    `;

    const compile=(type:number,source:string)=>{
      const shader=gl.createShader(type);
      if(!shader) throw new Error("shader");
      gl.shaderSource(shader,source);
      gl.compileShader(shader);
      if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
        throw new Error(gl.getShaderInfoLog(shader)||"compile");
      }
      return shader;
    };

    const program=gl.createProgram();
    if(!program) return;
    const vs=compile(gl.VERTEX_SHADER,vertex);
    const fs=compile(gl.FRAGMENT_SHADER,fragment);
    gl.attachShader(program,vs);
    gl.attachShader(program,fs);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)) return;

    const size=52;
    const positions:number[]=[];
    const lines:number[]=[];
    for(let y=0;y<size;y++){
      for(let x=0;x<size;x++){
        positions.push((x/(size-1)-.5)*2,(y/(size-1)-.5)*2);
      }
    }
    for(let y=0;y<size;y++){
      for(let x=0;x<size-1;x++){ const a=y*size+x; lines.push(a,a+1); }
    }
    for(let x=0;x<size;x++){
      for(let y=0;y<size-1;y++){ const a=y*size+x; lines.push(a,a+size); }
    }

    const vao=gl.createVertexArray();
    const vbo=gl.createBuffer();
    const ebo=gl.createBuffer();
    if(!vao||!vbo||!ebo) return;

    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions),gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ebo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(lines),gl.STATIC_DRAW);

    const uTime=gl.getUniformLocation(program,"uTime");
    const uScroll=gl.getUniformLocation(program,"uScroll");
    const uScene=gl.getUniformLocation(program,"uScene");
    const uPointer=gl.getUniformLocation(program,"uPointer");
    const uResolution=gl.getUniformLocation(program,"uResolution");
    const uLayer=gl.getUniformLocation(program,"uLayer");
    const uPointPass=gl.getUniformLocation(program,"uPointPass");
    const uColorA=gl.getUniformLocation(program,"uColorA");
    const uColorB=gl.getUniformLocation(program,"uColorB");

    const pointer={x:0,y:0,tx:0,ty:0};
    const scroll={value:0,target:0};
    const scene={value:0,target:0};
    let raf=0;
    let last=performance.now();

    const palette=[
      [1.0,.22,.04],[.18,.65,1.0],
      [.30,.92,.49],[.78,.47,1.0],[.98,.34,.65]
    ];

    const resize=()=>{
      const dpr=Math.min(window.devicePixelRatio||1,1.5);
      canvas.width=Math.max(1,Math.floor(innerWidth*dpr));
      canvas.height=Math.max(1,Math.floor(innerHeight*dpr));
      gl.viewport(0,0,canvas.width,canvas.height);
    };
    const move=(ev:PointerEvent)=>{
      pointer.tx=(ev.clientX/innerWidth-.5)*2;
      pointer.ty=(.5-ev.clientY/innerHeight)*2;
    };
    const onScroll=()=>{
      const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
      scroll.target=scrollY/max;
    };
    const onScene=(ev:Event)=>{
      const custom=ev as CustomEvent<number>;
      scene.target=Number.isFinite(custom.detail)?custom.detail:0;
    };

    const draw=(now:number)=>{
      const dt=Math.min(.05,(now-last)/1000);
      last=now;
      pointer.x+=(pointer.tx-pointer.x)*Math.min(1,dt*4.8);
      pointer.y+=(pointer.ty-pointer.y)*Math.min(1,dt*4.8);
      scroll.value+=(scroll.target-scroll.value)*Math.min(1,dt*2.8);
      scene.value+=(scene.target-scene.value)*Math.min(1,dt*2.4);

      const index=Math.floor(scene.value)%palette.length;
      const next=(index+1)%palette.length;
      const mixV=scene.value-index;
      const a=palette[index], b=palette[next];

      gl.clearColor(0,0,0,0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(program);
      gl.bindVertexArray(vao);
      gl.uniform1f(uTime,now);
      gl.uniform1f(uScroll,scroll.value);
      gl.uniform1f(uScene,scene.value);
      gl.uniform2f(uPointer,pointer.x,pointer.y);
      gl.uniform2f(uResolution,canvas.width,canvas.height);

      for(let layer=0;layer<3;layer++){
        gl.uniform1f(uLayer,layer);
        gl.uniform1f(uPointPass,0);
        gl.uniform3f(uColorA,a[0],a[1],a[2]);
        gl.uniform3f(uColorB,b[0],b[1],b[2]);
        gl.uniform1f(uScene,scene.value+mixV*.15);
        gl.drawElements(gl.LINES,lines.length,gl.UNSIGNED_INT,0);
      }

      gl.uniform1f(uLayer,.5);
      gl.uniform1f(uPointPass,1);
      gl.uniform3f(uColorA,1,.28,.08);
      gl.uniform3f(uColorB,1,.65,.25);
      gl.drawArrays(gl.POINTS,0,positions.length/2);

      raf=requestAnimationFrame(draw);
    };

    resize();
    onScroll();
    window.addEventListener("resize",resize);
    window.addEventListener("pointermove",move,{passive:true});
    window.addEventListener("scroll",onScroll,{passive:true});
    window.addEventListener("portfolio:scene",onScene as EventListener);
    raf=requestAnimationFrame(draw);

    return()=>{
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",resize);
      window.removeEventListener("pointermove",move);
      window.removeEventListener("scroll",onScroll);
      window.removeEventListener("portfolio:scene",onScene as EventListener);
      gl.deleteBuffer(vbo);
      gl.deleteBuffer(ebo);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  },[]);

  return <canvas className="interactiveMesh" ref={canvasRef} aria-hidden="true" />;
}

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
        <div className="carTopline"><span>PRICE MODEL</span><span>REGRESSION</span></div>
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
        <div className="priceLabel">PREDICTION <b>PRICE ESTIMATE</b></div>
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
        <div className="irisMetric"><span>CLASSIFIER</span><strong>KNN</strong></div>
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
      <div className="trendData"><span>METHOD</span><b>EDA</b><span>MODEL</span><b>LINEAR</b></div>
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
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.84,
      syncTouch: true,
      respectReducedMotion: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time:number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const root=document.documentElement;
    const onMove=(event:PointerEvent)=>{
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove",onMove,{passive:true});

    const sections=Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    const sectionMap:Record<string,number>={top:0,works:1,about:2,skills:3,contact:4};
    const sceneObservers=sections.map((section)=>{
      const io=new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
          if(entry.isIntersecting){
            const scene=sectionMap[section.id] ?? 3;
            window.dispatchEvent(new CustomEvent("portfolio:scene",{detail:scene}));
          }
        });
      },{threshold:.3});
      io.observe(section);
      return io;
    });

    const ctx=gsap.context(()=>{
      if(!reduce){
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el)=>{
          if (el.closest(".heroTitle")) return;
          const delay = Number.parseInt(el.style.getPropertyValue("--delay")) || 0;
          gsap.fromTo(el,
            { y: 55, opacity: 0, filter: "blur(8px)" },
            {
              y: 0, opacity: 1, filter: "blur(0px)",
              duration: .9, delay: delay / 1000,
              ease: "expo.out",
              scrollTrigger: {
                trigger: el,
                start: "top 91%",
                once: true
              }
            }
          );
        });

        gsap.utils.toArray<HTMLElement>(".heroTitle .reveal").forEach((el,i)=>{
          gsap.fromTo(el,{yPercent:110,opacity:0},{yPercent:0,opacity:1,duration:1.05,delay:.08+i*.10,ease:"expo.out"});
        });

        gsap.to(".heroTitleWrap",{yPercent:11,rotateX:2,scrollTrigger:{
          trigger:".heroStage",start:"top top",end:"bottom top",scrub:1.2
        }});

        gsap.utils.toArray<HTMLElement>(".sectionHead h2").forEach((el)=>{
          gsap.fromTo(el,{y:90,rotate:1.5,opacity:0},{
            y:0,rotate:0,opacity:1,duration:1.15,ease:"expo.out",
            scrollTrigger:{trigger:el,start:"top 88%",once:true}
          });
        });

        gsap.utils.toArray<HTMLElement>(".aboutLead,.aboutCopy,.selectedVisual,.contactBig,.socialGrid").forEach((el,i)=>{
          gsap.fromTo(el,{y:70,opacity:0,filter:"blur(8px)"},{
            y:0,opacity:1,filter:"blur(0px)",duration:.95,delay:i*.035,ease:"power3.out",
            scrollTrigger:{trigger:el,start:"top 88%",once:true}
          });
        });

        gsap.utils.toArray<HTMLElement>(".projectVisual").forEach((el)=>{
          gsap.to(el,{yPercent:-5,scrollTrigger:{trigger:el, start:"top bottom",end:"bottom top",scrub:1.4}});
        });

        gsap.utils.toArray<HTMLElement>(".skillWall > .reveal").forEach((el,i)=>{
          gsap.fromTo(el,{y:35,rotate: i%2?-2:2,opacity:0},{
            y:0,rotate:0,opacity:1,duration:.7,delay:(i%6)*.045,ease:"back.out(1.5)",
            scrollTrigger:{trigger:el,start:"top 92%",once:true}
          });
        });

        gsap.to(".contactSection",{backgroundPosition:"50% 20%",scrollTrigger:{
          trigger:".contactSection",start:"top bottom",end:"bottom top",scrub:1.2
        }});
      } else {
        gsap.set(".reveal,.sectionHead h2,.aboutLead,.aboutCopy,.selectedVisual,.contactBig,.socialGrid",{
          opacity:1,y:0,filter:"none"
        });
      }
    });

    ScrollTrigger.refresh();

    const onScroll=()=>{
      const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
      root.style.setProperty("--scroll-progress",`${scrollY/max}`);
    };
    window.addEventListener("scroll",onScroll,{passive:true});
    onScroll();

    return()=>{
      ctx.revert();
      sceneObservers.forEach((io)=>io.disconnect());
      window.removeEventListener("pointermove",onMove);
      window.removeEventListener("scroll",onScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  },[]);

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
      <InteractiveMesh />
      <div className="ambientOrbs" aria-hidden="true"><span/><span/><span/></div>
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
          <a href="#skills">Skills</a>
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
                event.currentTarget.style.setProperty("--px", `${x * 18}px`);
                event.currentTarget.style.setProperty("--py", `${y * 18}px`);
              }}
              onPointerLeave={(event) => {
                event.currentTarget.style.setProperty("--tilt-x", "0deg");
                event.currentTarget.style.setProperty("--tilt-y", "0deg");
                event.currentTarget.style.setProperty("--px", "0px");
                event.currentTarget.style.setProperty("--py", "0px");
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

      <section id="skills" className="skillsSection sectionShell">
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
