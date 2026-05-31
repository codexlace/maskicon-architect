export const clamp = (v,min,max)=>Math.max(min,Math.min(max,Number(v)));
export const n = v => Number.parseFloat(v);
export function attrs(obj){
  return Object.entries(obj).map(([k,v])=>`${k}="${String(v).replaceAll('"','&quot;')}"`).join(' ');
}
export function downloadBlob(blob, filename){
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=filename;
  document.body.append(a);
  a.click();
  setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},400);
}
export function svgToDataUrl(svg){
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
