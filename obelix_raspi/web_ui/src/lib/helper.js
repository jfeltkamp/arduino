import { get } from 'svelte/store';
import { arduinoSettings } from "$lib/data-store.js";

export function strToId (name) {
  if (typeof name === 'string') {
    let newName = name.toLowerCase().trim()
      .replaceAll('ä', 'ae')
      .replaceAll('ö', 'oe')
      .replaceAll('ü', 'ue')
      .replaceAll('ß', 'ss')
      .replace(/\W+/g, "_");
    return newName.replace(/^_|_$/g, "");
  } else {
    return null
  }
}

// Raw template.
const tmpl = {
  fid: '',
  geo: {
    addr: '',
    lat: 53.6,
    lon: 9.9
  },
  base: [
    {
      id: 'home',
      name: 'Primary target',
      pos: {
        x: -23900,
        y: 0,
        f: 500
      }
    },
    {
      id: 'polaris',
      name: 'Polaris',
      pos: {
        x: 0,
        y: 11912,
        f: 600,
      }
    }
  ]
}

/**
 * Get a empty data template with basic positions.
 *
 * @param fid
 * @param addr
 * @returns {{fid, geo: {lon: number, addr, lat: number}, base: *[]}}
 */
export function getLocationTmpl(fid, addr) {
  const geo = { ...tmpl.geo, addr: addr };
  const base = [];
  for (let position of tmpl.base) {
    base.push({...position, pos: {...position.pos}})
  }
  return {fid: fid, geo: geo, base: base }
}

/**
 * Calculates radiant from deg.
 *
 * @param deg
 * @returns {number}
 */
export function angleDegToRad(deg) {
  return Math.PI * deg / 180;
}

/**
 * Calculates degree from radiant.
 *
 * @param rad
 * @returns {number}
 */
export function angleRadToDeg(rad) {
  return rad * 180 / Math.PI;
}

/**
 * Calculates stepper position from degree.
 *
 * @param deg
 * @returns {number}
 */
export function angleDegToSteps(deg) {
  const spr = get(arduinoSettings).spr;
  return Math.round(spr * deg / 360);
}

/**
 * Calculates stepper position from radiant.
 *
 * @param rad
 * @returns {number}
 */
export function angleRadToSteps(rad) {
  const deg = angleRadToDeg(rad);
  return angleDegToSteps(deg);
}