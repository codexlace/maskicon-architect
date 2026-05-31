import { state } from '../js/state.js';

export function renderMouth(){
  const m=state.mouth;
  const x1=256-m.width/2, x2=256+m.width/2, cy=306, c=m.curvature;
  let path = `M${x1} ${cy}q${m.width/2} ${c} ${m.width} 0`;
  if(m.preset==='neutral') path = `M${x1} ${cy+12}h${m.width}`;
  if(m.preset==='surprised') return `<circle class="detail-line" cx="256" cy="${cy+14}" r="22" style="stroke-width:${m.stroke}"/>`;
  if(m.preset==='mischief') path = `M${x1} ${cy+10}q${m.width/2} ${c*0.15} ${m.width} -16`;
  if(m.preset==='fang') return `<path class="detail-line" d="${path} M232 320l12 28 12-28M270 320l12 28 12-28" style="stroke-width:${m.stroke}"/>`;
  const stitches = m.preset==='stitch' || m.stitches > 0 ? stitchMarks(x1,x2,cy,c,m.stitches || 6) : '';
  return `<g id="mouth"><path class="detail-line" d="${path}" style="stroke-width:${m.stroke}"/>${stitches}</g>`;
}

function stitchMarks(x1,x2,cy,c,count){
  let out='';
  for(let i=1;i<=count;i++){
    const t=i/(count+1), x=x1+(x2-x1)*t, y=cy + 4*Math.sin(Math.PI*t);
    out += `<path d="M${x-5} ${y-11}l10 22" stroke="var(--cyan)" stroke-width="4" stroke-linecap="round"/>`;
  }
  return out;
}
