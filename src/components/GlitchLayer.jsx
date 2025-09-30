import React, { useEffect, useRef } from 'react'
export default function GlitchLayer({active}){
  const ref = useRef(null)
  useEffect(()=>{
    if(!ref.current) return
    ref.current.classList.toggle('active', !!active)
  },[active])
  return <div ref={ref} className='glitch'></div>
}