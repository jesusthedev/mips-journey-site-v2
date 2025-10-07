// src/components/Bars.jsx
import React from 'react';

export default function Bars({ data = [], progress = 0 }) {
  const items = Array.isArray(data) ? data : [];

  return (
    <div className="bars">
      {items.map((d, i) => {
        const label = String(d?.metric ?? d?.name ?? `Item ${i + 1}`);
        const value = Number(d?.value ?? d?.count ?? 0);     // 0–100 expected
        const trend = Number(d?.trend ?? 0);                 // -1 | 0 | +1

        const color =
          trend > 0 ? 'var(--bar-up)' :
          trend < 0 ? 'var(--bar-down)' :
                      'var(--bar-flat)';

        return (
          <div className="bar-row" key={`${label}-${i}`}>
            <span className="bar-label">{label}</span>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${Math.max(0, Math.min(100, value))}%`,
                  background: color
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
