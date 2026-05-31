export const state = {
  activeModule: 'shapes',
  guides: { grid:true, centerline:true, eyeLine:true, mouthArc:true, safeArea:true },
  shape: { preset:'shield', width:320, height:360, stroke:16, safeArea:12, doodle:18, corner:60, aspectLocked:true },
  eyes: { preset:'oval', overlay:'none', angle:0, spacing:92, stroke:10, contrast:100, symmetry:true },
  mouth: { preset:'smile', curvature:42, width:124, stitches:0, stroke:10, expression:'happy' },
  mascot: { visible:false, preset:'default-mask', expression:'happy', stitches:true, doodles:true, scale:1 },
  wordmark: { text:'MASKicon', style:'blueprint', capHeight:42, xHeight:28, baseline:0, stroke:2, smoothing:50, spacing:1.2, visible:false },
  assembly: { showShape:true, showEyes:true, showMouth:true, showMascot:false, showWordmark:false, scale:1, rotation:0, snap:true },
  export: { format:'svg', size:512, background:'transparent' },
  history: [],
  future: []
};

export function snapshot(){
  const copy = JSON.parse(JSON.stringify(state));
  delete copy.history; delete copy.future;
  state.history.push(copy);
  if(state.history.length > 80) state.history.shift();
  state.future.length = 0;
}

export function updateState(path, value){
  const keys = path.split('.');
  let target = state;
  for(let i=0;i<keys.length-1;i++) target = target[keys[i]];
  target[keys.at(-1)] = value;
  window.dispatchEvent(new CustomEvent('state:changed', { detail:{ path, value }}));
}

export function restore(next){
  Object.assign(state, JSON.parse(JSON.stringify(next)));
  window.dispatchEvent(new CustomEvent('state:changed', { detail:{ path:'restore' }}));
}
