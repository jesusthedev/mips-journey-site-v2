import React, { useMemo, useRef, useState } from 'react'
import { motion } from './shims/motion'
import Bars from './components/Bars.jsx'
import Counter from './components/Counter.jsx'
import GlitchLayer from './components/GlitchLayer.jsx'
//import Ambient from './components/Ambient.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Portrait from './components/Portrait.jsx'
import { portraits } from './components/portraits.js'
const P = ({ id, ...pos }) => {
  const p = portraits.find(x => x.id === id)
  if (!p) return null
  return <Portrait {...p} {...pos} />
}
import { burst } from './components/Confetti.js'
import data from './data/mips.json'
import { useScrollProgress } from './hooks/useScrollProgress.js'

function splitCounts(obj){
  const rateKey = 'Avg Line Items per MIP form'
  const entries = Object.entries(obj).filter(([k])=>k!==rateKey)
  return { list: entries.map(([metric,value])=>({metric, value})), rate: obj[rateKey] }
}

export default function App(){
  const progress = useScrollProgress()
  const [glitch, setGlitch] = useState(false)
  const sep = data['September']
  const oct = data['October']
  const sepCounts = useMemo(()=>splitCounts(sep),[])
  const octCounts = useMemo(()=>splitCounts(oct),[])
  const comparison = useMemo(()=>{
    const keys = Object.keys(sep).filter(k=>k!=='Avg Line Items per MIP form')
    return keys.map(k=>({ metric: k, September: sep[k], October: oct[k], delta: oct[k]-sep[k]}))
  },[])
  const funRatio = Math.min(Math.max((progress - 0.2)/0.6, 0), 1)
  const bigDelta = (name, delta) => {
    const n = Math.abs(delta)
    return (name==='New Teams' && n>=30) || (name==='Late Requests' && n>=5) || (name==='Rejected' && n>=3)
  }
  const triggerGlitch = () => {
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setGlitch(true); setTimeout(()=>setGlitch(false), 240)
  }

  const refRejected = useRef(null)
  const refLate = useRef(null)
  const refNew = useRef(null)

  const onSectionVisible = (name, delta, ref) => {
    if(bigDelta(name, delta)){
      triggerGlitch()
      if(ref?.current){
        burst(ref.current, { reverse: delta<0, count: 24 })
      }
    }
  }

  return (
    <div className={'vhs'}>
      <Ambient />
      <GlitchLayer active={glitch} />

      {/* HERO */}
      <section className='section'>
        <div className='container'>
          <div className='card'>
            <div className='badge'>MIPs Journey</div>
            <h1 className='h1'>September → October</h1>
            <p className='p'>We start buttoned-up. We detour through neon. We end with a handshake and a compliance-friendly smile.</p>
            <div style={{display:'flex', gap:'1rem', marginTop:'1rem'}}>
              <a className='button' href='#recap'>Start the Tape ▷</a>
              <span className='caption'>Theme morph: <strong>{Math.round(funRatio*100)}%</strong> fun</span>
            </div>
          </div>
        </div>
        {/* portraits organically sprinkled */}
        <Portrait {...portraits('abhishek')} x={24} y={24} delay={0.2} />
        <Portrait {...portraits('jesus')} x={window.innerWidth-140} y={40} delay={0.35} />
      </section>

      {/* LEADERBOARD docked during MoM */}
      <Leaderboard />

      {/* RECAP: SEPT */}
      <section id='recap' className='section'>
        <div className='container'>
          <div className='card'>
            <h2 className='h2'>September Recap</h2>
            <div className='grid'>
              <div className='col-12'>
                <Bars data={sepCounts.list.map(d=>({metric:d.metric, September:d.value, October:0}))} keys={['September']} />
              </div>
              <div className='col-6'>
                <div className='badge'>Total MIP forms</div>
                <div style={{fontSize:'3rem', fontWeight:800}}><Counter to={sep['Total MIP forms']} /></div>
                <p className='p'>Line items: <strong>{sep['Total Line Items']}</strong> • Avg per form: <strong>{sep['Avg Line Items per MIP form'].toFixed(2)}</strong></p>
              </div>
              <div className='col-6'>
                <p className='p'>New Teams: <strong ref={refNew}>{sep['New Teams']}</strong><br/>Rejected: <strong ref={refRejected}>{sep['Rejected']}</strong> • Late Requests: <strong ref={refLate}>{sep['Late Requests']}</strong><br/>Dissolves: <strong>{sep['Dissolves']}</strong></p>
              </div>
            </div>
          </div>
        </div>
        <Portrait {...portraits('thai')} x={120} y={-10} delay={0.2} />
      </section>

      {/* RECAP: OCT */}
      <section className='section'>
        <div className='container'>
          <div className='card'>
            <h2 className='h2'>October Recap</h2>
            <div className='grid'>
              <div className='col-12'>
                <Bars data={octCounts.list.map(d=>({metric:d.metric, October:d.value, September:0}))} keys={['October']} />
              </div>
              <div className='col-6'>
                <div className='badge'>Total MIP forms</div>
                <div style={{fontSize:'3rem', fontWeight:800, color:'var(--accent)'}}><Counter to={oct['Total MIP forms']} /></div>
                <p className='p'>Line items: <strong>{oct['Total Line Items']}</strong> • Avg per form: <strong>{oct['Avg Line Items per MIP form'].toFixed(2)}</strong></p>
              </div>
              <div className='col-6'>
                <p className='p'>New Teams: <strong>{oct['New Teams']}</strong><br/>Rejected: <strong>{oct['Rejected']}</strong> • Late Requests: <strong>{oct['Late Requests']}</strong><br/>Dissolves: <strong>{oct['Dissolves']}</strong></p>
              </div>
            </div>
          </div>
        </div>
        <Portrait {...portraits('saily')} x={260} y={30} delay={0.45} />
      </section>

      {/* MOM */}
      <section className='section'>
        <div className='container'>
          <div className='card'>
            <h2 className='h2'>Month over Month</h2>
            <p className='p'>Green is up where you want it. Red is a learning opportunity we pretend we asked for.</p>
            <div className='grid'>
              <div className='col-12'>
                <Bars data={comparison.map(d=>({metric:d.metric, September:d.September, October:d.October}))} keys={['September','October']} />
              </div>
              <div className='col-12'>
                <ul>
                  {comparison.map(d=>{
                    const color = d.delta>=0?'var(--success)':'var(--danger)'
                    return (
                      <li key={d.metric} className='p'
                        onMouseEnter={()=>onSectionVisible(d.metric, d.delta, d.metric==='Rejected'?refRejected: d.metric==='Late Requests'?refLate: d.metric==='New Teams'?refNew:null)}>
                        <strong>{d.metric}:</strong> {d.September} → {d.October} (<span style={{color}}>{d.delta>=0?'+':''}{d.delta}</span>)
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Portrait {...portraits('niki')} x={window.innerWidth*0.75} y={-10} delay={0.3} />
      </section>

      {/* OUTLOOK / CORPORATE RETURN */}
      <section className='section'>
        <div className='container'>
          <div className='card'>
            <h2 className='h2'>What’s Next</h2>
            <p className='p'>Fewer forms, chunkier payloads. Keep the good drops: Late Requests and Rejected. Tame Dissolves. Nurture New Teams intake. We got this, with coffee.</p>
            <p className='p'><em>Finalizing this communication requires your acceptance of the implied joy contained herein.</em></p>
          </div>
        </div>
        <Portrait {...portraits('luis')} x={60} y={20} delay={0.25} />
      </section>

      {/* SIGN-OFF */}
      <section className='section'>
        <div className='container'>
          <div className='card'>
            <div className='badge'>Executive Sign-Off</div>
            <h2 className='h2'>Thank you for your continued partnership</h2>
            <p className='p'>Performance indicators will be monitored. Synergies will be leveraged. The tape stops now.</p>
          </div>
        </div>
        <Portrait {...portraits('jerome')} x={window.innerWidth-160} y={-10} delay={0.2} />
      </section>
    </div>
  )
}