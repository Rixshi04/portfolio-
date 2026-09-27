"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, BrainCircuit, Code2, Database, ExternalLink } from "lucide-react";

const projects = [
  {title:"SketchMaster",tag:"AI / Computer Vision",desc:"AI-driven sketch-to-code system that interprets hand-drawn UI sketches and generates usable HTML/CSS with live preview and UX validation.",stack:"Next.js · TypeScript · FastAPI · Python · ML"},
  {title:"Deep Fake Video & Audio Detector",tag:"Deep Learning",desc:"Multimodal deepfake detection project combining CNN and LSTM approaches for video and audio analysis.",stack:"Python · CNN · LSTM · TensorFlow / PyTorch"},
  {title:"Integrated Flight Safety & Risk Analysis",tag:"Machine Learning",desc:"Risk-analysis application using classification models and dashboards to surface flight-safety patterns and predictions.",stack:"Python · Random Forest · Logistic Regression"},
  {title:"Disaster Management Drone Automation",tag:"Computer Vision",desc:"Offline-first drone analytics concept for GPS-free visual mapping and flood detection in low-connectivity disaster zones.",stack:"Python · Computer Vision · CNN · Edge Analytics"}
];

const skills = ["Python","Java","SQL","Machine Learning","Computer Vision","PyTorch","TensorFlow","FastAPI","Flask","Next.js","TypeScript","React","Tailwind CSS","Postman","Pytest","Selenium","AWS","Docker","Git"];

function CloudSky(){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const c=ref.current;if(!c)return;
    const ctx=c.getContext("2d");if(!ctx)return;
    let raf=0,t=0;
    const resize=()=>{const d=Math.min(devicePixelRatio||1,2),r=c.getBoundingClientRect();c.width=r.width*d;c.height=r.height*d;ctx.setTransform(d,0,0,d,0,0)};
    resize();addEventListener("resize",resize);
    const draw=()=>{
      t+=.003;const w=c.clientWidth,h=c.clientHeight;
      const g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,"#081a38");g.addColorStop(.5,"#174a85");g.addColorStop(1,"#8fc7f5");ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
      const sx=w*.82,sy=h*.18,sg=ctx.createRadialGradient(sx,sy,0,sx,sy,w*.22);sg.addColorStop(0,"rgba(255,255,255,.9)");sg.addColorStop(1,"rgba(255,255,255,0)");ctx.fillStyle=sg;ctx.fillRect(0,0,w,h);
      for(let layer=0;layer<3;layer++){ctx.fillStyle=layer===0?"rgba(255,255,255,.16)":layer===1?"rgba(255,255,255,.25)":"rgba(255,255,255,.4)";for(let i=0;i<16;i++){const x=((i*137-layer*180+w+(t*(20+layer*15)))%(w+300))-150;const y=h*(.2+layer*.18)+(i%4)*22;const rx=90+(i%3)*35;ctx.beginPath();ctx.ellipse(x,y,rx,35+(i%3)*12,0,0,Math.PI*2);ctx.fill()}}
      raf=requestAnimationFrame(draw);
    };draw();return()=>{cancelAnimationFrame(raf);removeEventListener("resize",resize)}
  },[]);
  return <canvas ref={ref} className="cloud"/>;
}

export default function Home(){
  return <main>
    <nav><a className="brand" href="#top">RK<span>.</span></a><div className="navlinks"><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div><a className="navbtn" href="mailto:your-email@example.com">Let&apos;s talk <ArrowUpRight size={15}/></a></nav>

    <section id="top" className="hero"><CloudSky/><div className="heroShade"/>
      <div className="heroContent"><div className="eyebrow">AI / ML ENGINEER · SOFTWARE DEVELOPER</div>
        <h1>Building intelligent<br/><em>systems that matter.</em></h1>
        <p>I&apos;m Rishi Kumar, a Computer Science graduate focused on machine learning, computer vision, data-driven applications, and practical software engineering.</p>
        <div className="actions"><a className="primary" href="#projects">Explore my work <ArrowUpRight size={17}/></a><a className="secondary" href="#contact"><Mail size={16}/> Get in touch</a></div>
        <div className="socials"><a href="https://github.com/Rixshi04" target="_blank" rel="noreferrer"><Github size={18}/></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={18}/></a></div>
      </div><div className="scroll">SCROLL TO EXPLORE ↓</div>
    </section>

    <section id="about" className="section about"><div className="sectionLabel">01 / ABOUT</div><div><h2>From ideas to <span>working products.</span></h2><p>I enjoy taking problems from a rough idea to a working prototype — designing the data pipeline, building the model, creating the API, and shaping the user experience around it.</p><p>My work spans ML, computer vision, backend APIs, modern web development, testing, and cloud fundamentals. I care about clean implementation, measurable results, and software that people can actually use.</p><div className="stats"><div><strong>4+</strong><small>AI / ML Projects</small></div><div><strong>10+</strong><small>Core Technologies</small></div><div><strong>∞</strong><small>Curiosity to learn</small></div></div></div></section>

    <section id="skills" className="section skills"><div className="sectionLabel">02 / TOOLKIT</div><div><h2>Tools I use to <span>build.</span></h2><div className="skillGrid">{skills.map((s,i)=><div className="skill" key={s}><span>{String(i+1).padStart(2,"0")}</span>{s}</div>)}</div></div></section>

    <section id="projects" className="section projects"><div className="sectionLabel">03 / SELECTED WORK</div><div><h2>Projects with a <span>purpose.</span></h2><div className="projectGrid">{projects.map((p,i)=><article className="project" key={p.title}><div className="projectTop"><span>{String(i+1).padStart(2,"0")}</span><a href="https://github.com/Rixshi04" target="_blank" rel="noreferrer"><ExternalLink size={17}/></a></div><div className="icon"><BrainCircuit size={22}/></div><div className="tag">{p.tag}</div><h3>{p.title}</h3><p>{p.desc}</p><small>{p.stack}</small></article>)}</div></div></section>

    <section className="section experience"><div className="sectionLabel">04 / APPROACH</div><div className="approach"><h2>Engineering with <span>intent.</span></h2><div className="approachGrid"><div><Code2/><h3>Build</h3><p>Turn requirements into maintainable applications and APIs.</p></div><div><Database/><h3>Validate</h3><p>Use data, testing, and evaluation to understand what works.</p></div><div><BrainCircuit/><h3>Improve</h3><p>Iterate quickly, learn new tools, and refine the product.</p></div></div></div></section>

    <section id="contact" className="contact"><div className="sectionLabel">05 / CONTACT</div><div><h2>Have a problem worth <em>solving?</em></h2><p>I&apos;m open to entry-level opportunities in AI/ML, software engineering, data, and QA automation.</p><a className="primary" href="mailto:your-email@example.com">Start a conversation <ArrowUpRight size={17}/></a></div></section>

    <footer><span>© 2026 Rishi Kumar</span><span>Built with Next.js · Designed for humans.</span><a href="#top">Back to top ↑</a></footer>
  </main>
}