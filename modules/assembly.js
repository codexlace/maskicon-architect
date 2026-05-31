import { state } from '../js/state.js';
import { renderShape, renderShapeExtras } from './shapes.js';
import { renderEyes } from './eyes.js';
import { renderMouth } from './mouths.js';
import { renderMascot } from './mascot.js';
import { renderWordmark } from './wordmark.js';

export function renderAssembly(){
  const a=state.assembly;
  const transform = `translate(256 256) rotate(${a.rotation}) scale(${a.scale}) translate(-256 -256)`;
  if(a.showMascot && !a.showShape) return `<g transform="${transform}">${renderMascot()}${renderWordmark()}</g>`;
  return `<g id="assembly" transform="${transform}">
    ${a.showShape ? renderShapeExtras()+renderShape() : ''}
    ${a.showEyes ? renderEyes() : ''}
    ${a.showMouth ? renderMouth() : ''}
    ${a.showMascot ? renderMascot() : ''}
    ${renderWordmark()}
  </g>`;
}
