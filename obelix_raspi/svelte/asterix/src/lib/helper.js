
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

export function getLocationTmpl(fid, addr) {
  const geo = { ...tmpl.geo, addr: addr };
  const base = [];
  for (let position of tmpl.base) {
    base.push({...position, pos: {...position.pos}})
  }
  return {fid: fid, geo: geo, base: base }
}