import { initUI } from './ui.js';
import { renderCanvas } from './canvas.js';
import { loadLocal } from './storage.js';

window.addEventListener('DOMContentLoaded', () => {
  loadLocal();
  initUI();
  renderCanvas();
});

window.addEventListener('state:changed', renderCanvas);
