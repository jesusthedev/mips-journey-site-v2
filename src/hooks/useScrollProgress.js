import { useEffect, useState } from 'react'
export function useScrollProgress(){
  const [progress, setProgress] = useState(0)
  useEffect(()=>{
    const onScroll = () => {
      const scrolled = window.scrollY
      const height = document.body.scrollHeight - window.innerHeight
      const p = height > 0 ? scrolled / height : 0
      setProgress(Math.min(Math.max(p,0),1))
      document.body.classList.toggle('theme-fun', p > 0.25 && p < 0.9)
      document.body.classList.toggle('theme-corp', p <= 0.25 || p >= 0.9)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive:true })
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])
  return progress
}