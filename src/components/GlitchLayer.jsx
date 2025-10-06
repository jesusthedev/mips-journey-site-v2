import React, { useEffect, useRef } from 'react';
import './glitch.css';

export default function GlitchLayer({ bigDelta = 0 }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    // intensity based on “bigDelta” (your Sep→Oct delta)
    const intensity = Math.min(1, Math.max(0, Math.abs(bigDelta) / 0.5));
    node.style.setProperty('--glitch-intensity', intensity.toString());
  }, [bigDelta]);

  return (
    <div ref={rootRef} className="glitch-wrap" aria-hidden="true">
      <div className="glitch-noise" />
      <div className="glitch-scanlines" />
      <div className="glitch-chroma" />
    </div>
  );
}
