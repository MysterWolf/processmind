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

const modes = [
  {
    tag: "Process Mode",
    h3: "Something's broken.",
    body: "You have a process that isn't working — it's costing time, money, or knowledge, and you're not sure why. We walk in, map it, find the failure, and fix it.",
    tagline: "\"Every broken process has a solution. We find both.\"",
  },
  {
    tag: "Idea Mode",
    h3: "Something's possible.",
    body: "You have an idea — a new service, a new system, something you think could work. We run it through the framework to test whether it holds up and where the floor is.",
    tagline: "\"Every idea has a floor. We find it.\"",
  },
];

const expect = [
  "We ask you to walk us through the problem — not from a slide, just out loud. The way you explain it tells us where the actual issue is.",
  "We run the seven steps. Some questions will feel like they're about the wrong thing. That's intentional.",
  "At the end, you get a written audit report — a structured breakdown of what's broken, what the fix looks like, and what becomes possible after.",
  "If there's a build engagement that makes sense, we scope it. If there isn't, you still leave with the report. Either way, you're not paying for discovery that leads nowhere.",
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

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function ModeCard({ mode, index }) {
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
          padding: "32px 28px", height: "100%",
          background: hov ? "var(--pm-surface-hover)" : "var(--pm-surface)",
          border: `1px solid ${hov ? "var(--pm-gold-dim)" : "var(--pm-border)"}`,
          transition: "all 0.2s ease",
        }}
      >
        <div style={{
          fontSize: 10, color: "var(--pm-gold)", fontFamily: "var(--pm-mono)",
          letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 16,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ display: "block", width: 20, height: 1, background: "var(--pm-gold)" }} />
          {mode.tag}
        </div>
        <div style={{
          fontFamily: "var(--pm-serif)", fontSize: 22, fontWeight: 600,
          color: "var(--pm-text)", lineHeight: 1.25, marginBottom: 14,
          letterSpacing: "-0.01em",
        }}>{mode.h3}</div>
        <div style={{ fontSize: 14, color: "var(--pm-muted)", lineHeight: 1.75, fontWeight: 300, marginBottom: 20 }}>
          {mode.body}
        </div>
        <div style={{
          fontStyle: "italic", fontSize: 14, color: "var(--pm-gold)",
          fontFamily: "var(--pm-serif)", lineHeight: 1.4,
        }}>{mode.tagline}</div>
      </div>
    </div>
  );
}

function ExpectRow({ txt, index }) {
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
          background: hov ? "var(--pm-surface-hover)" : "var(--pm-surface)",
          padding: "24px 28px", display: "grid",
          gridTemplateColumns: "60px 1fr", gap: 32, transition: "background 0.2s",
        }}
      >
        <div style={{
          fontFamily: "var(--pm-mono)", fontSize: 11, letterSpacing: "0.1em",
          color: hov ? "var(--pm-gold)" : "var(--pm-muted)",
          paddingTop: 3, transition: "color 0.2s",
        }}>0{index + 1}</div>
        <div style={{ fontSize: 14, color: "var(--pm-text-mid)", lineHeight: 1.75, fontWeight: 300 }}>{txt}</div>
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
          letterSpacing: "0.1em", paddingTop: 3, transition: "color 0.2s",
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

export default function Intro() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const book = () => {
    window.location.href = "mailto:info@mysterwolf.studio?subject=First Session Request — ProcessMind&body=Name: %0AOrganization: %0AWhat's broken: ";
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

        .nb { font-size: 11px; color: var(--pm-muted); cursor: pointer; background: none; border: none; font-family: var(--pm-mono); letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.15s; padding: 0; text-decoration: none; display: inline-block; }
        .nb:hover { color: var(--pm-text); }

        .bp { background: var(--pm-gold); color: #0A0C12; border: none; padding: 14px 32px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; font-family: var(--pm-mono); font-weight: 500; transition: background 0.2s, transform 0.15s; }
        .bp:hover { background: var(--pm-gold-light); transform: translateY(-1px); }

        .bg { background: transparent; color: var(--pm-text); border: 1px solid var(--pm-border-mid); padding: 14px 32px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; font-family: var(--pm-mono); transition: border-color 0.2s, transform 0.15s; text-decoration: none; display: inline-block; }
        .bg:hover { border-color: var(--pm-gold-dim); transform: translateY(-1px); }

        .el { font-size: 10px; color: var(--pm-gold); font-family: var(--pm-mono); letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
        .el::before { content: ''; display: block; width: 28px; height: 1px; background: var(--pm-gold); }

        .pill { border: 1px solid var(--pm-border-mid); padding: 5px 14px; font-size: 10px; font-family: var(--pm-mono); letter-spacing: 0.1em; color: var(--pm-muted); text-transform: uppercase; }

        .noise { position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); background-size: 200px 200px; }

        @keyframes fU { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fI { from { opacity:0; } to { opacity:1; } }

        @media (max-width: 720px) {
          .sec { padding: 0 24px; }
          .h1i { font-size: clamp(52px, 12vw, 80px) !important; }
          .tc { grid-template-columns: 1fr !important; gap: 48px !important; }
          .gc { grid-template-columns: 1fr !important; }
          .sg3 { grid-template-columns: 1fr !important; }
          .nl { display: none !important; }
          .step-inner { grid-template-columns: 60px 1fr !important; }
          .step-desc { display: none; }
        }
      `}</style>

      <div className="noise" />

      {/* ── Nav ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,12,18,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--pm-border)" : "1px solid transparent",
        transition: "all 0.3s ease",
        padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68,
      }}>
        <a href="/processmind/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "var(--pm-bg)", border: "1.5px solid var(--pm-gold)",
            boxShadow: "0 0 0 1px var(--pm-bg), 0 0 0 3px var(--pm-gold-dim)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 11, fontWeight: 700, color: "var(--pm-text)", letterSpacing: "-0.5px" }}>mws</span>
          </div>
          <div>
            <div style={{ fontFamily: "var(--pm-serif)", fontWeight: 600, fontSize: 16, letterSpacing: "0.04em", color: "var(--pm-text)", lineHeight: 1 }}>ProcessMind</div>
            <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--pm-gold)", textTransform: "uppercase", fontFamily: "var(--pm-mono)", marginTop: 2 }}>LLC</div>
          </div>
        </a>
        <div className="nl" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          <a href="/processmind/" className="nb">← Full site</a>
          <button className="bp" style={{ padding: "9px 22px", fontSize: 10 }} onClick={book}>
            Book a free session
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: "140px 0 96px", position: "relative", overflow: "hidden", zIndex: 1, borderBottom: "1px solid var(--pm-border)" }}>
        <div style={{
          position: "absolute", top: "50%", right: -100,
          transform: "translateY(-50%)",
          width: 500, height: 500,
          border: "1px solid var(--pm-border)", borderRadius: "50%",
          opacity: 0, animation: "fI 1.5s ease 0.5s forwards",
        }} />
        <div style={{
          position: "absolute", top: "50%", right: -60,
          transform: "translateY(-50%)",
          width: 400, height: 400,
          border: "1px solid var(--pm-gold-dim)", borderRadius: "50%",
          opacity: 0, animation: "fI 1.5s ease 0.7s forwards",
        }} />

        <div className="sec" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ opacity: 0, animation: "fU 0.8s ease 0.1s forwards", marginBottom: 24 }}>
            <div className="el">Cold intro · What ProcessMind actually is</div>
          </div>
          <div style={{ opacity: 0, animation: "fU 0.9s ease 0.2s forwards" }}>
            <h1 className="h1i" style={{
              fontFamily: "var(--pm-serif)", fontWeight: 300,
              fontSize: "clamp(56px, 7.5vw, 96px)",
              lineHeight: 1.0, letterSpacing: "-0.03em",
              color: "var(--pm-text)", maxWidth: 820, marginBottom: 36,
            }}>
              Your processes are<br />
              costing you more<br />
              <em style={{ fontStyle: "italic", color: "var(--pm-gold)" }}>than you think.</em>
            </h1>
          </div>
          <div style={{ opacity: 0, animation: "fU 0.8s ease 0.36s forwards", marginBottom: 32 }}>
            <p style={{ fontSize: 17, color: "var(--pm-muted)", maxWidth: 520, lineHeight: 1.8, fontWeight: 300 }}>
              ProcessMind is a process consulting practice. We come in, map what's broken, and build the fix. One engagement. Real output. No ongoing retainer required.
            </p>
          </div>
          <div style={{ opacity: 0, animation: "fU 0.8s ease 0.44s forwards", display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
            {["Process consulting", "AI-enabled solutions", "Knowledge transfer"].map(t => (
              <div key={t} className="pill">{t}</div>
            ))}
          </div>
          <div style={{ opacity: 0, animation: "fU 0.8s ease 0.52s forwards", display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="bp" onClick={book}>Book a free first session</button>
          </div>
        </div>
      </section>

      {/* ── Two Modes ── */}
      <section style={{ padding: "96px 0", background: "var(--pm-dark)", position: "relative", zIndex: 1 }}>
        <div className="sec">
          <Reveal>
            <div style={{ marginBottom: 48 }}>
              <div className="el">Two modes of engagement</div>
              <h2 style={{ fontFamily: "var(--pm-serif)", fontWeight: 300, fontSize: 44, letterSpacing: "-0.02em", color: "var(--pm-text)", lineHeight: 1 }}>
                What we do
              </h2>
            </div>
          </Reveal>
          <div className="gc" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--pm-border)" }}>
            {modes.map((mode, i) => <ModeCard key={mode.tag} mode={mode} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Seven Steps ── */}
      <section style={{ padding: "96px 0", position: "relative", zIndex: 1 }}>
        <div className="sec">
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
              <div>
                <div className="el">The methodology</div>
                <h2 style={{ fontFamily: "var(--pm-serif)", fontWeight: 300, fontSize: 44, letterSpacing: "-0.02em", color: "var(--pm-text)", lineHeight: 1 }}>
                  Seven steps. Every engagement.
                </h2>
              </div>
              <p style={{ fontSize: 14, color: "var(--pm-muted)", maxWidth: 360, lineHeight: 1.7, fontWeight: 300, alignSelf: "flex-end" }}>
                The order matters. Skipping steps is how consultants create new problems instead of solving old ones.
              </p>
            </div>
          </Reveal>
          <div style={{ borderTop: "1px solid var(--pm-border)" }}>
            {steps.map((s, i) => <StepRow key={s.n} s={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Case Study ── */}
      <section style={{ padding: "96px 0", background: "var(--pm-dark)", position: "relative", zIndex: 1 }}>
        <div className="sec">
          <Reveal>
            <div style={{ marginBottom: 48 }}>
              <div className="el">Real result</div>
              <h2 style={{ fontFamily: "var(--pm-serif)", fontWeight: 300, fontSize: 44, letterSpacing: "-0.02em", color: "var(--pm-text)", lineHeight: 1 }}>
                What one session actually produced.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ border: "1px solid var(--pm-gold-dim)", background: "var(--pm-surface)", padding: "48px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
                <div>
                  <div style={{ fontFamily: "var(--pm-serif)", fontSize: 22, fontWeight: 600, color: "var(--pm-text)", marginBottom: 4 }}>
                    Telecom Infrastructure PM
                  </div>
                  <div style={{ fontSize: 11, color: "var(--pm-muted)", fontFamily: "var(--pm-mono)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Multi-county project portfolio · Process Mode
                  </div>
                </div>
                <div style={{
                  display: "inline-block", fontSize: 10, color: "var(--pm-gold)",
                  border: "1px solid var(--pm-gold-dim)", padding: "4px 12px",
                  fontFamily: "var(--pm-mono)", letterSpacing: "0.08em",
                }}>Single session</div>
              </div>

              <p style={{ fontSize: 15, color: "var(--pm-muted)", lineHeight: 1.8, fontWeight: 300, maxWidth: 680 }}>
                A project manager overseeing hundreds of active building development projects across multiple counties — each with its own contractor relationships, compliance requirements, and status tracking. The work ran through Salesforce and OneDrive. The problem: no systematic way to surface which projects were approaching critical status before they became emergencies.
              </p>

              <div className="sg3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "var(--pm-border)", margin: "32px 0" }}>
                {[
                  ["338", "Active projects mapped in the session"],
                  ["203", "Projects identified at holding-status risk"],
                  ["1", "Session to surface both problems and a solution"],
                ].map(([n, l]) => (
                  <div key={n} style={{
                    background: "var(--pm-surface)", padding: "28px 24px",
                    borderLeft: "1px solid var(--pm-border)",
                  }}>
                    <div style={{
                      fontFamily: "var(--pm-serif)", fontSize: 52, fontWeight: 300,
                      color: "var(--pm-gold)", lineHeight: 1, marginBottom: 12,
                      letterSpacing: "-0.02em",
                    }}>{n}</div>
                    <div style={{ fontSize: 13, color: "var(--pm-muted)", lineHeight: 1.6, fontWeight: 300 }}>{l}</div>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: 15, color: "var(--pm-muted)", lineHeight: 1.8, fontWeight: 300, maxWidth: 680, marginBottom: 32 }}>
                The session produced a structured audit report, a prioritized risk register, and a deployable Copilot agent prompt ready to use in Microsoft Teams the following Monday. No prior prep required — just showing up and answering questions.
              </p>

              <div style={{ borderLeft: "2px solid var(--pm-gold)", paddingLeft: 24 }}>
                <p style={{
                  fontFamily: "var(--pm-serif)", fontStyle: "italic", fontSize: 20,
                  color: "var(--pm-text-mid)", lineHeight: 1.6, fontWeight: 300,
                }}>
                  "She came in managing projects. She left with a system."
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── What to Expect ── */}
      <section style={{ padding: "96px 0", position: "relative", zIndex: 1 }}>
        <div className="sec">
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
              <div>
                <div className="el">What to expect</div>
                <h2 style={{ fontFamily: "var(--pm-serif)", fontWeight: 300, fontSize: 44, letterSpacing: "-0.02em", color: "var(--pm-text)", lineHeight: 1 }}>
                  One hour. Structured questions.<br />Real output.
                </h2>
              </div>
              <p style={{ fontSize: 14, color: "var(--pm-muted)", maxWidth: 360, lineHeight: 1.7, fontWeight: 300, alignSelf: "flex-end" }}>
                You don't need to prepare a deck or a briefing document. You just need to show up and answer honestly.
              </p>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--pm-border)" }}>
            {expect.map((txt, i) => <ExpectRow key={i} txt={txt} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 0", borderTop: "1px solid var(--pm-border)", borderBottom: "1px solid var(--pm-border)", position: "relative", zIndex: 1 }}>
        <div className="sec">
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
              <div>
                <div className="el">Get started</div>
                <h2 style={{ fontFamily: "var(--pm-serif)", fontWeight: 300, fontSize: 40, color: "var(--pm-text)", letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 520 }}>
                  The first session<br />
                  <em style={{ fontStyle: "italic", color: "var(--pm-gold)" }}>is free.</em>
                </h2>
                <p style={{ fontSize: 15, color: "var(--pm-muted)", maxWidth: 480, lineHeight: 1.8, fontWeight: 300, marginTop: 20 }}>
                  No pitch. No proposal deck. Thirty minutes — we listen, ask the questions you haven't thought to ask, and tell you honestly whether we can help.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
                <button className="bp" onClick={book}>Book a free first session</button>
                <a href="/processmind/" className="bg" style={{ textAlign: "center" }}>See the full site</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
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
            <a href="/processmind/" className="nb">Full site</a>
          </div>
          <div style={{ fontSize: 10, color: "var(--pm-muted)", fontFamily: "var(--pm-mono)", letterSpacing: "0.08em" }}>
            © 2026 — Every broken process has a solution.
          </div>
        </div>
      </footer>
    </div>
  );
}
