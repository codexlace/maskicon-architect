import { state } from '../js/state.js';

export const shapePresets = {
  shield: 'M256 70 390 118 362 342 256 448 150 342 122 118Z',
  circle: null,
  diamond: 'M256 70 442 256 256 442 70 256Z',
  crest: 'M138 96h236v150c0 94-68 158-118 194-50-36-118-100-118-194Z',
  cloud: 'M145 338c-45 0-80-34-80-76s34-75 77-76c14-52 60-86 115-86 60 0 110 40 122 96 39 6 68 39 68 79 0 44-36 63-80 63Z',
  star: 'M256 72 307 190 435 202 338 286 367 412 256 347 145 412 174 286 77 202 205 190Z',
  squircle: null,
  blob: 'M102 253c-8-86 45-158 125-169 84-12 159 22 183 93 27 78-8 174-88 222-80 49-181 21-213-55-12-29-5-57-7-91Z',
  polygon: 'M256 64 403 149 403 319 256 448 109 319 109 149Z',
  capsule: null,
  'mascot-mask':'M256 70 388 116 362 342 256 448 150 342 124 116Z'
};

export function renderShape(){
  const s = state.shape;
  if(s.preset === 'circle') return `<circle class="shape-line" cx="256" cy="256" r="${Math.min(s.width,s.height)/2}"/>`;
  if(s.preset === 'squircle') return `<rect class="shape-line" x="${256-s.width/2}" y="${256-s.height/2}" width="${s.width}" height="${s.height}" rx="${s.corner}"/>`;
  if(s.preset === 'capsule') return `<rect class="shape-line" x="${256-s.width/2}" y="${256-s.height/2}" width="${s.width}" height="${s.height}" rx="${Math.min(s.width,s.height)/2}"/>`;
  return `<path class="shape-line" d="${shapePresets[s.preset] || shapePresets.shield}" transform="translate(256 256) scale(${s.width/360} ${s.height/380}) translate(-256 -256)"/>`;
}

export function renderShapeExtras(){
  const inset = 34;
  return `
    <rect class="safe" x="${inset+20}" y="${inset+20}" width="${512-(inset+20)*2}" height="${512-(inset+20)*2}" rx="36"/>
    <path class="accent-line" d="M154 138 256 100 358 138 337 325 256 405 175 325Z"/>
  `;
}
