import React, { useEffect, useState } from 'react';

export default function Counter({ value=0, label='', duration=900 }){
  const [n, setN] = useState(0);
  useEffect(()=>{
    const start = performance.now();
    const from = 0, to = Number(value)||0;
    let raf;
    const tick=(t)=>{
      const p = Math.min(1, (t - start)/duration);
      const eased = 1 - Math.pow(1-p, 3);
      setN(Math.round(from + (to-from)*eased));
      if(p<1) raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    return ()=> cancelAnimationFrame(raf);
  },[value, duration]);

  return (
    <div className="counter">
      <div className="counter-value">{n}</div>
      {label && <div className="counter-label">{label}</div>}
    </div>
  );
}
