import React, { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
function Particles({speed=0.2}){
  const points = useMemo(()=>{
    const n=500, arr=[]
    for(let i=0;i<n;i++){ arr.push([(Math.random()-0.5)*6,(Math.random()-0.5)*4,(Math.random()-0.5)*6]) }
    return Float32Array.from(arr.flat())
  },[])
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' count={points.length/3} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} sizeAttenuation opacity={0.55} transparent/>
    </points>
  )
}
export default function Ambient() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        background:
          'radial-gradient(1200px 800px at 60% 20%, rgba(255,255,255,.10) 0%, rgba(255,255,255,0) 60%), ' +
          'radial-gradient(900px 600px at 20% 80%, rgba(255,230,150,.12) 0%, rgba(255,230,150,0) 55%), ' +
          'linear-gradient(180deg, #0e1430 0%, #141d46 45%, #0f1a3b 100%)'
      }}
    >
      {/* star field */}
      <svg width="100%" height="100%" style={{ mixBlendMode: 'screen', opacity: .35 }}>
        <defs>
          <circle id="s" r="1.2" fill="white" />
        </defs>
        {Array.from({ length: 220 }).map((_, i) => (
          <use key={i} href="#s"
            x={Math.random() * 2000}
            y={Math.random() * 1400}
            opacity={0.35 + Math.random() * 0.4}
          />
        ))}
      </svg>
    </div>
  );
}
