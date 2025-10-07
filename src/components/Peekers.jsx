import React from 'react';
import { motion } from 'framer-motion';
import Portrait from './Portrait.jsx';
import { portraits } from './portraits.js';

const peeks = [
  { id:'abhishek', side:'left',   top:120, delay:.15 },
  { id:'jesus',    side:'right',  top:160, delay:.25 },
  { id:'thai',     side:'left',   top:420, delay:.35 },
  { id:'saily',    side:'right',  top:520, delay:.45 },
  { id:'niki',     side:'left',   top:680, delay:.55 },
  { id:'luis',     side:'right',  top:780, delay:.65 },
  { id:'jerome',   side:'left',   top:920, delay:.75 },
];

function Peek({ id, side='left', top=200, delay=.2 }){
  const p = portraits.find(x => x.id===id);
  if(!p) return null;

  const fromX = side==='left' ? -80 : 80;

  return (
    <motion.div
      initial={{ x: fromX, opacity:0 }}
      whileInView={{ x: 0, opacity:1 }}
      viewport={{ once:true, margin:'-20% 0px -10% 0px' }}
      transition={{ type:'spring', stiffness:200, damping:18, delay }}
      style={{
        position:'fixed', 
        top, 
        [side]: -16,
        zIndex: 5,
        pointerEvents:'auto'
      }}
      whileHover={{ x: side==='left'? 8 : -8, rotate: side==='left' ? -2 : 2 }}
      title="👀 boo!"
    >
      <div style={{ transform: side==='right' ? 'scaleX(-1)' : 'none' }}>
        <Portrait {...p} />
      </div>
    </motion.div>
  );
}

export default function Peekers(){
  return peeks.map((cfg)=> <Peek key={cfg.id} {...cfg} />);
}
