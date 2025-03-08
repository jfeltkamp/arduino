import { writable } from "svelte/store";
import { dev } from '$app/environment';

export const locHost = writable(dev ? 'http://192.168.178.33' : `${location.protocol}//${location.hostname}`);
export const locOrigin = writable(dev ? 'http://192.168.178.33:5000' : location.origin);

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
export const displayCompass = writable(true);
export const swapPreview = writable('B');
export const daylight = writable(false);
export const videoRecord = writable(false);

export const sphereControls =  writable([
  {
    id: 'CrosshairSize',
    name: 'Crosshair Size',
    defaultValue: 0.04,
    value: 0.04,
    minValue: 0.005,
    maxValue: 0.25,
    steps: 0.005,
  },
  {
    id: 'CrosshairOffsetX',
    name: 'Crosshair Offset X',
    defaultValue: 0.0,
    value: 0.0,
    minValue: -1,
    maxValue: 1,
    steps: 0.005,
  },
  {
    id: 'CrosshairOffsetY',
    name: 'Crosshair Offset Y',
    defaultValue: 0.0,
    value: 0.0,
    minValue: -1,
    maxValue: 1,
    steps: 0.005,
  },
  {
    id: 'SphereScaleVF',
    name: 'Sphere Scale Viewfinder',
    defaultValue: 1500,
    value: 1500,
    minValue: 1000,
    maxValue: 10000,
    steps: 10,
  },
  {
    id: 'SphereScaleTel',
    name: 'Sphere Scale Telescope',
    defaultValue: 24000,
    value: 24000,
    minValue: 15000,
    maxValue: 60000,
    steps: 10,
  }
]);
