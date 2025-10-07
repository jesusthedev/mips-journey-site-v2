import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
export default function Bars({ data = [], progress = 0 }) {
  // Normalize and compute basic metrics
  const items = Array.isArray(data) ? data : [];
  const max = Math.max(1, ...items.map(d => Number(d.value) || 0));
  const avg =
    items.reduce((a, c) => a + (Number(c.value) || 0), 0) /
    Math.max(1, items.length);

  // Color by trend vs average
  function trendColor(v, avg) {
    if (v > avg * 1.05) return 'var(--brand-2)'; // Up → green
    if (v < avg * 0.95) return '#ef4444';        // Down → red
    return 'var(--brand)';                       // Steady → blue
  }

  // Render
  return (
    <div className="bars">
      {items.map((d, i) => {
        const v = Number(d.value) || 0;
        const w = `${(v / max) * 100}%`;
        return (
          <div key={i} className="bar-row">
            <div className="bar-label">{d.metric}</div>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: w,
                  background: trendColor(v, avg),
                }}
              />
            </div>
            <div className="bar-val">{v}</div>
          </div>
        );
      })}
    </div>
  );
}
