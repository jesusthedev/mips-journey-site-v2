import React from 'react'
import { motion } from './shims/motion'
export default function Portrait({src, alt='cameo', x=0, y=0, delay=0, mode='peeker'}){
  const size = 96
  const style = { position:'absolute', top:y, left:x, width:size, height:size }
  const radius = 14
  return (
    <motion.img src={src} alt={alt} className='portrait' style={style}
      initial={{opacity:0, scale:0.7, rotate: mode==='spin'? -15:0, x, y}}
      whileInView={{opacity:1, scale:1, rotate:0, x, y}}
      viewport={{ once:true, margin:'-100px' }}
      transition={{delay, type:'spring', stiffness:160, damping:18}}
    />
  )
}