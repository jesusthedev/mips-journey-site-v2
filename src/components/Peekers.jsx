import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Portrait from './Portrait.jsx';
import { portraits } from './portraits.js';

const edges = ['left','right','top','bottom'];

export default function Peekers() {
  // pick 5 random faces each load
  const cast = useMemo(() => {
    const pool = [...portraits];
    return Array.from({length: 5})
      .map(() => pool.splice(Math.floor(Math.random()*pool.length),1)[0])
      .filter(Boolean);
  }, []);

  return (
    <div aria-hidden style={{ position:'relative', height: 360, marginTop: 24 }}>
      {cast.map((p, i) => {
        const edge = edges[i % edges.length];
        const base = { position:'absolute', zIndex: 2, filter:'drop-shadow(0 6px 18px rgba(0,0,0,.35))' };
        const pos =
          edge==='left'   ? { left:-72,  top:40 + i*50 } :
          edge==='right'  ? { right:-72, top:10 + i*60 } :
          edge==='top'    ? { top:-72,   left:80 + i*120 } :
                            { bottom:-72,left:30 + i*140 };

        const hidden =
          edge==='left'   ? { x:-80,  rotate:-4, opacity:0 } :
          edge==='right'  ? { x: 80,  rotate: 4, opacity:0 } :
          edge==='top'    ? { y:-80,  rotate:-2, opacity:0 } :
                            { y: 80,  rotate: 2, opacity:0 };

        const shown = { x:0, y:0, opacity:1, rotate:0, transition:{ delay: .2 + i*.15, duration:.7, ease:[.17,.67,.2,1] } };
        const wiggle = { y:[0,-6,0,4,0], rotate:[0,2,0,-2,0], transition:{ repeat:Infinity, duration:4+i*.4, ease:'easeInOut' } };

        return (
          <motion.div key={p.id} style={{...base, ...pos}} initial={hidden} animate={shown} whileHover={wiggle}>
            <Portrait {...p} />
          </motion.div>
        );
      })}
    </div>
  );
}
