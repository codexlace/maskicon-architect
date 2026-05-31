import { state } from './state.js';
import { getCurrentSvgString } from './canvas.js';
import { downloadBlob } from './utils.js';

export function exportSvg(){
  const svg = getCurrentSvgString(state.export.background);
  downloadBlob(new Blob([svg], {type:'image/svg+xml'}), `maskicon-${state.export.size}.svg`);
}

export function exportPng(){
  const size=Number(state.export.size);
  const svg = getCurrentSvgString(state.export.background);
  const img = new Image();
  const url = URL.createObjectURL(new Blob([svg], {type:'image/svg+xml'}));
  img.onload = () => {
    const c=document.createElement('canvas');
    c.width=size;c.height=size;
    const ctx=c.getContext('2d');
    ctx.drawImage(img,0,0,size,size);
    c.toBlob(blob => downloadBlob(blob, `maskicon-${size}.png`), 'image/png');
    URL.revokeObjectURL(url);
  };
  img.src=url;
}

export function runExport(){
  if(state.export.format === 'png' || state.export.format === 'maskable') exportPng();
  else exportSvg();
}
