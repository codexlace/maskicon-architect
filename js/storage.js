import { state } from './state.js';
const KEY='maskicon-architect-state-v1';

export function saveLocal(){
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function loadLocal(){
  const raw=localStorage.getItem(KEY);
  if(!raw) return false;
  try{
    const data=JSON.parse(raw);
    for(const key of Object.keys(data)){
      if(key !== 'history' && key !== 'future' && key in state) Object.assign(state[key], data[key]);
    }
    return true;
  }catch(err){
    console.warn('Could not load saved MASKicon state.', err);
    return false;
  }
}

export function clearLocal(){ localStorage.removeItem(KEY); }
window.addEventListener('state:changed', saveLocal);
