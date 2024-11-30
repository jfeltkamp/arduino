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
    value: 0,
    minValue: -1,
    maxValue: 1,
    steps: 0.01,
  },
  {
    id: 'Contrast',
    name: 'Contrast',
    value: 1,
    minValue: 0,
    maxValue: 32,
    steps: 0.1,
  },
  {
    id: 'Saturation',
    name: 'Saturation',
    value: 1,
    minValue: 0,
    maxValue: 32,
    steps: 0.1,
  },
  {
    id: 'Sharpness',
    name: 'Sharpness',
    value: 1,
    minValue: 0,
    maxValue: 16,
    steps: 0.1,
  },
  {
    id: 'ExposureValue',
    name: 'Exposure value',
    value: 0,
    minValue: -8.0,
    maxValue: 8.0,
    steps: 0.1,
  },
  {
    id: 'ExposureTime',
    name: 'Exposure time',
    value: 10000,
    minValue: 100,
    maxValue: 250000,
    steps: 100,
  },
  {
    id: 'AnalogueGain',
    name: 'Analogue gain',
    value: 1,
    minValue: 1,
    maxValue: 8,
    steps: 0.1,
  }
]);

// Navigation
export const locations = writable([]);
export const positions = writable({});

