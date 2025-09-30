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
export default function Ambient(){ return (
  <div style={{position:'fixed', inset:0, zIndex:0, pointerEvents:'none', opacity:.6}}>
    <Canvas camera={{position:[0,0,3]}}>
      <ambientLight intensity={0.6} />
      <Particles />
    </Canvas>
  </div>
)}