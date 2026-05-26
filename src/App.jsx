import { useState, useEffect, useRef } from "react";

const steps = [
  { n: "01", name: "Map", desc: "Define the actual rules — not what people think they are, what they are." },
  { n: "02", name: "Fail", desc: "Find where and why the process breaks. The failure mode is always the real problem." },
  { n: "03", name: "Fit", desc: "Match the solution to the tools and people already in place." },
  { n: "04", name: "Separate", desc: "Distinguish intake from output. Most process debt lives in this confusion." },
  { n: "05", name: "Backend", desc: "Surface where the knowledge actually lives — usually in someone's head." },
  { n: "06", name: "Own", desc: "Build buy-in. A solution nobody owns is a solution that won't last." },
  { n: "07", name: "Extend", desc: "Define what becomes possible once the immediate problem is solved." },
];

const useCases = [
  {
    sector: "Operations",
    title: "When the process lives in one person's head",
    desc: "An FBDI template built in one week eliminated $200K+ in manual processing costs. The process existed — it just wasn't documented, automated, or transferable.",
    tag: "Process Automation",
  },
  {
    sector: "Creative Business",
    title: "When growth is blocked by invisible friction",
    desc: "An art business limited to one auction submission per cycle because the process was too labor intensive. Systematized submission workflow, direct collector channel, and service booking — unlocking scale.",
    tag: "Business Modernization",
  },
  {
    sector: "Team Development",
    title: "When knowledge walks out the door",
    desc: "A technical team with no succession plan and no documentation. Structured knowledge transfer, governance framework, and 90-day development plans for each team member.",
    tag: "Knowledge Transfer",
  },
  {
    sector: "Municipal",
    title: "When manual processes meet compliance requirements",
    desc: "Government and healthcare workflows are notoriously manual. We map the rules, find the gaps, and build solutions that meet compliance requirements without enterprise vendor price tags.",
    tag: "Government & Healthcare",
  },
];

const stats = [
  { value: 200, suffix: "K+", label: "In documented cost savings from a single engagement" },
  { value: 7, suffix: "", label: "Step framework applied across every industry" },
  { value: 90, suffix: "%", label: "Of process problems trace back to undocumented knowledge" },
  { value: 3, suffix: "x", label: "Average ROI on first year engagements" },
];

function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, y = 24, style = {} }) {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function AnimatedStat({ value, suffix, label, delay = 0 }) {
  const [ref, v] = useReveal();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!v) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [v, value]);
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : "translateY(20px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      padding: "32px 28px",
      borderLeft: "1px solid var(--pm-border)",
    }}>
      <div style={{
        fontFamily: "var(--pm-serif)", fontSize: 52, fontWeight: 300,
        color: "var(--pm-gold)", lineHeight: 1, marginBottom: 12,
        letterSpacing: "-0.02em",
      }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 13, color: "var(--pm-muted)", lineHeight: 1.6, fontWeight: 300 }}>
        {label}
      </div>
    </div>
  );
}

function StepRow({ s, index }) {
  const [hov, setHov] = useState(false);
  const [ref, v] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0, transform: v ? "none" : "translateY(14px)",
      transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.55s ease ${index * 0.07}s`,
    }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "grid", gridTemplateColumns: "60px 160px 1fr",
          gap: 32, padding: "24px 0", cursor: "default",
          borderBottom: "1px solid var(--pm-border)",
        }}
      >
        <div style={{
          fontFamily: "var(--pm-mono)", fontSize: 11,
          color: hov ? "var(--pm-gold)" : "var(--pm-muted)",
          letterSpacing: "0.1em", paddingTop: 3,
          transition: "color 0.2s",
        }}>{s.n}</div>
        <div style={{
          fontFamily: "var(--pm-serif)", fontSize: 20, fontWeight: 600,
          color: hov ? "var(--pm-gold)" : "var(--pm-text)",
          transition: "color 0.2s", letterSpacing: "0.01em",
        }}>{s.name}</div>
        <div style={{ fontSize: 14, color: "var(--pm-muted)", lineHeight: 1.7, fontWeight: 300 }}>
          {s.desc}
        </div>
      </div>
    </div>
  );
}

function UseCaseCard({ c, index }) {
  const [hov, setHov] = useState(false);
  const [ref, v] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)",
      transition: `opacity 0.6s ease ${(index % 2) * 0.1}s, transform 0.6s ease ${(index % 2) * 0.1}s`,
    }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding: "32px 28px",
          background: hov ? "var(--pm-surface-hover)" : "var(--pm-surface)",
          border: `1px solid ${hov ? "var(--pm-gold-dim)" : "var(--pm-border)"}`,
          transition: "all 0.2s ease",
          height: "100%",
        }}
      >
        <div style={{
          fontSize: 10, color: "var(--pm-gold)", fontFamily: "var(--pm-mono)",
          letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 16,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ display: "block", width: 20, height: 1, background: "var(--pm-gold)" }} />
          {c.sector}
        </div>
        <div style={{
          fontFamily: "var(--pm-serif)", fontSize: 20, fontWeight: 600,
          color: "var(--pm-text)", lineHeight: 1.3, marginBottom: 16,
          letterSpacing: "-0.01em",
        }}>{c.title}</div>
        <div style={{ fontSize: 14, color: "var(--pm-muted)", lineHeight: 1.75, fontWeight: 300, marginBottom: 20 }}>
          {c.desc}
        </div>
        <div style={{
          display: "inline-block", fontSize: 10, color: "var(--pm-gold)",
          border: "1px solid var(--pm-gold-dim)", padding: "4px 12px",
          fontFamily: "var(--pm-mono)", letterSpacing: "0.08em",
        }}>{c.tag}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: "var(--pm-bg)", minHeight: "100vh", color: "var(--pm-text)", fontFamily: "var(--pm-body)" }}>
      <style>{`
        :root {
          --pm-bg:           #0A0C12;
          --pm-surface:      #0F1219;
          --pm-surface-hover:#141820;
          --pm-dark:         #060809;
          --pm-text:         #E8E6E0;
          --pm-text-mid:     #B8B4AC;
          --pm-muted:        #6A6860;
          --pm-gold:         #C4A962;
          --pm-gold-dim:     #C4A96244;
          --pm-gold-light:   #D4BC78;
          --pm-border:       #1E2230;
          --pm-border-mid:   #2A2E40;
          --pm-serif:        'Cormorant Garamond', Georgia, serif;
          --pm-body:         'DM Sans', system-ui, sans-serif;
          --pm-mono:         'DM Mono', monospace;
        }

        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: var(--pm-bg); }
        ::-webkit-scrollbar-thumb { background: var(--pm-border-mid); }

        .sec { max-width: 1080px; margin: 0 auto; padding: 0 48px; }

        .nb { font-size: 11px; color: var(--pm-muted); cursor: pointer; background: none; border: none; font-family: var(--pm-mono); letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.15s; padding: 0; }
        .nb:hover { color: var(--pm-text); }

        .bp { background: var(--pm-gold); color: #0A0C12; border: none; padding: 14px 32px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; font-family: var(--pm-mono); font-weight: 500; transition: background 0.2s, transform 0.15s; }
        .bp:hover { background: var(--pm-gold-light); transform: translateY(-1px); }

        .bg { background: transparent; color: var(--pm-text); border: 1px solid var(--pm-border-mid); padding: 14px 32px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; font-family: var(--pm-mono); transition: border-color 0.2s, transform 0.15s; }
        .bg:hover { border-color: var(--pm-gold-dim); transform: translateY(-1px); }

        .el { font-size: 10px; color: var(--pm-gold); font-family: var(--pm-mono); letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
        .el::before { content: ''; display: block; width: 28px; height: 1px; background: var(--pm-gold); }

        .marquee-wrap { overflow: hidden; border-top: 1px solid var(--pm-border); border-bottom: 1px solid var(--pm-border); padding: 14px 0; }
        .marquee-track { display: flex; gap: 0; animation: marquee 28s linear infinite; width: max-content; }
        .marquee-item { font-family: var(--pm-mono); font-size: 11px; color: var(--pm-muted); letter-spacing: 0.12em; text-transform: uppercase; padding: 0 40px; white-space: nowrap; }
        .marquee-dot { color: var(--pm-gold); margin: 0 4px; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        @keyframes fU { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fI { from { opacity:0; } to { opacity:1; } }

        .noise { position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); background-size: 200px 200px; }

        @media (max-width: 720px) {
          .sec { padding: 0 24px; }
          .h1 { font-size: clamp(52px, 12vw, 80px) !important; }
          .tc { grid-template-columns: 1fr !important; gap: 48px !important; }
          .gc { grid-template-columns: 1fr !important; }
          .sg { grid-template-columns: repeat(2,1fr) !important; }
          .nl { display: none !important; }
        }
      `}</style>

      <div className="noise" />

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,12,18,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--pm-border)" : "1px solid transparent",
        transition: "all 0.3s ease",
        padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68,
      }}>
        <div onClick={() => go("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "var(--pm-bg)",
            border: "1.5px solid var(--pm-gold)",
            boxShadow: "0 0 0 1px var(--pm-bg), 0 0 0 3px var(--pm-gold-dim)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 11, fontWeight: 700, color: "var(--pm-text)", letterSpacing: "-0.5px" }}>mws</span>
          </div>
          <div>
            <div style={{ fontFamily: "var(--pm-serif)", fontWeight: 600, fontSize: 16, letterSpacing: "0.04em", color: "var(--pm-text)", lineHeight: 1 }}>
              ProcessMind
            </div>
            <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--pm-gold)", textTransform: "uppercase", fontFamily: "var(--pm-mono)", marginTop: 2 }}>
              LLC
            </div>
          </div>
        </div>

        <div className="nl" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["framework", "work", "about", "contact"].map(id => (
            <button key={id} className="nb" onClick={() => go(id)}>{id}</button>
          ))}
          <button className="bp" style={{ padding: "9px 22px", fontSize: 10 }} onClick={() => go("contact")}>
            Book a call
          </button>
        </div>
      </nav>

      <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 48px 80px", position: "relative", overflow: "hidden", zIndex: 1 }}>
        <div style={{
          position: "absolute", top: "50%", right: -100,
          transform: "translateY(-50%)",
          width: 500, height: 500,
          border: "1px solid var(--pm-border)",
          borderRadius: "50%",
          opacity: 0, animation: "fI 1.5s ease 0.5s forwards",
        }} />
        <div style={{
          position: "absolute", top: "50%", right: -60,
          transform: "translateY(-50%)",
          width: 400, height: 400,
          border: "1px solid var(--pm-gold-dim)",
          borderRadius: "50%",
          opacity: 0, animation: "fI 1.5s ease 0.7s forwards",
        }} />

        <div className="sec" style={{ padding: 0, position: "relative", zIndex: 1 }}>
          <div style={{ opacity: 0, animation: "fU 0.8s ease 0.1s forwards", marginBottom: 24 }}>
            <div className="el">Process consulting · AI-enabled solutions · mysterwolf studios</div>
          </div>

          <div style={{ opacity: 0, animation: "fU 0.9s ease 0.2s forwards" }}>
            <h1 className="h1" style={{
              fontFamily: "var(--pm-serif)", fontWeight: 300,
              fontSize: "clamp(56px, 7.5vw, 96px)",
              lineHeight: 1.0, letterSpacing: "-0.03em",
              color: "var(--pm-text)", maxWidth: 820, marginBottom: 36,
            }}>
              Every broken process<br />
              has a solution.<br />
              <em style={{ fontStyle: "italic", color: "var(--pm-gold)" }}>We find both.</em>
            </h1>
          </div>

          <div style={{ opacity: 0, animation: "fU 0.8s ease 0.36s forwards", marginBottom: 48 }}>
            <p style={{ fontSize: 17, color: "var(--pm-muted)", maxWidth: 520, lineHeight: 1.8, fontWeight: 300 }}>
              We walk in, map what's broken, and build the fix. Enterprise-grade process consulting and AI-enabled solutions — without the enterprise price tag.
            </p>
          </div>

          <div style={{ opacity: 0, animation: "fU 0.8s ease 0.46s forwards", display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="bp" onClick={() => go("contact")}>Book a discovery call</button>
            <button className="bg" onClick={() => go("framework")}>See the framework</button>
          </div>
        </div>
      </section>

      <div className="marquee-wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, ri) =>
            steps.map((s, i) => (
              <span key={`${ri}-${i}`} className="marquee-item">
                {s.name}<span className="marquee-dot">·</span>
              </span>
            ))
          )}
        </div>
      </div>

      <section style={{ padding: "96px 0", position: "relative", zIndex: 1 }}>
        <div className="sec">
          <div className="sg" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
            {stats.map((s, i) => (
              <AnimatedStat key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <section id="framework" style={{ padding: "96px 0", background: "var(--pm-dark)", position: "relative", zIndex: 1 }}>
        <div className="sec">
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
              <div>
                <div className="el">The methodology</div>
                <h2 style={{ fontFamily: "var(--pm-serif)", fontWeight: 300, fontSize: 44, letterSpacing: "-0.02em", color: "var(--pm-text)", lineHeight: 1 }}>
                  The Seven Steps
                </h2>
              </div>
              <p style={{ fontSize: 14, color: "var(--pm-muted)", maxWidth: 360, lineHeight: 1.7, fontWeight: 300, alignSelf: "flex-end" }}>
                Every engagement runs through this framework. The order matters. Skipping steps is how process consultants create new problems instead of solving old ones.
              </p>
            </div>
          </Reveal>

          <div style={{ borderTop: "1px solid var(--pm-border)" }}>
            {steps.map((s, i) => <StepRow key={s.n} s={s} index={i} />)}
          </div>
        </div>
      </section>

      <section id="work" style={{ padding: "96px 0", position: "relative", zIndex: 1 }}>
        <div className="sec">
          <Reveal>
            <div style={{ marginBottom: 56 }}>
              <div className="el">Where we work</div>
              <h2 style={{ fontFamily: "var(--pm-serif)", fontWeight: 300, fontSize: 44, letterSpacing: "-0.02em", color: "var(--pm-text)", lineHeight: 1, marginBottom: 16 }}>
                Use Cases
              </h2>
              <p style={{ fontSize: 15, color: "var(--pm-muted)", maxWidth: 520, lineHeight: 1.75, fontWeight: 300 }}>
                The framework applies to any industry where a process exists, knowledge lives in someone's head, and the cost of doing nothing is real.
              </p>
            </div>
          </Reveal>

          <div className="gc" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--pm-border)" }}>
            {useCases.map((c, i) => (
              <UseCaseCard key={c.title} c={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" style={{ padding: "96px 0", background: "var(--pm-dark)", position: "relative", zIndex: 1 }}>
        <div className="sec">
          <div className="tc" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <Reveal>
              <div className="el">About</div>
              <h2 style={{ fontFamily: "var(--pm-serif)", fontWeight: 300, fontSize: 42, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 28 }}>
                We walk in.<br />
                We figure it out.<br />
                <em style={{ fontStyle: "italic", color: "var(--pm-gold)" }}>We fix it.</em>
              </h2>
              <p style={{ color: "var(--pm-muted)", lineHeight: 1.85, fontSize: 15, fontWeight: 300, marginBottom: 20 }}>
                ProcessMind LLC is a process consulting and AI-enabled solutions firm. We apply a proven seven-step methodology to any organization where broken processes are costing time, money, or knowledge. Finance, healthcare, legal, creative — the framework works across all of them.
              </p>
              <p style={{ color: "var(--pm-muted)", lineHeight: 1.85, fontSize: 15, fontWeight: 300, marginBottom: 36 }}>
                We are not a large consulting firm. We do not bring a team of analysts to bill you for weeks of discovery. We come in, extract what we need, and deliver a solution. The engagement is focused, the output is real, and the price reflects the value — not the headcount.
              </p>
              <button className="bp" onClick={() => go("contact")}>Book a discovery call</button>
            </Reveal>

            <Reveal delay={0.15}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--pm-border)" }}>
                {[
                  ["Approach", "Seven-step framework applied to every engagement"],
                  ["Deliverable", "Interactive audit report + actionable roadmap"],
                  ["Discovery", "$3,000 – $5,000 flat"],
                  ["Build engagement", "$10,000 – $25,000 scoped"],
                  ["Ongoing retainer", "$500 – $1,500 / month"],
                  ["Industries", "Finance, healthcare, legal, operations, creative business"],
                ].map(([l, v]) => (
                  <div key={l} style={{ background: "var(--pm-surface)", padding: "18px 24px", display: "flex", gap: 24, alignItems: "baseline" }}>
                    <div style={{ fontSize: 10, color: "var(--pm-muted)", fontFamily: "var(--pm-mono)", letterSpacing: "0.1em", textTransform: "uppercase", minWidth: 96, flexShrink: 0 }}>{l}</div>
                    <div style={{ fontSize: 13, color: "var(--pm-text-mid)", lineHeight: 1.5, fontWeight: 300 }}>{v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0", borderTop: "1px solid var(--pm-border)", borderBottom: "1px solid var(--pm-border)", position: "relative", zIndex: 1 }}>
        <div className="sec">
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
              <div>
                <div className="el">Ready to start</div>
                <h2 style={{ fontFamily: "var(--pm-serif)", fontWeight: 300, fontSize: 40, color: "var(--pm-text)", letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 520 }}>
                  Tell us what's broken.<br />
                  <em style={{ fontStyle: "italic", color: "var(--pm-gold)" }}>We'll handle the rest.</em>
                </h2>
              </div>
              <button className="bp" onClick={() => go("contact")}>Book a discovery call</button>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" style={{ padding: "96px 0", position: "relative", zIndex: 1 }}>
        <div className="sec">
          <div className="tc" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <Reveal>
              <div className="el">Get in touch</div>
              <h2 style={{ fontFamily: "var(--pm-serif)", fontWeight: 300, fontSize: 42, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 24 }}>
                Book a<br />
                <em style={{ fontStyle: "italic", color: "var(--pm-gold)" }}>discovery call.</em>
              </h2>
              <p style={{ color: "var(--pm-muted)", fontSize: 14, lineHeight: 1.8, fontWeight: 300, marginBottom: 32 }}>
                A discovery call is 30 minutes. We listen to what's broken, ask the questions you haven't thought to ask, and tell you whether we can help. No pitch, no proposal deck. Just a straight conversation.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[["Email", "info@mysterwolf.studio"], ["Response time", "Within one business day"], ["Discovery call", "30 minutes, no obligation"]].map(([l, v]) => (
                  <div key={l}>
                    <div style={{ fontSize: 10, color: "var(--pm-muted)", fontFamily: "var(--pm-mono)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>{l}</div>
                    <div style={{ fontSize: 14, color: "var(--pm-text-mid)" }}>{v}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Your name", type: "text", placeholder: "Name" },
                  { label: "Your email", type: "email", placeholder: "email@company.com" },
                  { label: "Your organization", type: "text", placeholder: "Company or department" },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--pm-muted)", fontFamily: "var(--pm-mono)", marginBottom: 6, display: "block" }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} style={{ width: "100%", padding: "12px 14px", background: "var(--pm-surface)", border: "1px solid var(--pm-border)", fontSize: 14, fontFamily: "var(--pm-body)", color: "var(--pm-text)", outline: "none", transition: "border-color 0.2s" }}
                      onFocus={e => e.target.style.borderColor = "var(--pm-gold-dim)"}
                      onBlur={e => e.target.style.borderColor = "var(--pm-border)"} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--pm-muted)", fontFamily: "var(--pm-mono)", marginBottom: 6, display: "block" }}>Describe the problem</label>
                  <textarea rows={4} placeholder="What's broken? What's it costing you? How long has it been this way?" style={{ width: "100%", padding: "12px 14px", background: "var(--pm-surface)", border: "1px solid var(--pm-border)", fontSize: 14, fontFamily: "var(--pm-body)", color: "var(--pm-text)", outline: "none", resize: "vertical", transition: "border-color 0.2s" }}
                    onFocus={e => e.target.style.borderColor = "var(--pm-gold-dim)"}
                    onBlur={e => e.target.style.borderColor = "var(--pm-border)"} />
                </div>
                <button className="bp"
                  onClick={() => window.location.href = "mailto:info@mysterwolf.studio?subject=Discovery Call Request&body=Name: %0AOrganization: %0AProblem: "}>
                  Request a discovery call
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--pm-border)", background: "var(--pm-dark)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "28px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--pm-bg)", border: "1px solid var(--pm-gold)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "Georgia, serif", fontSize: 7, fontWeight: 700, color: "var(--pm-text)" }}>mws</span>
            </div>
            <span style={{ fontFamily: "var(--pm-serif)", fontWeight: 600, fontSize: 14, color: "var(--pm-text)", letterSpacing: "0.03em" }}>ProcessMind LLC</span>
            <span style={{ fontSize: 11, color: "var(--pm-muted)", fontWeight: 300, marginLeft: 8, fontFamily: "var(--pm-body)" }}>a mysterwolf studios company</span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            {["framework", "work", "about", "contact"].map(id => (
              <button key={id} className="nb" onClick={() => go(id)}>{id}</button>
            ))}
          </div>
          <div style={{ fontSize: 10, color: "var(--pm-muted)", fontFamily: "var(--pm-mono)", letterSpacing: "0.08em" }}>
            © 2026 — Every broken process has a solution.
          </div>
        </div>
      </footer>
    </div>
  );
}
