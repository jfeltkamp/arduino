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
    id: 'brightness',
    name: 'Brightness',
    value: 0,
    minValue: -1,
    maxValue: 1,
    steps: 0.01,
  },
  {
    id: 'contrast',
    name: 'Contrast',
    value: 1,
    minValue: 0,
    maxValue: 32,
    steps: 0.1,
  },
  {
    id: 'saturation',
    name: 'Saturation',
    value: 1,
    minValue: 0,
    maxValue: 32,
    steps: 0.1,
  },
  {
    id: 'sharpness',
    name: 'Sharpness',
    value: 1,
    minValue: 0,
    maxValue: 16,
    steps: 0.1,
  }
]);


export const positions = writable({
  fid: "index",
  geo: {
    addr: "Wischhofsweg 4",
    lat: 53.606071,
    lon: 9.902575,
  },
  base: [
    {
      id: "home",
      name: "Home",
      pos: {
        x: -23900,
        y: 0,
        f: 500
      }
    },
    {
      id: "polaris",
      name: "Polaris",
      pos: {
        x: 0,
        y: 11912,
        f: 600,
      }
    }
  ]
});
