import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
export default function Bars({ data = [], progress = 0 }) {
  const items = Array.isArray(data) ? data : [];
  const ref = useRef(null);
  // You can remove the unused items.map block or replace it with a valid JSX if needed.
  useEffect(()=>{
    if(!ref.current) return;
    const el = ref.current; el.innerHTML = '';
    const width = el.clientWidth;
    const height = 320; // Define a default height
    const margin = {top:18,right:12,bottom:48,left:60};
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;
    const keys = data.length > 0 ? Object.keys(data[0]).filter(k => k !== 'metric') : [];
    const svg = d3.select(el).append('svg').attr('width',width).attr('height',height);
    const g = svg.append('g').attr('transform',`translate(${margin.left},${margin.top})`);
    const x0 = d3.scaleBand().domain(data.map(d=>d.metric)).range([0,w]).padding(0.2);
    const x1 = d3.scaleBand().domain(keys).range([0,x0.bandwidth()]).padding(0.1);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d3.max(keys, k=>d[k])) || 0]).nice().range([h,0]);
    g.append('g').attr('transform',`translate(0,${h})`).call(d3.axisBottom(x0)).selectAll('text').attr('transform','rotate(-28)').style('text-anchor','end');
    g.append('g').call(d3.axisLeft(y).ticks(5));
    const color = d3.scaleOrdinal().domain(keys).range(['#5da9ff','#ff71ce']);
    const groups = g.selectAll('g.layer').data(data).enter().append('g').attr('transform',d=>`translate(${x0(d.metric)},0)`);
    keys.forEach(k=>{
      groups.append('rect').attr('x',d=>x1(k)).attr('y',h).attr('width',x1.bandwidth()).attr('height',0).attr('rx',6).attr('fill',color(k))
        .transition().duration(900).delay((_,i)=>i*50).attr('y',d=>y(d[k])).attr('height',d=>h-y(d[k]));
    });
    const legend = svg.append('g').attr('transform',`translate(${width-170},12)`);
    keys.forEach((k,i)=>{ const row = legend.append('g').attr('transform',`translate(0,${i*20})`);
      row.append('rect').attr('width',12).attr('height',12).attr('rx',3).attr('fill',color(k));
      row.append('text').text(k).attr('x',18).attr('y',10).attr('fill','#ccd3e0').attr('font-size',12);});
  },[data]);
  return <div ref={ref} style={{width:'100%'}}></div>;
}