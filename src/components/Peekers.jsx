import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Portrait from './Portrait.jsx';
import { portraits as all } from './portraits.js';

const EDGES = ['left','right','top','bottom'];

export default function Peekers() {
  // bail out if portraits isn’t an array
  const list = Array.isArray(all) ? all.slice() : [];

  // choose up to 5 unique, but only if we actually have them
  const cast = useMemo(() => {
    if (!list.length) return [];
    const pool = list.slice();
    const out = [];
    for (let i = 0; i < Math.min(5, pool.length); i += 1) {
      const idx = Math.floor(Math.random() * pool.length);
      const pick = pool.splice(idx, 1)[0];
      if (pick && pick.id) out.push(pick);
    }
    return out;
  }, [list.length]);

  if (!cast.length) return null;

  return (
    <div aria-hidden style={{ position:'relative', height: 360, marginTop: 24 }}>
      {cast.map((p, i) => {
        const edge = EDGES[i % EDGES.length];
        const base = {
          position:'absolute',
          zIndex: 2,
          filter:'drop-shadow(0 6px 18px rgba(0,0,0,.35))'
        };

        const pos =
          edge === 'left'   ? { left:-72,  top: 40 + i*50 } :
          edge === 'right'  ? { right:-72, top: 10 + i*60 } :
          edge === 'top'    ? { top:-72,   left:80 + i*120 } :
                              { bottom:-72,left:30 + i*140 };

        const hidden =
          edge === 'left'   ? { x:-80, opacity:0, rotate:-4 } :
          edge === 'right'  ? { x: 80, opacity:0, rotate: 4 } :
          edge === 'top'    ? { y:-80, opacity:0, rotate:-2 } :
                              { y: 80, opacity:0, rotate: 2 };

        const shown = {
          x:0, y:0, opacity:1, rotate:0,
          transition:{ delay:.2 + i*.15, duration:.7, ease:[.17,.67,.2,1] }
        };

        return (
          <motion.div key={p.id} style={{ ...base, ...pos }} initial={hidden} animate={shown}>
            <Portrait {...p} />
          </motion.div>
        );
      })}
    </div>
  );
}

