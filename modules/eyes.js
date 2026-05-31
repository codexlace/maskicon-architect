import { state } from '../js/state.js';

function eyeShape(x){
  const e = state.eyes;
  const rotate = `rotate(${e.angle} ${x} 220)`;
  const sw = e.stroke;
  if(e.preset === 'round') return `<circle class="detail-line" cx="${x}" cy="220" r="20" style="stroke-width:${sw}"/>`;
  if(e.preset === 'sleepy') return `<path class="detail-line" d="M${x-28} 220q28-24 56 0" style="stroke-width:${sw}"/>`;
  if(e.preset === 'slash') return `<path class="detail-line" d="M${x-24} 237l48-34" style="stroke-width:${sw}"/>`;
  if(e.preset === 'star') return `<path class="detail-line" d="M${x} 190l8 22 23 1-18 14 6 22-19-13-19 13 6-22-18-14 23-1z" style="stroke-width:${sw}"/>`;
  if(e.preset === 'heart') return `<path class="detail-line" d="M${x} 244c-30-20-42-34-36-50 5-14 24-16 36 0 12-16 31-14 36 0 6 16-6 30-36 50z" style="stroke-width:${sw}"/>`;
  return `<rect class="detail-line" x="${x-30}" y="202" width="60" height="36" rx="18" style="stroke-width:${sw}" transform="${rotate}"/>`;
}

export function renderEyes(){
  const gap = state.eyes.spacing;
  const left = 256 - gap/2;
  const right = 256 + gap/2;
  return `<g id="eyes">${eyeShape(left)}${eyeShape(right)}${overlay(left)}${overlay(right)}</g>`;
}

function overlay(x){
  const o=state.eyes.overlay;
  if(o==='none') return '';
  if(o==='spark') return `<path d="M${x+38} 182l6 14 14 6-14 6-6 14-6-14-14-6 14-6z" fill="none" stroke="var(--gold)" stroke-width="4"/>`;
  if(o==='moon') return `<path d="M${x+42} 188c-12 12-9 28 8 34-20 2-34-12-32-29 2-15 13-25 24-25-5 6-5 13 0 20z" fill="none" stroke="var(--violet)" stroke-width="4"/>`;
  return '';
}
