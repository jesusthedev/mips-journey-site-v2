import React, { useEffect, useState } from 'react'
export default function Counter({to=0, duration=900, prefix='', suffix=''}){
  const [n, setN] = useState(0)
  useEffect(()=>{
    let start; const step = t=>{ if(!start) start=t; const p=Math.min((t-start)/duration,1); setN(Math.round(p*to)); if(p<1) requestAnimationFrame(step) }
    requestAnimationFrame(step)
  },[to,duration])
  return <span>{prefix}{n}{suffix}</span>
}