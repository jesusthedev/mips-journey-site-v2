import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
// Bars.jsx
import React from 'react';
export default function Bars({ data = [], progress = 0 }) {
    const items = Array.isArray(data) ? data : [];
  return (
    <ul className="bars">
      {items.map((d, i) => {
        const label = String(d?.metric ?? d?.name ?? `Item ${i + 1}`);
        const value = Number(d?.value ?? d?.count ?? 0);
        const trend = Number(d?.trend ?? 0);   // -1, 0, +1 if you computed it

        const color =
          trend > 0 ? 'var(--bar-up)' :
          trend < 0 ? 'var(--bar-down)' :
                      'var(--bar-flat)';

        return (
          <li key={`${label}-${i}`} className="bar-row">
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
          </li>
        );
      })}
    </ul>
  );
}