export function burst(node, {reverse=false, count=20}){
  const rect = node.getBoundingClientRect()
  for(let i=0;i<count;i++){
    const p = document.createElement('div')
    p.style.position='fixed'
    p.style.left=(rect.left+rect.width/2)+'px'
    p.style.top=(rect.top+10)+'px'
    p.style.width='6px'; p.style.height='10px'
    p.style.backgroundColor=['#ff71ce','#5da9ff','#a6ff00','#ffd300'][i%4]
    p.style.transform='translate(-50%,-50%) rotate('+Math.random()*360+'deg)'
    p.style.borderRadius='2px'
    p.style.zIndex=5
    document.body.appendChild(p)
    const angle=(Math.random()*Math.PI*2)
    const speed=1+Math.random()*3
    const vx=Math.cos(angle)*speed
    const vy=(reverse?-1:1)*(1+Math.random()*2)
    let y=0,x=0,life=0
    const step=()=>{
      life+=1
      x+=vx; y+=vy
      p.style.opacity=String(1-life/90)
      p.style.transform=`translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${life*5}deg)`
      if(life<90) requestAnimationFrame(step); else p.remove()
    }
    requestAnimationFrame(step)
  }
}
