import React from 'react';
import { motion } from 'framer-motion';
import { portraits } from './portraits.js';

const faces = portraits.map((p, i) => ({
  ...p,
  delay: i * 0.25,
  side: i % 2 ? 'left' : 'right'
}));

export default function Peekers() {
  return (
    <div className="peekers">
      {faces.map((f, i) => (
        <motion.div
          key={i}
          className={`peeker ${f.side}`}
          initial={{ x: f.side === 'left' ? -80 : 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: f.delay, type: 'spring', stiffness: 70 }}
          whileHover={{
            rotate: [0, 6, -4, 0],
            scale: 1.05,
            transition: { duration: 0.6 }
          }}
          title={`${f.name} peeks suspiciously`}
        >
          <img src={f.src} alt={f.name} />
        </motion.div>
      ))}
    </div>
  );
}
