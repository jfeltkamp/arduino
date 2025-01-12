import { writable } from "svelte/store";

export const arduinoSettings = writable({
  x: 0,
  y: 0,
  f: 0,
  deg_x: 0.0,
  deg_y: 0.0,
  dx: 1,
  dy: -1,
  df: 1,
  acc: 1000,
  spr: 80000,
  mpa: 20000,
  minpx: -20000,
  maxpx: 20000,
  mpf: 5000,
  vx: 0,
  vy: 0,
  va1: 100,
  va2: 1500,
  vf: 0,
  vf1: 100,
  vf2: 1500,
});

export const camControls = writable([
  {
    id: 'Brightness',
    name: 'Brightness',
    defaultValue: 0,
    value: 0,
    minValue: -1,
    maxValue: 1,
    steps: 0.01,
  },
  {
    id: 'Contrast',
    name: 'Contrast',
    defaultValue: 1,
    value: 1,
    minValue: 0,
    maxValue: 6,
    steps: 0.1,
  },
  {
    id: 'Saturation',
    name: 'Saturation',
    defaultValue: 1,
    value: 1,
    minValue: 0,
    maxValue: 32,
    steps: 0.1,
  },
  {
    id: 'Sharpness',
    name: 'Sharpness',
    defaultValue: 1,
    value: 1,
    minValue: 0,
    maxValue: 16,
    steps: 0.1,
  },
  {
    id: 'ExposureTime',
    name: 'Exposure time',
    description: 'Value > 0 will reduce video framerate.',
    defaultValue: 0,
    value: 0,
    minValue: -10,
    maxValue: 10,
    steps: 0.1,
  },
  {
    id: 'AnalogueGain',
    name: 'Analogue gain',
    defaultValue: 1,
    value: 1,
    minValue: 1,
    maxValue: 8,
    steps: 0.1,
  }
]);

// Navigation
export const locations = writable([]);
export const positions = writable({});
export const toolTab = writable('');
export const displayCompass = writable(false);
export const swapPreview = writable('B');
export const videoRecord = writable(false);

