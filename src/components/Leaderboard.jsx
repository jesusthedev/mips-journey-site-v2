import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import data from '../data/mips.json'
export default function Leaderboard(){
  const rank = useMemo(()=>{
    // Simple composite on October: higher Line Items, New Teams, lower Dissolves
    const items = [
      {name:'Line Items', score:data['October']['Total Line Items']*1.0},
      {name:'New Teams', score:data['October']['New Teams']*0.8},
      {name:'Avg Heft', score:data['October']['Avg Line Items per MIP form']*120},
      {name:'Alignments', score:data['October']['DL Alignment updates']*0.3},
      {name:'Dissolves (inverse)', score: 200 - data['October']['Dissolves']}
    ]
    return items.sort((a,b)=>b.score-a.score).slice(0,5)
  },[])
  return (
    <div className='leaderboard'>
      <div className='lb-card'>
        <div className='badge'>Org Leaderboard</div>
        <AnimatePresence>
          {rank.map((r,i)=>(
            <motion.div key={r.name} className='lb-row'
              initial={{opacity:0, y:-8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:8}}
              transition={{type:'spring', stiffness:160, damping:18}}>
              <div className='lb-rank'>{i+1}</div>
              <div className='lb-name'>{r.name}</div>
              <div className='lb-score'>{Math.round(r.score)}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}