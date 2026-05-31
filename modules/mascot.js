import { state } from '../js/state.js';
import { renderEyes } from './eyes.js';
import { renderMouth } from './mouths.js';

export function renderMascot(){
  if(!state.assembly.showMascot && !state.mascot.visible) return '';
  return `<g id="mascot" transform="translate(0 0) scale(${state.mascot.scale})">
    <path class="shape-line" d="M256 70 388 116 362 342 256 448 150 342 124 116Z"/>
    ${state.mascot.stitches ? '<path class="accent-line" d="M154 138 256 100 358 138 337 325 256 405 175 325Z"/>' : ''}
    ${renderEyes()}
    ${renderMouth()}
    ${state.mascot.doodles ? '<path d="M148 172l8 18 18 8-18 8-8 18-8-18-18-8 18-8zM356 168c16 4 24 15 22 32" fill="none" stroke="var(--gold)" stroke-width="5" stroke-linecap="round"/>' : ''}
  </g>`;
}
