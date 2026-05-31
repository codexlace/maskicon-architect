import { state } from './state.js';
import { renderAssembly } from '../modules/assembly.js';

export function renderCanvas(){
  const canvas = document.querySelector('#iconCanvas');
  if(!canvas) return;
  canvas.innerHTML = `
    <defs>
      <filter id="softGlow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <g id="guides">${renderGuides()}</g>
    ${renderAssembly()}
    <text class="label" x="24" y="490">MASKICON ARCHITECT / SVG-FIRST BLUEPRINT LAB</text>
  `;
}

function renderGuides(){
  const g=state.guides;
  return `
    ${g.centerline ? '<line class="guide" x1="256" x2="256" y1="42" y2="470"/><text class="label" x="266" y="58">CENTERLINE</text>' : ''}
    ${g.eyeLine ? '<line class="guide" x1="64" x2="448" y1="220" y2="220"/><text class="label" x="74" y="212">EYE-LINE</text>' : ''}
    ${g.mouthArc ? '<path class="guide" d="M150 306q106 70 212 0"/><text class="label" x="74" y="325">MOUTH-ARC</text>' : ''}
    ${g.safeArea ? '<rect class="safe" x="64" y="64" width="384" height="384" rx="42"/><text class="label" x="330" y="82">SAFE AREA</text>' : ''}
  `;
}

export function getCurrentSvgString(background='transparent'){
  const clone = document.querySelector('#iconCanvas').cloneNode(true);
  clone.setAttribute('xmlns','http://www.w3.org/2000/svg');
  if(background !== 'transparent'){
    const rect=document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('width','512'); rect.setAttribute('height','512');
    rect.setAttribute('fill', background === 'blueprint' ? '#062a5f' : '#ffffff');
    clone.insertBefore(rect, clone.firstChild);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n${clone.outerHTML}`;
}
