import { state, updateState, snapshot } from './state.js';
import { renderCanvas } from './canvas.js';
import { runExport } from './export.js';

const moduleLabels = {
  shapes:'Shape Generator',
  eyes:'Eye Builder',
  mouths:'Mouth Builder',
  mascot:'Mascot Designer',
  wordmark:'Wordmark Lab',
  assembly:'Assembly Mode',
  export:'Export Engine'
};

export function initUI(){
  document.querySelectorAll('.module-tab').forEach(btn=>{
    btn.addEventListener('click',()=>{
      state.activeModule=btn.dataset.module;
      document.querySelectorAll('.module-tab').forEach(b=>b.setAttribute('aria-selected', String(b===btn)));
      renderControls();
    });
  });
  document.querySelector('#exportNow').addEventListener('click', runExport);
  document.querySelector('#saveProject').addEventListener('click',()=>localStorage.setItem('maskicon-architect-state-v1', JSON.stringify(state)));
  document.querySelector('#resetProject').addEventListener('click',()=>{localStorage.removeItem('maskicon-architect-state-v1'); location.reload();});
  renderControls();
}

function control(path,label,type='range',opts={}){
  const value = path.split('.').reduce((o,k)=>o[k], state);
  if(type==='select'){
    return `<div class="control"><label>${label}</label><select data-path="${path}">${opts.options.map(o=>`<option value="${o}" ${o==value?'selected':''}>${title(o)}</option>`).join('')}</select></div>`;
  }
  if(type==='toggle'){
    return `<label class="toggle"><span>${label}</span><input data-path="${path}" type="checkbox" ${value?'checked':''}></label>`;
  }
  if(type==='text'){
    return `<div class="control"><label>${label}</label><input data-path="${path}" type="text" value="${value}"></div>`;
  }
  return `<div class="control"><label>${label}: <span>${value}</span></label><input data-path="${path}" type="range" min="${opts.min??0}" max="${opts.max??100}" step="${opts.step??1}" value="${value}"></div>`;
}

function title(s){return String(s).replaceAll('-',' ').replace(/\b\w/g,m=>m.toUpperCase())}

export function renderControls(){
  const panel=document.querySelector('#dynamicControls');
  const m=state.activeModule;
  document.querySelector('#moduleTitle').textContent = moduleLabels[m];
  let html='';
  if(m==='shapes') html = [
    control('shape.preset','Preset','select',{options:['shield','circle','diamond','crest','cloud','star','squircle','blob','polygon','capsule','mascot-mask']}),
    control('shape.width','Width','range',{min:160,max:420}),
    control('shape.height','Height','range',{min:160,max:430}),
    control('shape.corner','Corner Radius','range',{min:0,max:140}),
    control('shape.stroke','Stroke Weight','range',{min:4,max:28}),
    control('shape.safeArea','Safe Area %','range',{min:8,max:20}),
    control('shape.doodle','Doodle Zone %','range',{min:0,max:30})
  ].join('');
  if(m==='eyes') html = [
    control('eyes.preset','Eye Shape','select',{options:['oval','sleepy','round','slash','star','heart']}),
    control('eyes.overlay','Symbol Overlay','select',{options:['none','spark','moon']}),
    control('eyes.angle','Angle','range',{min:-35,max:35}),
    control('eyes.spacing','Spacing','range',{min:50,max:170}),
    control('eyes.stroke','Stroke Weight','range',{min:3,max:20}),
    control('eyes.contrast','Contrast','range',{min:40,max:140}),
    control('eyes.symmetry','Lock Symmetry','toggle')
  ].join('');
  if(m==='mouths') html = [
    control('mouth.preset','Preset','select',{options:['smile','neutral','stitch','surprised','mischief','fang']}),
    control('mouth.curvature','Arc Curvature','range',{min:-50,max:70}),
    control('mouth.width','Width','range',{min:50,max:210}),
    control('mouth.stitches','Stitch Count','range',{min:0,max:12}),
    control('mouth.stroke','Stroke Weight','range',{min:3,max:20})
  ].join('');
  if(m==='mascot') html = [
    control('assembly.showMascot','Show Mascot Layer','toggle'),
    control('assembly.showShape','Show Base Shape','toggle'),
    control('mascot.expression','Expression','select',{options:['happy','neutral','surprised','sleepy','mischievous']}),
    control('mascot.stitches','Stitch Lines','toggle'),
    control('mascot.doodles','Doodle Zones','toggle'),
    control('mascot.scale','Mascot Scale','range',{min:.5,max:1.2,step:.05})
  ].join('');
  if(m==='wordmark') html = [
    control('assembly.showWordmark','Show Wordmark','toggle'),
    control('wordmark.text','Text','text'),
    control('wordmark.style','Style','select',{options:['blueprint','block','mono','retro','gothic','script','rounded','outline','badge','capsule']}),
    control('wordmark.capHeight','Cap Height','range',{min:18,max:72}),
    control('wordmark.baseline','Baseline Shift','range',{min:-80,max:40}),
    control('wordmark.stroke','Stroke Weight','range',{min:1,max:8}),
    control('wordmark.spacing','Letter Spacing','range',{min:-2,max:8,step:.1})
  ].join('');
  if(m==='assembly') html = [
    control('assembly.showShape','Shape Layer','toggle'),
    control('assembly.showEyes','Eyes Layer','toggle'),
    control('assembly.showMouth','Mouth Layer','toggle'),
    control('assembly.showMascot','Mascot Layer','toggle'),
    control('assembly.showWordmark','Wordmark Layer','toggle'),
    control('assembly.scale','Scale','range',{min:.5,max:1.35,step:.05}),
    control('assembly.rotation','Rotation','range',{min:-180,max:180}),
    control('assembly.snap','Snapping','toggle')
  ].join('');
  if(m==='export') html = [
    control('export.format','Format','select',{options:['svg','png','maskable']}),
    control('export.size','Size','select',{options:['512','256','128','64']}),
    control('export.background','Background','select',{options:['transparent','blueprint','clean']}),
    `<div class="export-grid"><button class="button primary" id="panelExport">Export</button><button class="button" id="panelSave">Save</button></div>
     <p class="micro">SVG remains vector-clean. PNG export renders locally in the browser. Maskable mode uses the selected size and safe-area-friendly composition.</p>`
  ].join('');
  panel.innerHTML = html + guideControls();
  bindControls(panel);
}

function guideControls(){
  return `<hr style="border-color:var(--border);width:100%"><div class="control-stack">
    ${control('guides.centerline','Centerline','toggle')}
    ${control('guides.eyeLine','Eye-line','toggle')}
    ${control('guides.mouthArc','Mouth-arc','toggle')}
    ${control('guides.safeArea','Safe Area','toggle')}
  </div>`;
}

function bindControls(root){
  root.querySelectorAll('[data-path]').forEach(el=>{
    el.addEventListener('input',()=>{
      snapshot();
      let val = el.type==='checkbox' ? el.checked : el.value;
      if(el.type==='range') val = Number(val);
      updateState(el.dataset.path, val);
      renderControls();
      renderCanvas();
    });
  });
  root.querySelector('#panelExport')?.addEventListener('click', runExport);
  root.querySelector('#panelSave')?.addEventListener('click',()=>localStorage.setItem('maskicon-architect-state-v1', JSON.stringify(state)));
}
