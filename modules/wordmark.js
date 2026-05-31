import { state } from '../js/state.js';

export function renderWordmark(){
  const w=state.wordmark;
  if(!state.assembly.showWordmark && !w.visible) return '';
  const weight = w.style === 'outline' ? '400' : '800';
  const family = w.style === 'mono' ? 'ui-monospace, SFMono-Regular, Menlo, monospace' : 'Inter, Arial, sans-serif';
  return `<g id="wordmark" transform="translate(256 ${430 + Number(w.baseline)})">
    <line x1="-150" x2="150" y1="0" y2="0" class="guide"/>
    <text text-anchor="middle" y="-10" fill="none" stroke="var(--line)" stroke-width="${w.stroke}" font-family="${family}" font-size="${w.capHeight}" font-weight="${weight}" letter-spacing="${w.spacing}">${escapeText(w.text)}</text>
  </g>`;
}
function escapeText(t){return String(t).replace(/[<>&]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));}
