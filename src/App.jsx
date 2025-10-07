// ---------- App.jsx (clean rebuild) ----------
import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import Peekers from './components/Peekers.jsx';

import Bars from './components/Bars.jsx';
import Counter from './components/Counter.jsx';

// Lazy so it can’t crash first paint
const GlitchLayer = React.lazy(() => import('./components/GlitchLayer.jsx'));
// near the top of App.jsx, once:
const W = typeof window !== 'undefined' ? window : { innerWidth: 1200 };


import Ambient from './components/Ambient.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Portrait from './components/Portrait.jsx';
import { portraits } from './components/portraits.js';

import { burst } from './components/confetti.js';
import data from './data/mips.json';

// NOTE: If your file is named "ueScrollProgress.js", change this import accordingly.
import { useScrollProgress } from './hooks/useScrollProgress.js';

// Small guard so confetti never crashes the app
function safeBurst(el, opts = {}) {
  try {
    if (!el) return;
    const count = Math.max(8, Math.min(200, Number(opts.count ?? 24)));
    const reverse = !!opts.reverse;
    burst(el, { count, reverse });
  } catch (e) {
    console.error('[confetti burst failed]', e);
    if (typeof window !== 'undefined') window.__SAFE_MODE__ = true;
  }
}

// Portrait proxy: renders nothing if id isn’t found (no runtime blowups)
const P = ({ id, ...pos }) => {
  const p = portraits.find(x => x.id === id);
  if (!p) return null;
  return <Portrait {...p} {...pos} />;
};

// Utility used below for little summaries (safe + pure)
function splitCounts(obj) {
  const rateKey = 'Avg Line Items per MIP form';
  const entries = Object.entries(obj).filter(([k]) => k !== rateKey);
  return { list: entries.map(([metric, value]) => ({ metric, value })) };
}
function ErrorBoundary({ children }) {
  try { return children; } catch (e) {
    console.error(e);
    return <div style={{padding:24,color:'#fff'}}>Something tripped—but I caught it.</div>;
  }
}

export default function App() {
  // scroll progress drives theme morphing; defaults if hook is missing
  const progress = useScrollProgress ? useScrollProgress() : 0;
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
  const up = (octCounts.list || []).filter(d => {
    const v = Number(d.value ?? 0);
    const avg = Number(d.average ?? d.avg ?? NaN);
    return !Number.isNaN(avg) && v > avg * 1.05;
  }).length;
  if (up >= 5) safeBurst(heroRef.current, { count: 50, reverse: true });
}, [octCounts.list]);

  // simple “fun” morph; capped and smooth-ish
  const funRatio = useMemo(() => {
    const raw = Math.max(0, Math.min(1, (progress - 0.2) / 0.6));
    return Math.round(raw * 100);
  }, [progress]);

  // confetti anchor
  const heroRef = useRef(null);

  // Wire a “celebrate” on first interaction
  const onStart = () => {
    safeBurst(heroRef.current, { count: 32, reverse: false });
    setGlitch(true);
    // auto settle the glitch after a moment
    setTimeout(() => setGlitch(false), 1500);
  };

  // Prepare numbers (minimal, safe)
  const sep = data?.['September'] ?? {};
  const oct = data?.['October'] ?? {};
  const sepCounts = useMemo(() => splitCounts(sep), [sep]);
  const octCounts = useMemo(() => splitCounts(oct), [oct]);

  return (
    <div className="vhs" ref={heroRef}>
      {/* Background layers are optional; kept wrapped so they can’t nuke first paint */}
      <Suspense fallback={null}>
        <GlitchLayer active={glitch} />
      </Suspense>
      <Ambient />

      {/* HERO */}
   <section className="section">
  <div className="container">
    <Bars data={sepCounts.list || []} progress={progress} />
    <Bars data={octCounts.list || []} progress={progress} />
    <div style={{ marginTop: '1rem' }}>
      <Counter value={funRatio} label="Fun Morph" />
    </div>
  </div>
</section>

      {/* Sprinkled portraits (quiet if file/id missing) */}
      <section className="section" aria-hidden="true">
        <P id="abhishek" x={24} y={24} delay={0.2} />
        <P id="jesus" x={W.innerWidth - 140} y={40}  delay={0.35} />
        <P id="thai" x={120} y={280} delay={0.45} />
        <P id="saily" x={W.innerWidth - 220} y={260} delay={0.55} />
        <P id="niki" x={220} y={480} delay={0.65} />
        <P id="luis" x={W.innerWidth - 180} y={520} delay={0.75} />
        <P id="jerome" x={60} y={560} delay={0.85} />
      </section>

<Peekers />

      {/* Leaderboard (safe to render anytime) */}
      <section className="section">
        <Leaderboard
          september={sepCounts.list}
          october={octCounts.list}
        />
      </section>

      {/* Light bar candy + counter so it doesn’t feel dead if someone scrolls 2px */}
      <section className="section">
        <div className="container">
          <Bars progress={progress} />
          + <Bars data={octCounts.list || []} progress={progress} />
          // before
// <Bars progress={progress} />
// + <Bars data={octCounts.list || []} progress={progress} />

// after
<Bars data={sepCounts.list || []} progress={progress} />
<Bars data={octCounts.list || []} progress={progress} />

          <div style={{ marginTop: '1rem' }}>
            <Counter value={funRatio} label="Fun Morph" />
          </div>
        </div>
      </section>
      {/* Peeking characters — fun little cameos */}
<Peekers />
    </div>
  );
}
// ---------- end App.jsx ----------
