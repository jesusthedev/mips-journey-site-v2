import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
export default function Bars({ data = [], progress = 0 }) {
  return (
    <div className="bars">
      {data.map(({ metric, value, delta }) => {
        const v = Number(value ?? 0);
        const w = Math.max(6, Math.min(100, v)); // normalize if you're not already
        const up = Number(delta ?? 0) > 0;
        return (
          <div key={metric} className="row">
            <span className="label">{metric}</span>
            <div className={`track ${up ? 'up' : 'down'}`}>
              <div className="fill" style={{ width: `${w}%` }} />
              <span className="val">{v}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
  // Normalize and compute basic metrics
  const items = Array.isArray(data) ? data : [];
  const max = Math.max(1, ...items.map(d => Number(d.value) || 0));
  const avg =
    items.reduce((a, c) => a + (Number(c.value) || 0), 0) /
    Math.max(1, items.length);

  // helper: pick a color based on value vs average
function trendColor(value, average) {
  if (average == null) return 'var(--brand)';
  if (value > average * 1.05) return 'var(--good)';      // green
  if (value < average * 0.95) return 'var(--bad)';       // red
  return 'var(--meh)';                                   // amber/neutral
}

// inside your map over data items:
{data.map((d, i) => {
  const v = Number(d.value ?? 0);
  const avg = Number(d.average ?? d.avg ?? null);
  const pct = Math.max(3, Math.min(100, (v / (max || 1)) * 100));
  const width = pct + '%';

  return (
    <div className="bar-row" key={i}>
      <div className="bar-label">{d.metric}</div>
      <div className="bar-track">
        <div
          className="bar-fill"
          style={{ width, background: trendColor(v, avg) }}
          title={`${d.metric}: ${v}${avg ? ` (${v > avg ? '↑' : v < avg ? '↓' : '→'})` : ''}`}
        />
      </div>
    </div>
  );
})}
